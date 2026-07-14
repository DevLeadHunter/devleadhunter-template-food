/**
 * Types + construction du contenu de la template `food` (food truck / street food).
 *
 * La template rend un `SiteContent` typé et porte sa copie éditoriale (défauts métier
 * restauration / food truck). Miroir de `api/services/templates/food.py`.
 */
import type { SiteContent } from '~/types/SiteContent'

export interface FoodTheme {
  primary: string
  secondary: string
  accent: string
}

export const foodDefaultTheme: FoodTheme = {
  primary: '#055346',
  secondary: '#f9efe6',
  accent: '#f3c395',
}

export interface FoodInfoItem {
  title: string
  text: string
  icon: string
}

export interface FoodStatItem {
  value: string
  title: string
  subtitle: string
}

export interface FoodMenuItem {
  title: string
  description: string
  price: string
  image: string
}

export interface FoodFeatureItem {
  title: string
  icon: string
}

export interface FoodSocialItem {
  name: string
  icon: string
  href: string
}

export interface FoodPageContent {
  theme: FoodTheme
  businessName: string
  phone: string
  phoneDisplay: string
  email: string
  city: string
  area: string
  heroBadge: string
  heroTitle: string
  heroDescription: string
  heroCta: string
  heroImage: string
  aboutLabel: string
  aboutHeading: string
  about: string
  collage: { left: string; right: string; center: string }
  stats: FoodStatItem[]
  infoItems: FoodInfoItem[]
  menuLabel: string
  servicesHeading: string
  menuItems: FoodMenuItem[]
  reviewsLabel: string
  reviewsHeading: string
  reviewQuote: string
  reviewAuthor: string
  reviewCity: string
  reviewImage: string
  features: FoodFeatureItem[]
  contactLabel: string
  contactHeading: string
  contactDescription: string
  contactCta: string
  socials: FoodSocialItem[]
  copyright: string
}

const DEFAULT_DISH_IMAGES: string[] = [
  '/images/image-import.png',
  '/images/image-import-2.png',
  '/images/image-import-1.png',
  '/images/image-import-3.png',
]

const SOCIAL_ICONS: Record<string, string> = {
  facebook: '/images/social-0.svg',
  twitter: '/images/social-1.svg',
  x: '/images/social-1.svg',
  instagram: '/images/social-2.svg',
  pinterest: '/images/social-3.svg',
  youtube: '/images/social-1.svg',
  tiktok: '/images/social-2.svg',
  linkedin: '/images/social-0.svg',
}

const defaults = {
  heroBadge: 'Food truck',
  heroTitle: 'Des saveurs qui roulent',
  heroDescription:
    'Street food préparée sur place, produits frais et recettes maison — on vient à vous.',
  heroCta: 'Voir le menu',
  heroImage: '/images/image-import-2.jpg',
  aboutLabel: 'à propos',
  aboutHeading: 'Notre histoire gourmande',
  about:
    'Food truck de quartier : burgers, wings et classics préparés à la minute. ' +
    'On privilégie les circuits courts, les sauces maison et le service rapide — ' +
    'sur votre place préférée ou pour vos événements.',
  aboutImage: '/images/image-import-8.jpg',
  collageLeft: '/images/image-import-4.jpg',
  collageRight: '/images/image-import-7.jpg',
  ctaCallLabel: 'Appeler',
  ctaQuoteLabel: 'Réserver',
  trustItems: [
    { value: '4,9/5', label: 'Avis clients', title: 'notés' },
    { value: '12K+', label: 'Sur Instagram', title: 'suivez-nous' },
  ] as FoodStatItem[],
  servicesHeading: 'Nos spécialités',
  menuLabel: 'notre menu',
  menuItems: [
    {
      title: 'Burger dinde, œuf & fromage',
      description: 'Pain brioché, dinde grillée, œuf coulant, cheddar et sauce maison.',
      price: '12 €',
      image: DEFAULT_DISH_IMAGES[0],
    },
    {
      title: 'Hot wings & frites',
      description: 'Ailes marinées, sauce piquante et frites croustillantes.',
      price: '11 €',
      image: DEFAULT_DISH_IMAGES[1],
    },
    {
      title: 'Duo hot-dog & soda',
      description: 'Deux hot-dogs garnis, frites et boisson au choix.',
      price: '13 €',
      image: DEFAULT_DISH_IMAGES[2],
    },
    {
      title: 'Soda float glacé',
      description: 'Boisson gazeuse et boule de glace vanille — le classique.',
      price: '6 €',
      image: DEFAULT_DISH_IMAGES[3],
    },
  ] as FoodMenuItem[],
  reviewsLabel: 'témoignages',
  reviewsHeading: 'Ce qu’ils en disent',
  reviewQuote:
    'Goût fabuleux, portions généreuses — on revient dès qu’ils sont sur la place. ' +
    'Les meilleurs burgers et wings du coin.',
  reviewAuthor: 'Natasha D.',
  features: [
    { title: 'Produits de qualité', icon: '/images/feature-icon-0.svg' },
    { title: 'Ambiance conviviale', icon: '/images/feature-icon-1.svg' },
    { title: 'Prix justes', icon: '/images/feature-icon-2.svg' },
  ] as FoodFeatureItem[],
  contactLabel: 'réservez',
  contactHeading: 'Réserver une table',
  contactCta: 'Envoyer la demande',
  socials: [
    { name: 'facebook', icon: SOCIAL_ICONS.facebook, href: '#' },
    { name: 'instagram', icon: SOCIAL_ICONS.instagram, href: '#' },
  ] as FoodSocialItem[],
}

function resolveText(value: string | undefined, fallback: string): string {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback
}

function formatPhoneDisplay(phone: string): string {
  const digits: string = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return digits.replace(/(\d{2})(?=\d)/g, '$1 ').trim()
  }
  return phone
}

function formatOpeningHours(hours: Array<{ day?: string; hours?: string }> | undefined): string {
  if (!Array.isArray(hours) || hours.length === 0) {
    return 'Lun – Ven 11h – 21h'
  }
  const first = hours[0]
  const day: string = first?.day?.trim() || ''
  const slot: string = first?.hours?.trim() || ''
  if (day && slot) {
    return `${day} ${slot}`
  }
  return slot || day || 'Lun – Ven 11h – 21h'
}

function extractPrice(description: string): { text: string; price: string } {
  const match: RegExpMatchArray | null = description.match(/^(.*)\s*[—–-]\s*(\d+[.,]?\d*\s*€)\s*$/u)
  if (match) {
    return { text: (match[1] ?? '').trim(), price: (match[2] ?? '').trim() }
  }
  return { text: description, price: '' }
}

/**
 * Construit le contenu de page prêt pour le rendu.
 * @param content Données variables du prospect (`SiteContent`)
 * @returns Contenu typé Food
 */
export function buildFoodContent(content: SiteContent): FoodPageContent {
  const palette = content.palette ?? {}
  const gallery = Array.isArray(content.gallery)
    ? content.gallery
        .map((item) => ({
          url: typeof item?.url === 'string' ? item.url : '',
          alt: typeof item?.alt === 'string' ? item.alt : '',
        }))
        .filter((item) => item.url.length > 0)
    : []

  const businessName: string = resolveText(content.businessName, 'Food trucks')
  const phone: string = content.phone ?? ''
  const email: string = content.email ?? ''
  const city: string = content.city ?? ''
  const area: string = content.area ?? city
  const phoneDisplay: string = phone ? formatPhoneDisplay(phone) : ''

  const hoursText: string = formatOpeningHours(content.openingHours)
  const locationText: string = area || city || 'Sur les places du centre'

  const trustFromContent: FoodStatItem[] = Array.isArray(content.trustItems)
    ? content.trustItems
        .map((item, index) => ({
          value: typeof item?.value === 'string' ? item.value : '',
          title: defaults.trustItems[index]?.title ?? '',
          subtitle: typeof item?.label === 'string' ? item.label : '',
        }))
        .filter((item) => item.value.length > 0)
    : []

  const servicesFromContent: FoodMenuItem[] = Array.isArray(content.services)
    ? content.services
        .map((service, index) => {
          const rawDesc: string =
            typeof service?.description === 'string' ? service.description : ''
          const { text, price } = extractPrice(rawDesc)
          const defaultItem = defaults.menuItems[index]
          return {
            title: typeof service?.title === 'string' ? service.title.trim() : '',
            description: text || defaultItem?.description || '',
            price: price || defaultItem?.price || '',
            image:
              (typeof service?.icon === 'string' && service.icon.length > 0 ? service.icon : '') ||
              gallery[index]?.url ||
              defaultItem?.image ||
              DEFAULT_DISH_IMAGES[index % DEFAULT_DISH_IMAGES.length],
          }
        })
        .filter((item) => item.title.length > 0)
    : []

  const review = Array.isArray(content.reviews) ? content.reviews[0] : undefined
  const socialFromContent: FoodSocialItem[] = Array.isArray(content.social)
    ? content.social
        .map((item) => {
          const network: string =
            typeof item?.network === 'string' ? item.network.trim().toLowerCase() : ''
          const url: string = typeof item?.url === 'string' ? item.url.trim() : ''
          if (!network || !url) {
            return null
          }
          return {
            name: network,
            icon: SOCIAL_ICONS[network] ?? SOCIAL_ICONS.instagram,
            href: url,
          }
        })
        .filter((item): item is FoodSocialItem => item !== null)
    : []

  const heroImage: string = resolveText(content.heroImage, gallery[0]?.url || defaults.heroImage)
  const aboutImage: string = resolveText(
    content.aboutImage,
    gallery[1]?.url || gallery[0]?.url || defaults.aboutImage,
  )

  return {
    theme: {
      primary:
        typeof palette.primary === 'string' && palette.primary.length > 0
          ? palette.primary
          : foodDefaultTheme.primary,
      secondary:
        typeof palette.secondary === 'string' && palette.secondary.length > 0
          ? palette.secondary
          : foodDefaultTheme.secondary,
      accent:
        typeof palette.accent === 'string' && palette.accent.length > 0
          ? palette.accent
          : foodDefaultTheme.accent,
    },
    businessName,
    phone,
    phoneDisplay,
    email,
    city,
    area,
    heroBadge: resolveText(content.heroBadge, defaults.heroBadge),
    heroTitle: businessName || defaults.heroTitle,
    heroDescription: resolveText(content.subtitle, defaults.heroDescription),
    heroCta: resolveText(content.ctaQuoteLabel, defaults.heroCta),
    heroImage,
    aboutLabel: defaults.aboutLabel,
    aboutHeading: resolveText(content.aboutHeading, defaults.aboutHeading),
    about: resolveText(content.about, defaults.about),
    collage: {
      left: gallery[0]?.url || defaults.collageLeft,
      right: gallery[1]?.url || defaults.collageRight,
      center: aboutImage,
    },
    stats: trustFromContent.length >= 2 ? trustFromContent.slice(0, 2) : [...defaults.trustItems],
    infoItems: [
      {
        title: 'Nous trouver',
        text: locationText,
        icon: '/images/about-icon-0.svg',
      },
      {
        title: 'Horaires',
        text: hoursText,
        icon: '/images/about-icon-1.svg',
      },
      {
        title: 'Réservation',
        text: [phoneDisplay, email].filter(Boolean).join(' — ') || 'Sur place ou par téléphone',
        icon: '/images/about-icon-2.svg',
      },
    ],
    menuLabel: defaults.menuLabel,
    servicesHeading: resolveText(content.servicesHeading, defaults.servicesHeading),
    menuItems: servicesFromContent.length ? servicesFromContent : [...defaults.menuItems],
    reviewsLabel: defaults.reviewsLabel,
    reviewsHeading: resolveText(content.reviewsHeading, defaults.reviewsHeading),
    reviewQuote:
      typeof review?.text === 'string' && review.text.trim().length > 0
        ? review.text
        : defaults.reviewQuote,
    reviewAuthor:
      typeof review?.author === 'string' && review.author.trim().length > 0
        ? review.author
        : defaults.reviewAuthor,
    reviewCity: city || area || '',
    reviewImage: gallery[2]?.url || aboutImage || heroImage,
    features: [...defaults.features],
    contactLabel: defaults.contactLabel,
    contactHeading: resolveText(content.contactHeading, defaults.contactHeading),
    contactDescription: phoneDisplay
      ? `Appelez le ${phoneDisplay}${hoursText ? ` (${hoursText})` : ''}, ou réservez en ligne. Réservation conseillée pour les groupes.`
      : `Réservez en ligne ou passez nous voir. Réservation conseillée pour les groupes.`,
    contactCta: resolveText(content.ctaCallLabel, defaults.contactCta),
    socials: socialFromContent.length ? socialFromContent : [...defaults.socials],
    copyright: `© ${new Date().getFullYear()} ${businessName} — Tous droits réservés`,
  }
}
