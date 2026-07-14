<template>
  <section class="hero">
    <div class="hero__stage container">
      <div class="hero__frame">
        <div class="hero__copy">
          <ScribbleLabel kind="hero">{{ page.heroBadge }}</ScribbleLabel>
          <div class="hero__text">
            <h1 class="hero__title">{{ page.heroTitle }}</h1>
            <p class="hero__desc">{{ page.heroDescription }}</p>
          </div>
          <a
            class="btn btn-primary"
            href="#menu"
            >{{ page.heroCta }}</a
          >
        </div>

        <img
          class="hero__thumb"
          :src="page.heroImage"
          :alt="page.heroTitle" />

        <img
          class="hero__blob"
          src="/images/deco-hero-blob.svg"
          alt=""
          aria-hidden="true" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { FoodPageContent } from '../../types/food'
import ScribbleLabel from './ScribbleLabel.vue'

defineProps({
  page: {
    type: Object as PropType<FoodPageContent>,
    required: true,
  },
})
</script>

<style scoped>
/* Pencil HERO: 1171×612 at x=134 inside 1440 canvas */
.hero {
  padding-top: 64px;
  padding-bottom: 96px;
}

.hero__stage {
  display: flex;
  justify-content: center;
}

.hero__frame {
  position: relative;
  width: 100%;
  max-width: 1171px;
  aspect-ratio: 1171 / 612;
}

.hero__copy {
  position: absolute;
  left: 0;
  top: 14.5%; /* 89/612 */
  z-index: 2;
  display: flex;
  width: min(55%, 646px);
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
}

.hero__text {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hero__title {
  margin: 0;
  max-width: 646px;
  font-family: var(--font-display);
  font-size: clamp(40px, 5vw, 72px);
  line-height: 0.889;
  color: var(--color-brand);
}

.hero__desc {
  margin: 0;
  max-width: 483px;
  font-size: clamp(16px, 1.4vw, 20px);
  line-height: 1.6;
  color: var(--color-brand);
}

.hero__thumb {
  position: absolute;
  right: 0;
  top: 0;
  width: 40.65%; /* 476/1171 */
  aspect-ratio: 476 / 600;
  object-fit: cover;
  border-radius: var(--radius-arch) var(--radius-arch) 0 0;
}

.hero__blob {
  position: absolute;
  left: 51.4%; /* 602/1171 */
  top: 77.5%; /* 474/612 */
  width: 15.9%; /* 186/1171 */
  z-index: 3;
  pointer-events: none;
}

@media (max-width: 1100px) {
  .hero {
    padding-bottom: 64px;
  }

  .hero__frame {
    aspect-ratio: auto;
    min-height: 0;
  }

  .hero__copy,
  .hero__thumb,
  .hero__blob {
    position: static;
  }

  .hero__frame {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 32px;
    align-items: center;
  }

  .hero__copy {
    width: auto;
  }

  .hero__thumb {
    width: 100%;
    max-width: 420px;
    justify-self: end;
  }

  .hero__blob {
    display: none;
  }
}

@media (max-width: 700px) {
  .hero {
    padding-top: 28px;
    padding-bottom: 64px;
  }

  .hero__frame {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .hero__thumb {
    max-width: 320px;
    justify-self: center;
    order: -1;
  }

  .hero__copy {
    align-items: flex-start;
  }
}
</style>
