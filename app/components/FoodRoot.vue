<template>
  <div
    class="food-root"
    :style="themeVars">
    <HeroSection :page="page" />
    <AboutSection :page="page" />
    <MenuSection :page="page" />
    <TestimonialSection :page="page" />
    <ContactSection :page="page" />
  </div>
</template>

<script lang="ts" setup>
/**
 * Template `food` — food truck / street food (DA crème & vert forêt).
 * Racine publique : rend un `SiteContent` typé, sans dépendance au tunnel.
 */
import type { ComputedRef, PropType } from 'vue'
import type { SiteContent } from '~/types/SiteContent'
import { buildFoodContent } from '~/types/food'
import type { FoodPageContent } from '~/types/food'
import HeroSection from './sections/HeroSection.vue'
import AboutSection from './sections/AboutSection.vue'
import MenuSection from './sections/MenuSection.vue'
import TestimonialSection from './sections/TestimonialSection.vue'
import ContactSection from './sections/ContactSection.vue'

const props = defineProps({
  content: {
    type: Object as PropType<SiteContent>,
    required: false,
    default: () => ({}),
  },
})

const page: ComputedRef<FoodPageContent> = computed((): FoodPageContent =>
  buildFoodContent(props.content),
)

const themeVars: ComputedRef<Record<string, string>> = computed((): Record<string, string> => ({
  '--color-brand': page.value.theme.primary,
  '--color-ink': page.value.theme.primary,
  '--color-cream': page.value.theme.secondary,
  '--color-accent': page.value.theme.accent,
}))

/** Logo prospect → favicon ; sinon favicon DA de la template. */
const faviconHref: ComputedRef<string> = computed((): string => {
  const logo: string = typeof props.content.logo === 'string' ? props.content.logo.trim() : ''
  return logo.length > 0 ? logo : '/images/favicon.svg'
})

useHead((): { title: string; link: Array<Record<string, string>> } => ({
  title: page.value.businessName,
  link: [
    { rel: 'icon', href: faviconHref.value },
    { rel: 'apple-touch-icon', href: faviconHref.value },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Ultra&display=swap',
    },
  ],
}))
</script>
