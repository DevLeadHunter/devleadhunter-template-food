<template>
  <section class="about">
    <WaveSeparator tone="white" />
    <div class="about__body">
      <div class="container">
        <div class="about__info">
          <div
            v-for="item in page.infoItems"
            :key="item.title"
            class="about__info-item">
            <div class="about__info-icon">
              <img
                :src="item.icon"
                alt="" />
            </div>
            <div class="about__info-text">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </div>
        </div>

        <div class="about__content">
          <div class="about__heading">
            <ScribbleLabel
              kind="about"
              align="center"
              >{{ page.aboutLabel }}</ScribbleLabel
            >
            <div class="about__heading-copy">
              <h2 class="section-title">{{ page.aboutHeading }}</h2>
              <p>{{ page.about }}</p>
            </div>
          </div>

          <div class="about__collage">
            <div
              v-if="page.stats[0]"
              class="about__stat about__stat--tr">
              <strong>{{ page.stats[0].value }}</strong>
              <span
                v-if="page.stats[0].subtitle"
                class="about__stat-sub"
                >{{ page.stats[0].subtitle }}</span
              >
              <span
                v-if="page.stats[0].title"
                class="about__stat-title"
                >{{ page.stats[0].title }}</span
              >
            </div>

            <img
              class="about__shot about__shot--left"
              :src="page.collage.left"
              alt="" />

            <div class="about__center">
              <img
                class="about__shot about__shot--center"
                :src="page.collage.center"
                alt="" />
              <img
                class="about__strokes"
                src="/images/deco-hero-blob.svg"
                alt=""
                aria-hidden="true" />
            </div>

            <img
              class="about__shot about__shot--right"
              :src="page.collage.right"
              alt="" />

            <div
              v-if="page.stats[1]"
              class="about__stat about__stat--bl">
              <strong>{{ page.stats[1].value }}</strong>
              <span
                v-if="page.stats[1].subtitle"
                class="about__stat-sub"
                >{{ page.stats[1].subtitle }}</span
              >
              <span
                v-if="page.stats[1].title"
                class="about__stat-title"
                >{{ page.stats[1].title }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { FoodPageContent } from '../../types/food'
import ScribbleLabel from './ScribbleLabel.vue'
import WaveSeparator from './WaveSeparator.vue'

defineProps({
  page: {
    type: Object as PropType<FoodPageContent>,
    required: true,
  },
})
</script>

<style scoped>
.about__body {
  background: #fff;
  padding: 48px 0 120px;
  overflow-x: clip;
}

.about__info {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 100px;
  padding-top: 40px;
  padding-bottom: 20px;
}

.about__info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  text-align: center;
}

.about__info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-brand);
  overflow: visible;
}

.about__info-icon img {
  display: block;
  width: 40px;
  height: 40px;
  object-fit: contain;
  flex-shrink: 0;
}

.about__info-text {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 377px;
}

.about__info-text h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 24px;
  color: var(--color-brand);
}

.about__info-text p {
  margin: 0;
  font-size: 18px;
  line-height: 1.45;
  color: var(--color-brand);
}

.about__content {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.about__heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  text-align: center;
}

.about__heading-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 774px;
}

.about__heading-copy p {
  margin: 0;
  width: 100%;
  max-width: 774px;
  font-size: 20px;
  line-height: 1.6;
  color: var(--color-brand);
}

/* Pencil collage 1170×679 */
.about__collage {
  position: relative;
  width: 100%;
  max-width: 1170px;
  margin-inline: auto;
  aspect-ratio: 1170 / 679;
  overflow: hidden;
}

.about__shot {
  position: absolute;
  object-fit: cover;
}

.about__shot--left {
  left: 0;
  top: 1.325%; /* 9/679 */
  width: 23.76%; /* 278/1170 */
  height: 50.07%; /* 340/679 */
  border-radius: var(--radius-arch-sm) var(--radius-arch-sm) 0 0;
}

.about__shot--right {
  left: 76.24%; /* 892/1170 */
  top: 49.93%; /* 339/679 */
  width: 23.76%;
  height: 50.07%;
  border-radius: var(--radius-arch-sm) var(--radius-arch-sm) 0 0;
}

.about__center {
  position: absolute;
  left: 27.18%; /* 318/1170 */
  top: 0;
  width: 40.6%; /* 475/1170 */
  height: 100%;
}

.about__shot--center {
  position: absolute;
  left: 12.42%; /* 59/475 */
  top: 0;
  width: 87.58%; /* 416/475 */
  height: 100%;
  border-radius: 208px;
}

.about__strokes {
  position: absolute;
  left: 0;
  top: 79.5%; /* 540/679 */
  width: 39%; /* ~185/475 */
  z-index: 2;
  pointer-events: none;
}

.about__stat {
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 23.76%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--color-brand);
  color: #fff;
  text-align: center;
  padding: 24px 16px 18px;
  box-sizing: border-box;
}

.about__stat--tr {
  left: 76.24%;
  top: 1.18%;
}

.about__stat--bl {
  left: 0;
  top: 58.47%;
}

.about__stat strong {
  font-family: var(--font-display);
  font-size: clamp(28px, 3.2vw, 42px);
  letter-spacing: 0.05em;
  line-height: 1;
}

.about__stat-title {
  font-family: var(--font-display);
  font-size: 16px;
}

.about__stat-sub {
  font-size: 12px;
  font-weight: 600;
}

@media (max-width: 1100px) {
  .about__body {
    padding: 40px 0 80px;
  }

  .about__info {
    margin-bottom: 72px;
    padding-top: 28px;
  }

  .about__info-text h3 {
    font-size: 20px;
  }

  .about__info-text p {
    font-size: 16px;
  }

  .about__heading-copy p {
    font-size: 18px;
  }
}

@media (max-width: 700px) {
  .about__body {
    padding: 32px 0 56px;
  }

  .about__info {
    grid-template-columns: 1fr;
    gap: 28px;
    margin-bottom: 48px;
    padding-top: 20px;
  }

  .about__content {
    gap: 40px;
  }

  .about__collage {
    aspect-ratio: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'center center'
      'left right'
      'stat-bl stat-tr';
    gap: 14px;
    max-width: 100%;
    overflow: hidden;
  }

  .about__shot,
  .about__stat,
  .about__center,
  .about__strokes {
    position: static;
    left: auto;
    top: auto;
    width: 100%;
    height: auto;
  }

  .about__center {
    grid-area: center;
    width: min(100%, 260px);
    margin-inline: auto;
    aspect-ratio: 416 / 560;
    position: relative;
  }

  .about__shot--center {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 999px;
    object-fit: cover;
  }

  .about__shot--left {
    grid-area: left;
    height: 200px;
    border-radius: var(--radius-arch-sm) var(--radius-arch-sm) 0 0;
    object-fit: cover;
  }

  .about__shot--right {
    grid-area: right;
    height: 200px;
    border-radius: var(--radius-arch-sm) var(--radius-arch-sm) 0 0;
    object-fit: cover;
  }

  .about__stat--tr {
    grid-area: stat-tr;
  }

  .about__stat--bl {
    grid-area: stat-bl;
  }

  .about__stat {
    width: 100%;
    aspect-ratio: 1;
    min-height: 0;
    padding: 16px 12px;
  }

  .about__stat strong {
    font-size: clamp(24px, 8vw, 32px);
  }

  .about__stat-title {
    font-size: 14px;
  }

  .about__strokes {
    display: none;
  }
}
</style>
