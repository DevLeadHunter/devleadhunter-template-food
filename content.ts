import type { SiteContent } from './app/types/SiteContent'

/**
 * Mock SiteContent used by the `.playground` to preview the template in isolation.
 * Not shipped to production — edit it freely while designing your template.
 */
export const mockSiteContent: SiteContent = {
  businessName: 'Plomberie Martin',
  subtitle: 'Dépannage, installation et rénovation à Rennes et alentours',
  phone: '02 99 00 12 34',
  email: 'contact@plomberie-martin.fr',
  city: 'Rennes',
  area: 'Ille-et-Vilaine',
  services: [
    {
      title: 'Dépannage urgence',
      description: 'Fuite, engorgement, panne de chauffe-eau — intervention rapide 7j/7.',
    },
    {
      title: 'Installation sanitaire',
      description: 'Salle de bain, cuisine, WC : pose complète et soignée.',
    },
    {
      title: 'Rénovation',
      description: 'Modernisation de vos installations et mise aux normes.',
    },
  ],
}
