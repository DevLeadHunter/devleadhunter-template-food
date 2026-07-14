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

const srcMap = {
  hero: '/images/underline-hero.svg',
  about: '/images/underline-about.svg',
  menu: '/images/underline-menu.svg',
  testimonial: '/images/underline-testimonial.svg',
  contact: '/images/underline-contact.svg',
} as const

const src = srcMap[props.kind]
</script>

<style scoped>
.scribble-label {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 39px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.7px;
  text-transform: lowercase;
  color: var(--color-brand);
  line-height: 1.2;
}

.scribble-label--center {
  justify-content: center;
}

.scribble-label--white {
  color: #fff;
}

.scribble-label__text {
  position: relative;
  z-index: 1;
  white-space: nowrap;
}

/*
  Pencil scribble underlines: path ~54×67, rotation -49.687°.
  Positions taken from .pen divider frames (x/y of the path).
*/
.scribble-label__mark {
  position: absolute;
  width: 53.9px;
  height: 67.3px;
  pointer-events: none;
  z-index: 0;
  transform: rotate(-49.687deg);
  transform-origin: center center;
}

.scribble-label--hero {
  width: 97px;
}

.scribble-label--hero .scribble-label__mark {
  left: 53.32px;
  top: -6px;
}

.scribble-label--about {
  width: 90px;
}

.scribble-label--about .scribble-label__mark {
  left: 46.88px;
  top: -7px;
}

.scribble-label--menu {
  width: 93px;
}

.scribble-label--menu .scribble-label__mark {
  left: 49.38px;
  top: -7px;
}

.scribble-label--testimonial {
  width: 140px;
}

.scribble-label--testimonial .scribble-label__mark {
  left: 95.32px;
  top: -14px;
}

/*
  Contact: flat peach wave under the label (gap 20 in Pencil),
  not the rotated scribble (that path is disabled in the .pen).
*/
.scribble-label--contact {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-height: 0;
  width: auto;
}

.scribble-label--contact .scribble-label__mark {
  position: static;
  width: 84.57px;
  height: 7.39px;
  transform: none;
}
</style>
