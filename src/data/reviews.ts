/**
 * Avis Google de la fiche Google Business Profile Irria Photobooth.
 * Mise à jour manuelle. Pour ajouter un nouvel avis : copier-coller depuis
 * la fiche GBP (Avis → copier le texte, noter nom + date + note).
 *
 * Lien de la fiche : https://maps.app.goo.gl/HyviAqNh1noSnyNG9
 */

export interface Review {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string; // ISO format YYYY-MM-DD
  dateLabel: string; // Format affiché, ex. "octobre 2026"
  text: string;
}

export const googleProfileUrl = 'https://maps.app.goo.gl/HyviAqNh1noSnyNG9';

export const reviews: Review[] = [
  {
    author: 'James Estrada',
    rating: 5,
    date: '2026-11-09',
    dateLabel: 'novembre 2026',
    text: "Parfait ! Je recommande pour vos événements.",
  },
  {
    author: 'Mélina & David',
    rating: 5,
    date: '2026-10-03',
    dateLabel: 'octobre 2026',
    text: "Nous avons fait appel à Alexandre et Iban pour leur photobooth à l'occasion de notre mariage surprise, et nous sommes ravis de leur prestation ! Ils ont été adorables, disponibles, très sympathiques et professionnels. Le photobooth a parfaitement trouvé sa place dans notre soirée et nous avons récupéré de superbes souvenirs. Nous les recommandons sans hésiter pour vos événements ! Encore merci à tous les deux pour votre gentillesse et votre bonne humeur.",
  },
];

// Calculée automatiquement à partir des avis ci-dessus
export const aggregateRating = {
  value: reviews.reduce((s, r) => s + r.rating, 0) / reviews.length,
  count: reviews.length,
};
