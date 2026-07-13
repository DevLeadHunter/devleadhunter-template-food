<template>
  <section class="testimonial">
    <WaveSeparator tone="white" />
    <div class="testimonial__body">
      <div class="testimonial__inner container">
        <div class="testimonial__heading">
          <span class="section-label">{{ testimonial.label }}</span>
          <h2 class="section-title">{{ testimonial.title }}</h2>
        </div>

        <div class="testimonial__feature">
          <div class="testimonial__media">
            <img
              class="testimonial__thumb"
              :src="testimonial.image"
              :alt="testimonial.author" />
            <img
              class="testimonial__blob"
              src="/images/deco-hero-blob.svg"
              alt=""
              aria-hidden="true" />
          </div>

          <div class="testimonial__quote">
            <img
              class="testimonial__mark"
              src="/images/quote-mark.svg"
              alt=""
              aria-hidden="true" />
            <p class="testimonial__text">{{ testimonial.quote }}</p>
            <div class="testimonial__author">
              <strong>{{ testimonial.author }}</strong>
              <span>{{ testimonial.city }}</span>
            </div>
          </div>
        </div>

        <div class="testimonial__features">
          <div
            v-for="item in testimonial.features"
            :key="item.title"
            class="testimonial__feature-item">
            <div class="testimonial__feature-icon">
              <img
                :src="item.icon"
                alt="" />
            </div>
            <h3>{{ item.title }}</h3>
          </div>
        </div>
      </div>
    </div>
    <WaveSeparator tone="dark" />
  </section>
</template>

<script lang="ts" setup>
import { testimonial } from '../../data/site'
import WaveSeparator from './WaveSeparator.vue'
</script>

<style scoped>
.testimonial__body {
  background: #fff;
  padding: 94px 0 72px;
}

.testimonial__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
}

.testimonial__heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  text-align: center;
}

.testimonial__heading .section-title {
  max-width: 774px;
}

.testimonial__feature {
  display: grid;
  width: 100%;
  max-width: 1170px;
  grid-template-columns: minmax(280px, 602px) minmax(0, 1fr);
  gap: 55px;
  align-items: center;
}

.testimonial__media {
  position: relative;
  display: flex;
  justify-content: center;
}

.testimonial__thumb {
  width: min(100%, 475px);
  aspect-ratio: 475 / 600;
  object-fit: cover;
  border-radius: var(--radius-arch) var(--radius-arch) 0 0;
}

.testimonial__blob {
  position: absolute;
  left: 0;
  top: 51%;
  width: 186px;
  height: 138px;
  pointer-events: none;
}

.testimonial__quote {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  max-width: 575px;
}

.testimonial__mark {
  width: 44px;
  height: 30px;
}

.testimonial__text {
  margin: 0;
  font-family: var(--font-display);
  font-size: 28px;
  line-height: 1.357;
  color: var(--color-brand);
}

.testimonial__author {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 24px;
}

.testimonial__author strong {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-brand);
}

.testimonial__author span {
  font-size: 16px;
  color: var(--color-brand);
}

.testimonial__features {
  display: grid;
  width: 100%;
  max-width: 1173px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 21px;
}

.testimonial__feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  text-align: center;
}

.testimonial__feature-icon {
  display: grid;
  place-items: center;
  width: 80px;
  height: 80px;
  border-radius: 100px;
  background: var(--color-brand);
}

.testimonial__feature-icon img {
  width: 36px;
  height: 36px;
}

.testimonial__feature-item h3 {
  margin: 0;
  max-width: 377px;
  font-family: var(--font-display);
  font-size: 24px;
  color: var(--color-brand);
}

@media (max-width: 900px) {
  .testimonial__body {
    padding: 56px 0 48px;
  }

  .testimonial__feature {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .testimonial__features {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .testimonial__blob {
    display: none;
  }
}
</style>
