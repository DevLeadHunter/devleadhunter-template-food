<template>
  <section class="px-6 py-20 text-center">
    <p
      v-if="content.city"
      class="text-brand text-sm font-semibold tracking-wide uppercase">
      {{ content.city }}
    </p>
    <h1 class="text-ink mt-2 text-4xl font-bold sm:text-5xl">{{ content.businessName }}</h1>
    <p
      v-if="content.subtitle"
      class="text-muted mx-auto mt-4 max-w-2xl text-lg">
      {{ content.subtitle }}
    </p>
    <a
      v-if="content.phone"
      :href="`tel:${content.phone}`"
      class="bg-brand hover:bg-brand-soft mt-8 inline-block rounded-xl px-6 py-3 font-semibold text-white transition-colors">
      {{ content.phone }}
    </a>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { SiteContent } from '~/types/SiteContent'

/**
 * Hero section — business name, city, tagline and a click-to-call CTA.
 */
defineProps({
  content: {
    type: Object as PropType<SiteContent>,
    required: true,
  },
})
</script>
