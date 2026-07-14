<template>
  <span
    class="scribble-label"
    :class="[`scribble-label--${kind}`, `scribble-label--${tone}`, `scribble-label--${align}`]">
    <span class="scribble-label__text"><slot /></span>
    <img
      class="scribble-label__mark"
      :src="src"
      alt=""
      aria-hidden="true" />
  </span>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    kind?: 'hero' | 'about' | 'menu' | 'testimonial' | 'contact'
    tone?: 'brand' | 'peach' | 'gold' | 'white'
    align?: 'start' | 'center'
  }>(),
  {
    kind: 'hero',
    tone: 'brand',
    align: 'start',
  },
)

/** Pencil-rendered underlines (rotation baked in export) */
const srcMap = {
  hero: '/images/underline-hero.png',
  about: '/images/underline-about.png',
  menu: '/images/underline-menu.png',
  testimonial: '/images/underline-testimonial.png',
  contact: '/images/underline-contact.png',
} as const

const src = srcMap[props.kind]
</script>

<style scoped>
.scribble-label {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  color: var(--color-brand);
  line-height: 1.2;
}

.scribble-label--center {
  align-items: center;
  text-align: center;
}

.scribble-label--white {
  color: #fff;
}

.scribble-label__text {
  white-space: nowrap;
}

.scribble-label__mark {
  display: block;
  width: 86px;
  height: auto;
  pointer-events: none;
  user-select: none;
}

.scribble-label--contact {
  gap: 8px;
}

.scribble-label--contact .scribble-label__mark {
  width: 128px;
  height: auto;
  opacity: 1;
  filter: none;
}

.scribble-label--testimonial .scribble-label__mark {
  width: 100px;
}
</style>
