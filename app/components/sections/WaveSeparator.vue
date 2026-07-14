<template>
  <div
    class="wave"
    :class="[`wave--${tone}`, { 'wave--masked': tone === 'dark' }]"
    :style="maskStyle"
    aria-hidden="true">
    <img
      v-if="tone !== 'dark'"
      :src="src"
      alt="" />
  </div>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'

const props = withDefaults(
  defineProps<{
    tone?: 'white' | 'light' | 'dark'
  }>(),
  {
    tone: 'white',
  },
)

const srcMap = {
  white: '/images/wave-white.svg',
  light: '/images/wave-light.svg',
  dark: '/images/wave-dark.svg',
} as const

const src = srcMap[props.tone]

/**
 * Vague sombre : masque CSS teinté avec `--color-brand`
 * (le SVG source est figé en vert forêt).
 */
const maskStyle: ComputedRef<Record<string, string> | undefined> = computed(() => {
  if (props.tone !== 'dark') {
    return undefined
  }
  const url = `url(${src})`
  return {
    maskImage: url,
    WebkitMaskImage: url,
  }
})
</script>

<style scoped>
.wave {
  display: block;
  width: 100%;
  line-height: 0;
  overflow: hidden;
}

.wave img {
  display: block;
  width: 100%;
  height: 56px;
  object-fit: fill;
  object-position: center top;
}

.wave--white {
  background: #fff;
  margin-top: -28px;
}

.wave--light {
  background: var(--color-cream);
  margin-top: -28px;
}

.wave--dark {
  background: var(--color-brand);
  margin-bottom: -1px;
}

.wave--masked {
  height: 56px;
  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: center top;
  -webkit-mask-position: center top;
}
</style>
