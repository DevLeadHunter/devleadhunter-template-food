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
  overflow: hidden;
}

.wave img {
  display: block;
  width: 100%;
  height: 38px;
  object-fit: fill;
}

/*
  Dark tear: green jagged edge sitting on the brand block.
  Negative margin pulls it flush with the contact body below.
*/
.wave--dark {
  background: var(--color-brand);
  margin-bottom: -1px;
}

.wave--dark img {
  height: 44px;
}
</style>
