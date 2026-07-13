<template>
  <div class="food-root">
    <HeroSection />
    <AboutSection />
    <MenuSection />
    <TestimonialSection />
    <ContactSection />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { SiteContent } from '~/types/SiteContent'
import HeroSection from './sections/HeroSection.vue'
import AboutSection from './sections/AboutSection.vue'
import MenuSection from './sections/MenuSection.vue'
import TestimonialSection from './sections/TestimonialSection.vue'
import ContactSection from './sections/ContactSection.vue'

/**
 * Root component of the food template — public entry point for demo-host later.
 * For now sections use hardcoded Pencil content (no SiteContent wiring yet).
 */
defineProps({
  content: {
    type: Object as PropType<SiteContent>,
    required: false,
    default: () => ({}),
  },
})

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Ultra&display=swap',
    },
  ],
})
</script>
