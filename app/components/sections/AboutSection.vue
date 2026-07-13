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
            <span class="section-label">{{ about.label }}</span>
            <div class="about__heading-copy">
              <h2 class="section-title">{{ about.title }}</h2>
              <p>{{ about.description }}</p>
            </div>
          </div>

          <div class="about__collage">
            <div class="about__stat about__stat--tr">
              <strong>{{ about.stats[0].value }}</strong>
              <span class="about__stat-title">{{ about.stats[0].title }}</span>
              <span class="about__stat-sub">{{ about.stats[0].subtitle }}</span>
            </div>

            <img
              class="about__shot about__shot--left"
              :src="about.collage.left"
              alt="" />

            <img
              class="about__shot about__shot--center"
              :src="about.collage.center"
              alt="" />

            <img
              class="about__shot about__shot--right"
              :src="about.collage.right"
              alt="" />

            <div class="about__stat about__stat--bl">
              <strong>{{ about.stats[1].value }}</strong>
              <span class="about__stat-title">{{ about.stats[1].title }}</span>
              <span class="about__stat-sub">{{ about.stats[1].subtitle }}</span>
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
  width: 36px;
  height: 36px;
}

.about__info-text {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  max-width: 640px;
  font-size: 20px;
  line-height: 1.6;
  color: var(--color-brand);
}

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
  top: 1.3%;
  width: 23.76%;
  height: 50.07%;
  border-radius: var(--radius-arch-sm) var(--radius-arch-sm) 0 0;
}

.about__shot--right {
  left: 76.24%;
  top: 49.93%;
  width: 23.76%;
  height: 50.07%;
  border-radius: var(--radius-arch-sm) var(--radius-arch-sm) 0 0;
}

.about__shot--center {
  left: 32.3%;
  top: 0;
  width: 35.56%;
  height: 100%;
  border-radius: 208px;
}

.about__stat {
  position: absolute;
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
  padding: 24px;
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
  font-size: 42px;
  line-height: 1;
}

.about__stat-title {
  font-family: var(--font-display);
  font-size: 16px;
}

.about__stat-sub {
  font-size: 12px;
  font-weight: 600;
  opacity: 0.95;
}

.about__leaf {
  position: absolute;
  left: 72.16%;
  top: 5.13%;
  width: 8%;
  z-index: 2;
  pointer-events: none;
}

@media (max-width: 900px) {
  .about__body {
    padding: 56px 0 72px;
  }

  .about__info {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .about__collage {
    aspect-ratio: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    height: auto;
  }

  .about__shot,
  .about__stat,
  .about__leaf {
    position: static;
    width: 100%;
  }

  .about__shot--center {
    grid-column: 1 / -1;
    height: 420px;
    border-radius: 160px;
  }

  .about__shot--left,
  .about__shot--right {
    height: 220px;
  }

  .about__stat {
    aspect-ratio: 1;
    width: 100%;
  }

  .about__leaf {
    display: none;
  }
}
</style>
