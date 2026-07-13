<template>
  <div
    class="wave"
    :class="`wave--${tone}`"
    aria-hidden="true">
    <img
      :src="src"
      alt="" />
  </div>
</template>

<script lang="ts" setup>
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
</script>

<style scoped>
.wave {
  display: block;
  width: 100%;
  line-height: 0;
}

.wave img {
  width: 100%;
  height: 37px;
  object-fit: fill;
}
</style>
