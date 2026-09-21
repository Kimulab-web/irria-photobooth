import type { APIRoute } from 'astro';
import { RESEND_API_KEY } from 'astro:env/server';
import { Resend } from 'resend';

export const prerender = false;

const RATE_LIMIT_WINDOW_MS = 60_000;

// In-memory: resets on cold start, so it throttles per warm instance, not globally.
const lastSubmissionByIp = new Map<string, number>();

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: 'Requête invalide.' }, 400);
  }

  const honeypot = String(payload['entreprise-site'] ?? '').trim();
  if (honeypot !== '') {
    return jsonResponse({ ok: true }, 200);
  }

  const nom = String(payload.nom ?? '').trim();
  const email = String(payload.email ?? '').trim();

  if (!nom || !isValidEmail(email)) {
    return jsonResponse({ error: 'Merci de renseigner votre nom et un email valide.' }, 400);
  }

  const now = Date.now();
  const lastSubmission = lastSubmissionByIp.get(clientAddress);
  if (lastSubmission && now - lastSubmission < RATE_LIMIT_WINDOW_MS) {
    return jsonResponse({ error: 'Merci de patienter une minute avant un nouvel envoi.' }, 429);
  }
  lastSubmissionByIp.set(clientAddress, now);

  const telephone = String(payload.telephone ?? '').trim();
  const formule = String(payload.formule ?? '').trim();
  const typeEvenement = String(payload.typeEvenement ?? '').trim();
  const date = String(payload.date ?? '').trim();
  const ville = String(payload.ville ?? '').trim();
  const codePostal = String(payload.codePostal ?? '').trim();
  const invites = String(payload.invites ?? '').trim();
  const message = String(payload.message ?? '').trim();

  const lieu = [ville, codePostal].filter(Boolean).join(' ');

  const lines = [
    `Nom : ${nom}`,
    `Email : ${email}`,
    telephone && `Téléphone : ${telephone}`,
    formule && `Formule souhaitée : ${formule}`,
    typeEvenement && `Type d'événement : ${typeEvenement}`,
    date && `Date de l'événement : ${date}`,
    lieu && `Lieu : ${lieu}`,
    invites && `Invités estimés : ${invites}`,
    message && `\nMessage :\n${message}`,
  ].filter(Boolean);

  const resend = new Resend(RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: 'Irria Photobooth <contact@irria-photobooth.fr>',
      to: 'contact@kimulab.fr',
      replyTo: email,
      subject: `Nouvelle demande de devis — ${nom}`,
      text: lines.join('\n'),
    });

    if (error) {
      return jsonResponse(
        { error: "L'envoi a échoué, merci de réessayer ou de nous appeler au 06 24 04 68 91." },
        502
      );
    }
  } catch {
    return jsonResponse(
      { error: "L'envoi a échoué, merci de réessayer ou de nous appeler au 06 24 04 68 91." },
      502
    );
  }

  return jsonResponse({ ok: true }, 200);
};
