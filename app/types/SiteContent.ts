/**
 * Re-export of the shared content contract, so components can keep importing from
 * `~/types/SiteContent`. The single source of truth lives in the
 * `@devleadhunter/website-content` package — never redefine these types here.
 */
export type {
  SiteContent,
  SiteContentPalette,
  SiteContentService,
  SiteContentReview,
  SiteContentFaqItem,
  SiteContentGalleryImage,
  SiteContentOpeningHours,
} from '@devleadhunter/website-content'

export { emptySiteContent } from '@devleadhunter/website-content'
