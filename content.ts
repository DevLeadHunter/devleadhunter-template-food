import type { SiteContent } from './app/types/SiteContent'

/**
 * Mock SiteContent — food truck FR, même forme que `build_site_content` côté API.
 * URLs Unsplash vérifiées (200). Social = profils réels (pas bare domain).
 */
export const mockSiteContent: SiteContent = {
  businessName: 'Le Camion du Coin',
  subtitle:
    'Street food maison à Lyon : burgers, wings et classics préparés à la minute sur les places du centre.',
  phone: '06 12 45 78 90',
  email: 'bonjour@lecamionducoin.fr',
  city: 'Lyon',
  area: 'Lyon et Presqu’île',
  about:
    'Depuis 2019, Le Camion du Coin sillonne Lyon avec une cuisine simple et généreuse. ' +
    'Pain brioché, sauces maison, frites croustillantes — on sert vite, on sert bien, ' +
    'et on revient chaque semaine sur vos places préférées.',
  heroImage:
    'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=1400&q=75',
  aboutImage:
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=70',
  gallery: [
    {
      url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=70',
      alt: 'Burger maison',
    },
    {
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=70',
      alt: 'Service en terrasse',
    },
    {
      url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=70',
      alt: 'Frites et wings',
    },
    {
      url: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=1200&q=70',
      alt: 'Street food',
    },
  ],
  palette: {
    primary: '#055346',
    secondary: '#f9efe6',
    accent: '#f3c395',
  },
  reviews: [
    {
      author: 'Camille R.',
      text: 'Les meilleurs wings de Lyon, sauce maison au top. File d’attente qui avance vite et équipe super sympa.',
      rating: 5,
    },
    {
      author: 'Julien M.',
      text: 'Burger généreux, frites parfaites. On les suit sur Instagram pour savoir où ils stationnent.',
      rating: 5,
    },
    {
      author: 'Sarah B.',
      text: 'Idéal pour un déjeuner rapide sur la place. Qualité constante, prix justes.',
      rating: 4,
    },
  ],
  openingHours: [
    { day: 'Mardi – Vendredi', hours: '11h30 – 14h30 · 18h – 22h' },
    { day: 'Samedi', hours: '12h – 22h' },
    { day: 'Dimanche – Lundi', hours: 'Fermé (événements sur demande)' },
  ],
  social: [
    { network: 'instagram', url: 'https://www.instagram.com/lecamionducoin/' },
    { network: 'facebook', url: 'https://www.facebook.com/lecamionducoin' },
  ],
  services: [
    {
      title: 'Burger dinde, œuf & fromage',
      description: 'Pain brioché, dinde grillée, œuf coulant, cheddar et sauce maison. — 12 €',
      icon: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=70',
    },
    {
      title: 'Hot wings & frites',
      description: 'Ailes marinées, sauce piquante et frites croustillantes. — 11 €',
      icon: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=70',
    },
    {
      title: 'Duo hot-dog & soda',
      description: 'Deux hot-dogs garnis, frites et boisson au choix. — 13 €',
      icon: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=70',
    },
    {
      title: 'Soda float glacé',
      description: 'Boisson gazeuse et boule de glace vanille — le classique. — 6 €',
      icon: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=70',
    },
  ],
  faq: [
    {
      question: 'Où vous trouver cette semaine ?',
      answer:
        'On publie chaque lundi notre planning sur Instagram. En général : Presqu’île le midi, places de quartier le soir.',
    },
    {
      question: 'Acceptez-vous les groupes et événements ?',
      answer:
        'Oui — mariages, séminaires, festivals. Écrivez-nous ou réservez via le formulaire, on revient vers vous sous 24 h.',
    },
    {
      question: 'Proposez-vous des options végétariennes ?',
      answer: 'Oui, un burger veggie et des sides (frites, salade) sont toujours au menu.',
    },
  ],
  heroBadge: 'Food truck Lyonnais',
  heroPoints: ['Fait maison', 'Produits frais', 'Sur place ou à emporter'],
  ctaCallLabel: 'Envoyer la demande',
  ctaQuoteLabel: 'Voir le menu',
  trustItems: [
    { value: '4,9/5', label: 'Avis Google' },
    { value: '12K+', label: 'Sur Instagram' },
  ],
  servicesHeading: 'Nos spécialités',
  galleryHeading: 'En images',
  reviewsHeading: 'Ce qu’ils en disent',
  faqHeading: 'Questions fréquentes',
  aboutHeading: 'Notre histoire gourmande',
  contactHeading: 'Réserver une table',
}
