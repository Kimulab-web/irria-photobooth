/**
 * Zones desservies par Irria Photobooth au départ de Hasparren.
 * Utilisé pour le SEO local, le footer et le schema LocalBusiness.
 */

export const zones = [
  {
    region: 'Pays Basque',
    villes: [
      'Bayonne',
      'Biarritz',
      'Anglet',
      'Saint-Jean-de-Luz',
      'Hendaye',
      'Hasparren',
      'Cambo-les-Bains',
      'Ustaritz',
      'Saint-Pée-sur-Nivelle',
      'Saint-Jean-Pied-de-Port',
      'Espelette',
      'Ainhoa',
      'Sare',
    ],
  },
  {
    region: 'Landes',
    villes: ['Dax', 'Hossegor', 'Capbreton', 'Soustons'],
  },
  {
    region: 'Béarn',
    villes: ['Pau'],
  },
];

// Liste plate pour le footer / schema
export const villes = zones.flatMap((z) => z.villes);

export interface Occasion {
  slug: string;
  nom: string;
  desc: string;
  href: string;
}

export const occasions: Occasion[] = [
  {
    slug: 'mariages',
    nom: 'Mariages',
    desc: 'Un souvenir tangible pour chaque invité, sans que vous ayez à y penser.',
    href: '/photobooth-mariage-pays-basque/',
  },
  {
    slug: 'entreprises',
    nom: 'Entreprises',
    desc: 'Séminaires, lancements, arbres de Noël. Un moment fédérateur, activé sans effort.',
    href: '/photobooth-entreprise-pays-basque/',
  },
  {
    slug: 'anniversaires',
    nom: 'Anniversaires',
    desc: '30, 40, 50 ans. Les photos que la famille garde bien plus longtemps que le gâteau.',
    href: '/photobooth-anniversaire/',
  },
  {
    slug: 'baptemes',
    nom: 'Baptêmes & communions',
    desc: 'Un souvenir doux et intergénérationnel. Les grands-parents adorent, les enfants aussi.',
    href: '/photobooth-anniversaire/',
  },
  {
    slug: 'kermesses',
    nom: 'Kermesses & écoles',
    desc: 'Fêtes d\'école, kermesses, bals. Chaque famille repart avec sa photo, tirage à la clé.',
    href: '/photobooth-anniversaire/',
  },
  {
    slug: 'festivals',
    nom: 'Festivals & associations',
    desc: 'Fêtes de village, événements associatifs. Une activation photo qui rassemble.',
    href: '/photobooth-anniversaire/',
  },
];
