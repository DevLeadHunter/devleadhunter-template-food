<template>
  <section class="hero">
    <div class="hero__inner container">
      <div class="hero__copy">
        <div class="hero__label">
          <span class="section-label">{{ hero.label }}</span>
          <img
            class="hero__label-line"
            src="/images/divider-hero.svg"
            alt=""
            aria-hidden="true" />
        </div>
        <div class="hero__text">
          <h1 class="hero__title">{{ hero.title }}</h1>
          <p class="hero__desc">{{ hero.description }}</p>
        </div>
        <a
          class="btn btn-primary"
          href="#menu"
          >{{ hero.cta }}</a
        >
      </div>

      <div class="hero__media">
        <img
          class="hero__leaf"
          src="/images/deco-hero-leaf.svg"
          alt=""
          aria-hidden="true" />
        <img
          class="hero__thumb"
          :src="hero.image"
          :alt="hero.title" />
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
import { hero } from '../../data/site'
</script>

<style scoped>
.hero {
  padding-top: 64px;
  padding-bottom: 48px;
}

.hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 476px);
  gap: 48px;
  align-items: center;
}

.hero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  max-width: 646px;
}

.hero__label {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 39px;
}

.hero__label-line {
  position: absolute;
  left: 53px;
  top: -6px;
  width: 54px;
  height: 67px;
  pointer-events: none;
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
  font-size: 72px;
  line-height: 0.889;
  color: var(--color-brand);
}

.hero__desc {
  margin: 0;
  max-width: 483px;
  font-size: 20px;
  line-height: 1.6;
  color: var(--color-brand);
}

.hero__media {
  position: relative;
  width: 100%;
  max-width: 476px;
  justify-self: end;
}

.hero__thumb {
  width: 100%;
  aspect-ratio: 476 / 600;
  object-fit: cover;
  border-radius: var(--radius-arch) var(--radius-arch) 0 0;
}

.hero__leaf {
  position: absolute;
  left: -30%;
  top: 8%;
  width: 94px;
  height: 93px;
  z-index: 2;
  pointer-events: none;
}

.hero__blob {
  position: absolute;
  left: -19%;
  bottom: 2%;
  width: 186px;
  height: 138px;
  z-index: 2;
  pointer-events: none;
}

@media (max-width: 900px) {
  .hero {
    padding-top: 32px;
  }

  .hero__inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .hero__title {
    font-size: 48px;
  }

  .hero__media {
    justify-self: center;
  }

  .hero__leaf {
    left: -8%;
  }

  .hero__blob {
    left: -6%;
  }
}
</style>
