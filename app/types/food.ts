/**
 * Types + construction du contenu de la template `food` (food truck / street food).
 *
 * La template rend un `SiteContent` typé et porte sa copie éditoriale (défauts métier
 * restauration / food truck). Miroir de `api/services/templates/food.py`.
 *
 * Règle : une clé absente / vide → on n'affiche pas le bloc (pas de faux Instagram,
 * pas de prix inventés sur des services scrapés, pas d'images cassées).
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
  hasReview: boolean
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

/** URLs Unsplash vérifiées (200) — fallbacks menu / collage uniquement. */
const FALLBACK_DISH_IMAGES: string[] = [
  'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=70',
  'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=70',
  'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=70',
  'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=70',
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
  heroDescription:
    'Street food préparée sur place, produits frais et recettes maison — on vient à vous.',
  heroCta: 'Voir le menu',
  aboutLabel: 'à propos',
  aboutHeading: 'Notre histoire gourmande',
  about:
    'Food truck de quartier : burgers, wings et classics préparés à la minute. ' +
    'On privilégie les circuits courts, les sauces maison et le service rapide — ' +
    'sur votre place préférée ou pour vos événements.',
  servicesHeading: 'Nos spécialités',
  menuLabel: 'notre menu',
  /** Menu éditorial de la template (prix + images) — utilisé seulement si aucun service scrapé. */
  menuItems: [
    {
      title: 'Burger dinde, œuf & fromage',
      description: 'Pain brioché, dinde grillée, œuf coulant, cheddar et sauce maison.',
      price: '12 €',
      image: FALLBACK_DISH_IMAGES[0],
    },
    {
      title: 'Hot wings & frites',
      description: 'Ailes marinées, sauce piquante et frites croustillantes.',
      price: '11 €',
      image: FALLBACK_DISH_IMAGES[1],
    },
    {
      title: 'Duo hot-dog & soda',
      description: 'Deux hot-dogs garnis, frites et boisson au choix.',
      price: '13 €',
      image: FALLBACK_DISH_IMAGES[2],
    },
    {
      title: 'Soda float glacé',
      description: 'Boisson gazeuse et boule de glace vanille — le classique.',
      price: '6 €',
      image: FALLBACK_DISH_IMAGES[3],
    },
  ] as FoodMenuItem[],
  reviewsLabel: 'témoignages',
  reviewsHeading: 'Ce qu’ils en disent',
  features: [
    { title: 'Produits de qualité', icon: '/images/feature-icon-0.svg' },
    { title: 'Ambiance conviviale', icon: '/images/feature-icon-1.svg' },
    { title: 'Prix justes', icon: '/images/feature-icon-2.svg' },
  ] as FoodFeatureItem[],
  contactLabel: 'réservez',
  contactHeading: 'Réserver une table',
  contactCta: 'Envoyer la demande',
}

function resolveText(value: string | undefined, fallback: string): string {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback
}

function nonEmpty(value: string | undefined | null): string {
  return typeof value === 'string' ? value.trim() : ''
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
    return ''
  }
  const first = hours[0]
  const day: string = first?.day?.trim() || ''
  const slot: string = first?.hours?.trim() || ''
  if (day && slot) {
    return `${day} ${slot}`
  }
  return slot || day
}

/** Prix en fin de description : « … — 12 € ». */
function extractPrice(description: string): { text: string; price: string } {
  const match: RegExpMatchArray | null = description.match(/^(.*)\s*[—–-]\s*(\d+[.,]?\d*\s*€)\s*$/u)
  if (match) {
    return { text: (match[1] ?? '').trim(), price: (match[2] ?? '').trim() }
  }
  return { text: description, price: '' }
}

/**
 * Accepte uniquement une URL de profil réelle (pas bare `instagram.com/`).
 */
function isRealSocialUrl(url: string): boolean {
  if (!/^https?:\/\//i.test(url)) {
    return false
  }
  try {
    const parsed = new URL(url)
    const path: string = parsed.pathname.replace(/\/+$/, '')
    return path.length > 1
  } catch {
    return false
  }
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
          url: typeof item?.url === 'string' ? item.url.trim() : '',
          alt: typeof item?.alt === 'string' ? item.alt : '',
        }))
        .filter((item) => item.url.length > 0)
    : []

  const businessName: string = resolveText(content.businessName, 'Food trucks')
  const phone: string = nonEmpty(content.phone)
  const email: string = nonEmpty(content.email)
  const city: string = nonEmpty(content.city)
  const area: string = nonEmpty(content.area) || city
  const phoneDisplay: string = phone ? formatPhoneDisplay(phone) : ''
  const hoursText: string = formatOpeningHours(content.openingHours)
  const locationText: string = area || city

  const trustFromContent: FoodStatItem[] = Array.isArray(content.trustItems)
    ? content.trustItems
        .map((item) => ({
          value: nonEmpty(item?.value),
          title: '',
          subtitle: nonEmpty(item?.label),
        }))
        .filter((item) => item.value.length > 0)
    : []

  const hasScrapedServices: boolean =
    Array.isArray(content.services) &&
    content.services.some((service) => nonEmpty(service?.title).length > 0)

  const servicesFromContent: FoodMenuItem[] = hasScrapedServices
    ? (content.services ?? [])
        .map((service, index) => {
          const rawDesc: string = nonEmpty(service?.description)
          const { text, price } = extractPrice(rawDesc)
          const iconImage: string = nonEmpty(service?.icon)
          const galleryImage: string = gallery[index]?.url ?? ''
          return {
            title: nonEmpty(service?.title),
            description: text,
            // Prix uniquement s'il est dans la description — jamais inventé.
            price,
            image: iconImage || galleryImage || '',
          }
        })
        .filter((item) => item.title.length > 0)
    : [...defaults.menuItems]

  const review = Array.isArray(content.reviews)
    ? content.reviews.find(
        (item) => nonEmpty(item?.text).length > 0 && nonEmpty(item?.author).length > 0,
      )
    : undefined
  const hasReview: boolean = Boolean(review)

  const socialFromContent: FoodSocialItem[] = Array.isArray(content.social)
    ? content.social
        .map((item) => {
          const network: string = nonEmpty(item?.network).toLowerCase()
          const url: string = nonEmpty(item?.url)
          if (!network || !isRealSocialUrl(url)) {
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

  const heroImage: string = nonEmpty(content.heroImage) || gallery[0]?.url || ''
  const aboutImage: string =
    nonEmpty(content.aboutImage) || gallery[1]?.url || gallery[0]?.url || ''

  // Collage : 3 sources distinctes autant que possible.
  const collageLeft: string = gallery[0]?.url || heroImage || ''
  const collageCenter: string = aboutImage || gallery[1]?.url || collageLeft
  const collageRight: string =
    gallery[2]?.url ||
    gallery[3]?.url ||
    (gallery[1]?.url && gallery[1].url !== collageCenter ? gallery[1].url : '') ||
    gallery[0]?.url ||
    ''

  const infoItems: FoodInfoItem[] = []
  if (locationText) {
    infoItems.push({
      title: 'Nous trouver',
      text: locationText,
      icon: '/images/about-icon-0.svg',
    })
  }
  if (hoursText) {
    infoItems.push({
      title: 'Horaires',
      text: hoursText,
      icon: '/images/about-icon-1.svg',
    })
  }
  const reservationText: string = [phoneDisplay, email].filter(Boolean).join(' — ')
  if (reservationText) {
    infoItems.push({
      title: 'Réservation',
      text: reservationText,
      icon: '/images/about-icon-2.svg',
    })
  }

  let contactDescription: string = ''
  if (phoneDisplay && hoursText) {
    contactDescription = `Appelez le ${phoneDisplay} (${hoursText}), ou écrivez-nous. Réservation conseillée pour les groupes.`
  } else if (phoneDisplay) {
    contactDescription = `Appelez le ${phoneDisplay}, ou écrivez-nous via le formulaire.`
  } else if (email) {
    contactDescription = `Écrivez-nous via le formulaire. Réservation conseillée pour les groupes.`
  }

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
    heroTitle: businessName,
    heroDescription: resolveText(content.subtitle, defaults.heroDescription),
    heroCta: resolveText(content.ctaQuoteLabel, defaults.heroCta),
    heroImage,
    aboutLabel: defaults.aboutLabel,
    aboutHeading: resolveText(content.aboutHeading, defaults.aboutHeading),
    about: resolveText(content.about, defaults.about),
    collage: {
      left: collageLeft,
      right: collageRight,
      center: collageCenter,
    },
    stats: trustFromContent.slice(0, 2),
    infoItems,
    menuLabel: defaults.menuLabel,
    servicesHeading: resolveText(content.servicesHeading, defaults.servicesHeading),
    menuItems: servicesFromContent,
    hasReview,
    reviewsLabel: defaults.reviewsLabel,
    reviewsHeading: resolveText(content.reviewsHeading, defaults.reviewsHeading),
    reviewQuote: hasReview ? nonEmpty(review?.text) : '',
    reviewAuthor: hasReview ? nonEmpty(review?.author) : '',
    reviewCity: city || area,
    reviewImage: gallery[2]?.url || aboutImage || heroImage || '',
    features: [...defaults.features],
    contactLabel: defaults.contactLabel,
    contactHeading: resolveText(content.contactHeading, defaults.contactHeading),
    contactDescription,
    contactCta: resolveText(content.ctaCallLabel, defaults.contactCta),
    socials: socialFromContent,
    copyright: `© ${new Date().getFullYear()} ${businessName} — Tous droits réservés`,
  }
}
