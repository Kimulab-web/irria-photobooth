# Déploiement — Irria Photobooth

Site Astro déployé sur Vercel, domaine `irria-photobooth.fr` géré chez o2switch
(la messagerie reste chez o2switch, seul le web pointe vers Vercel).

---

## 1. DNS à configurer chez o2switch

Dans l'interface o2switch (cPanel → **Zone Editor** du domaine `irria-photobooth.fr`) :

| Type  | Nom / Hôte | Valeur                  | Notes                          |
| ----- | ---------- | ----------------------- | ------------------------------ |
| A     | `@`        | `76.76.21.21`           | Pointe la racine vers Vercel   |
| CNAME | `www`      | `cname.vercel-dns.com`  | Pointe le sous-domaine www     |
| MX    | —          | **Ne pas toucher**      | Email o2switch conservé        |
| TXT   | `resend._domainkey` | Fourni par Resend | DKIM, à ajouter à l'étape 3 |

⚠️ **Ne supprimez pas les enregistrements MX existants** : ils font tourner
`contact@irria-photobooth.fr` chez o2switch. Seuls les enregistrements A et CNAME
ci-dessus doivent être créés ou modifiés.

Si un enregistrement A `@` ou CNAME `www` existe déjà (pointant vers o2switch),
il faut le **modifier**, pas en ajouter un second.

La propagation DNS prend de quelques minutes à quelques heures.

---

## 2. Vercel

### Import du projet

1. Pousser le repo sur GitHub.
2. Sur [vercel.com](https://vercel.com) → **Add New… → Project** → importer le repo.
3. Vercel détecte Astro automatiquement (build : `npm run build`, output : `dist`).
   Aucune configuration manuelle nécessaire grâce à `@astrojs/vercel`.

### Variables d'environnement

Dans **Project Settings → Environment Variables**, ajouter :

| Nom              | Valeur                        | Environnements               |
| ---------------- | ----------------------------- | ---------------------------- |
| `RESEND_API_KEY` | clé API générée dans Resend   | Production, Preview, Development |

Sans cette variable, le formulaire de contact renverra une erreur d'envoi.

### Domaine

Dans **Project Settings → Domains**, ajouter `irria-photobooth.fr` **et**
`www.irria-photobooth.fr`. Vercel vérifiera les enregistrements DNS de l'étape 1
et émettra automatiquement le certificat HTTPS.

---

## 3. Resend (envoi du formulaire)

1. Créer un compte sur [resend.com](https://resend.com).
2. **Domains → Add Domain** → saisir `irria-photobooth.fr`.
3. Resend affiche un ou plusieurs enregistrements à créer, dont un **TXT DKIM**
   (nom du type `resend._domainkey`). Copier ces enregistrements dans la zone DNS
   o2switch (cPanel → Zone Editor).
   - Resend peut aussi proposer un enregistrement **SPF** : si un TXT SPF existe déjà
     pour o2switch, il faut **fusionner** les deux dans un seul enregistrement plutôt
     que d'en créer un second (un seul SPF par domaine est autorisé).
   - Resend peut demander un MX sur un sous-domaine `send` : sans incidence sur la
     messagerie principale.
4. Revenir sur Resend et cliquer **Verify DNS Records** jusqu'à validation du domaine.
5. **API Keys → Create API Key** → copier la clé et la renseigner dans
   `RESEND_API_KEY` sur Vercel (étape 2).

L'expéditeur configuré dans le code est `contact@irria-photobooth.fr` et le
destinataire `contact@irria-photobooth.fr` (voir `src/pages/api/contact.ts`).
Le `replyTo` est l'email du visiteur, donc un simple « Répondre » depuis la boîte
o2switch écrit directement au client.

---

## 4. Vérifications après mise en ligne

- [ ] `https://irria-photobooth.fr` et `https://www.irria-photobooth.fr` répondent en HTTPS
- [ ] Envoi d'un test via `/contact/` → email bien reçu sur `contact@irria-photobooth.fr`
- [ ] Un second envoi immédiat depuis la même IP est refusé (rate limit 60 s)
- [ ] `https://irria-photobooth.fr/sitemap-index.xml` accessible
- [ ] `https://irria-photobooth.fr/robots.txt` accessible
- [ ] JSON-LD validé sur [validator.schema.org](https://validator.schema.org)
      (LocalBusiness sur toutes les pages, FAQPage sur les pages à FAQ, BreadcrumbList
      hors accueil)
- [ ] Domaine ajouté à la Google Search Console + sitemap soumis
- [ ] Emails o2switch toujours fonctionnels (envoyer/recevoir un test)

---

## 5. Développement local

```bash
npm install
npm run dev
```

Créer un fichier `.env` à la racine (voir `.env.example`) :

```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

Le formulaire de contact n'est testable qu'avec une clé Resend valide et un domaine
vérifié — en local, tant que le domaine n'est pas validé, Resend n'autorise l'envoi
que vers l'adresse email du compte Resend.

---

## Reste à fournir

- `/public/logo.svg` — logo « irria » définitif (placeholder actuellement)
- `/public/logo.png` — version PNG référencée dans le JSON-LD LocalBusiness
- `/public/borne-irria.jpg` — photo de la borne référencée dans le JSON-LD
- Photos réelles de la borne pour remplacer `/public/placeholders/*.svg`
- Informations légales manquantes dans `/mentions-legales/` : forme juridique, SIRET,
  TVA intracommunautaire, responsable de la publication
