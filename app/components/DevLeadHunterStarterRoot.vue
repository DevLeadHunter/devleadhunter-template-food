<template>
  <div class="bg-surface text-ink min-h-dvh font-sans">
    <HeroSection
      v-if="hasHero"
      :content="content" />
    <ServicesSection
      v-if="hasServices"
      :content="content" />
    <!--
      Add your sections here. Import each one from ./sections/ (they are NOT auto-imported
      globally, so they never collide with another template's sections in demo-host).
      An empty content key = a hidden section.
    -->
  </div>
</template>

<script lang="ts" setup>
import type { ComputedRef, PropType } from 'vue'
import { computed } from 'vue'
import type { SiteContent } from '~/types/SiteContent'
import HeroSection from './sections/HeroSection.vue'
import ServicesSection from './sections/ServicesSection.vue'

/**
 * Root component of the template — the single public entry point rendered by demo-host.
 *
 * When you scaffold a real template, rename this file and component to `<TemplateId>Root.vue`
 * (e.g. `PlumberCuivreRoot.vue`) so each template exposes a uniquely-named root.
 */
const props = defineProps({
  content: {
    type: Object as PropType<SiteContent>,
    required: true,
  },
})

/** Whether the hero section has enough content to render. */
const hasHero: ComputedRef<boolean> = computed((): boolean => Boolean(props.content.businessName))

/** Whether the services section has at least one service. */
const hasServices: ComputedRef<boolean> = computed(
  (): boolean => (props.content.services?.length ?? 0) > 0,
)

// Fonts are declared HERE (not in a shared global <head>) so that, since demo-host lazy-loads
// only the rendered template's root, a visitor downloads THIS template's font and no other's.
// Swap Inter for your template's typeface.
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    },
  ],
})
</script>
