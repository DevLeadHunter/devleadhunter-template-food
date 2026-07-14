<template>
  <section class="about">
    <WaveSeparator tone="white" />
    <div class="about__body">
      <div class="container">
        <div class="about__info">
          <div
            v-for="item in aboutInfo"
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
              >{{ about.label }}</ScribbleLabel
            >
            <div class="about__heading-copy">
              <h2 class="section-title">{{ about.title }}</h2>
              <p>{{ about.description }}</p>
            </div>
          </div>

          <div class="about__collage">
            <!-- top-right Instagram circle -->
            <div class="about__stat about__stat--tr">
              <img
                class="about__stat-icon"
                :src="about.stats[0].icon"
                alt="" />
              <strong>{{ about.stats[0].value }}</strong>
              <span class="about__stat-sub">{{ about.stats[0].subtitle }}</span>
              <span class="about__stat-title">{{ about.stats[0].title }}</span>
            </div>

            <img
              class="about__shot about__shot--left"
              :src="about.collage.left"
              alt="" />

            <div class="about__center">
              <img
                class="about__shot about__shot--center"
                :src="about.collage.center"
                alt="" />
              <img
                class="about__strokes"
                src="/images/deco-hero-blob.svg"
                alt=""
                aria-hidden="true" />
            </div>

            <img
              class="about__shot about__shot--right"
              :src="about.collage.right"
              alt="" />

            <!-- bottom-left YouTube circle -->
            <div class="about__stat about__stat--bl">
              <img
                class="about__stat-icon"
                :src="about.stats[1].icon"
                alt="" />
              <strong>{{ about.stats[1].value }}</strong>
              <span class="about__stat-sub">{{ about.stats[1].subtitle }}</span>
              <span class="about__stat-title">{{ about.stats[1].title }}</span>
            </div>

            <img
              class="about__leaf"
              src="/images/deco-about-leaf.svg"
              alt=""
              aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { about, aboutInfo } from '../../data/site'
import ScribbleLabel from './ScribbleLabel.vue'
import WaveSeparator from './WaveSeparator.vue'
</script>

<style scoped>
.about__body {
  background: #fff;
  padding: 88px 0 120px;
}

.about__info {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 60px;
}

.about__info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  text-align: center;
}

.about__info-icon {
  display: grid;
  place-items: center;
  width: 80px;
  height: 80px;
  border-radius: 100px;
  background: var(--color-brand);
}

.about__info-icon img {
  width: 32px;
  height: 32px;
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
  padding: 24px 18px 18px;
}

.about__stat-icon {
  width: 28px;
  height: 28px;
  margin-bottom: 4px;
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

.about__leaf {
  position: absolute;
  left: 72.16%; /* 844/1170 */
  top: 5.13%;
  width: 8.03%;
  z-index: 3;
  pointer-events: none;
}

@media (max-width: 1100px) {
  .about__body {
    padding: 64px 0 80px;
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
    padding: 48px 0 56px;
  }

  .about__info {
    grid-template-columns: 1fr;
    gap: 28px;
    margin-bottom: 40px;
  }

  .about__content {
    gap: 40px;
  }

  .about__collage {
    aspect-ratio: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .about__shot,
  .about__stat,
  .about__center,
  .about__leaf,
  .about__strokes {
    position: static;
    width: 100%;
  }

  .about__center {
    grid-column: 1 / -1;
    width: 100%;
    max-width: 280px;
    margin-inline: auto;
    aspect-ratio: 416 / 679;
  }

  .about__shot--center {
    position: absolute;
    inset: 0;
    width: 100%;
    left: 0;
    border-radius: 999px;
  }

  .about__center {
    position: relative;
  }

  .about__shot--left,
  .about__shot--right {
    height: 200px;
    width: 100%;
  }

  .about__stat {
    width: 100%;
    min-height: 160px;
  }

  .about__leaf,
  .about__strokes {
    display: none;
  }
}
</style>
