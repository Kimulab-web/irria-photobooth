export type FormuleSlug = 'autonome' | 'cocktail' | 'fete' | 'incontournable';

export interface Formule {
  slug: FormuleSlug;
  count: string;
  nom: string;
  sousTitre: string;
  cible: string;
  inclus: string[];
  featured?: boolean;
}

const inclusStandard = [
  'Fichiers HD envoyés après l\'événement',
  'Template de tirage personnalisé (couleurs, prénoms, date, logo)',
  'Accessoires (chapeaux, lunettes, panneaux)',
  'Livraison, installation et reprise',
];

export const formules: Formule[] = [
  {
    slug: 'autonome',
    count: '00',
    nom: 'Autonome',
    sousTitre: 'Sans impressions, la borne photobooth pour l\'ambiance',
    cible: 'Photos et vidéos digitales, envoi numérique aux invités, templates personnalisables. Idéal EVJF, EVG et anniversaires.',
    inclus: [
      'Photos et vidéos digitales',
      'Envoi numérique aux invités',
      'Template personnalisable',
      'Accessoires (chapeaux, lunettes, panneaux)',
      'Livraison, installation et reprise',
    ],
  },
  {
    slug: 'cocktail',
    count: '100',
    nom: 'Cocktail',
    sousTitre: 'Jusqu\'à 100 impressions incluses',
    cible: 'Petits mariages, vins d\'honneur, apéros d\'entreprise.',
    inclus: ['Tirages instantanés jusqu\'à 100', ...inclusStandard],
  },
  {
    slug: 'fete',
    count: '200',
    nom: 'Fête',
    sousTitre: 'Jusqu\'à 200 impressions incluses',
    cible: 'Réceptions ou mariages de 60 à 100 invités.',
    inclus: ['Tirages instantanés jusqu\'à 200', ...inclusStandard],
  },
  {
    slug: 'incontournable',
    count: '400',
    nom: 'L\'incontournable',
    sousTitre: 'Jusqu\'à 400 tirages photos inclus',
    cible: 'Mariages, séminaires, lancements de 120 invités ou plus. Fichiers HD offerts, template personnalisé inclus.',
    inclus: ['Tirages instantanés jusqu\'à 400', ...inclusStandard],
    featured: true,
  },
];

export const zoneLivraison = {
  rayonKm: 40,
  villeDepart: 'Hasparren',
  tarifSupplementaireParKm: 0.8,
};
