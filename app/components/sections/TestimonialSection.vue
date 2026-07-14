<template>
  <section class="testimonial">
    <WaveSeparator tone="white" />
    <div class="testimonial__body">
      <div class="testimonial__inner container">
        <div class="testimonial__heading">
          <ScribbleLabel
            kind="testimonial"
            align="center"
            >{{ testimonial.label }}</ScribbleLabel
          >
          <h2 class="section-title">{{ testimonial.title }}</h2>
        </div>

        <div class="testimonial__feature">
          <div class="testimonial__media">
            <div class="testimonial__thumb-wrap">
              <img
                class="testimonial__thumb"
                :src="testimonial.image"
                :alt="testimonial.author" />
              <img
                class="testimonial__blob"
                src="/images/deco-hero-blob.svg"
                alt=""
                aria-hidden="true" />
              <img
                class="testimonial__stars"
                src="/images/testimonial-stars.svg"
                alt=""
                aria-hidden="true" />
            </div>
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
import ScribbleLabel from './ScribbleLabel.vue'
import WaveSeparator from './WaveSeparator.vue'
</script>

<style scoped>
.testimonial__body {
  background: #fff;
  padding: 94px 0 120px;
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
  grid-template-columns: minmax(260px, 602px) minmax(0, 1fr);
  gap: 55px;
  align-items: center;
}

.testimonial__media {
  position: relative;
  display: flex;
  justify-content: center;
}

/* Pencil thumb frame 601.73×619.95; image 475×600 at x=64 */
.testimonial__thumb-wrap {
  position: relative;
  width: min(100%, 602px);
  aspect-ratio: 601.73 / 619.95;
}

.testimonial__thumb {
  position: absolute;
  left: 10.63%; /* 64/602 */
  top: 0;
  width: 78.94%; /* 475/602 */
  height: 96.78%; /* 600/620 */
  object-fit: cover;
  border-radius: var(--radius-arch) var(--radius-arch) 0 0;
}

.testimonial__blob {
  position: absolute;
  left: 0;
  top: 51.3%; /* 318/620 */
  width: 30.9%; /* 186/602 */
  pointer-events: none;
  z-index: 1;
}

/* Object-4 at (559, 521) in 602×620 frame */
.testimonial__stars {
  position: absolute;
  left: 92.9%; /* 559/602 */
  top: 84.03%; /* 521/620 */
  width: 7.1%; /* 43/602 */
  height: auto;
  pointer-events: none;
  z-index: 2;
}

.testimonial__quote {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  max-width: 575px;
}

/* Pencil quote-icon 44×30.25 */
.testimonial__mark {
  width: 44px;
  height: 30.25px;
}

.testimonial__text {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(22px, 2vw, 28px);
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
  justify-content: space-between;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-brand);
  overflow: visible;
}

.testimonial__feature-icon img {
  display: block;
  width: 40px;
  height: 40px;
  object-fit: contain;
  flex-shrink: 0;
}

.testimonial__feature-item h3 {
  margin: 0;
  max-width: 377px;
  font-family: var(--font-display);
  font-size: clamp(18px, 1.8vw, 24px);
  color: var(--color-brand);
}

@media (max-width: 1100px) {
  .testimonial__body {
    padding: 64px 0 88px;
  }

  .testimonial__feature {
    gap: 36px;
  }
}

@media (max-width: 700px) {
  .testimonial__body {
    padding: 48px 0 72px;
  }

  .testimonial__inner {
    gap: 40px;
  }

  .testimonial__feature {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .testimonial__thumb-wrap {
    max-width: 360px;
    margin-inline: auto;
  }

  .testimonial__features {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .testimonial__blob {
    display: none;
  }

  .testimonial__mark {
    width: 44px;
    height: 30px;
  }
}
</style>
