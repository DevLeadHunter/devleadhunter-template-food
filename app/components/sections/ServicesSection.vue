<template>
  <section class="mx-auto max-w-5xl px-6 py-16">
    <h2 class="text-ink text-center text-3xl font-bold">Nos services</h2>
    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="(service, index) in content.services"
        :key="index"
        class="border-muted/20 rounded-2xl border p-6">
        <h3 class="text-ink text-lg font-semibold">{{ service.title }}</h3>
        <p
          v-if="service.description"
          class="text-muted mt-2 text-sm leading-relaxed">
          {{ service.description }}
        </p>
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { SiteContent } from '~/types/SiteContent'

/**
 * Services section — renders the list of services from the content.
 */
defineProps({
  content: {
    type: Object as PropType<SiteContent>,
    required: true,
  },
})
</script>
