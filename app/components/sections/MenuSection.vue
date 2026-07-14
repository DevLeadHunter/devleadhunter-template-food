<template>
  <section
    id="menu"
    class="menu">
    <WaveSeparator tone="light" />
    <div class="menu__body">
      <div class="menu__inner container">
        <div class="menu__heading">
          <ScribbleLabel
            kind="menu"
            align="center"
            >{{ page.menuLabel }}</ScribbleLabel
          >
          <h2 class="section-title">{{ page.servicesHeading }}</h2>
        </div>

        <div
          v-if="page.menuItems.length"
          class="menu__rows">
          <div class="menu__row">
            <article
              v-for="item in page.menuItems.slice(0, 2)"
              :key="item.title"
              class="menu-card">
              <img
                v-if="item.image"
                class="menu-card__thumb"
                :src="item.image"
                :alt="item.title" />
              <div class="menu-card__text">
                <h3>{{ item.title }}</h3>
                <p v-if="item.description">{{ item.description }}</p>
              </div>
              <span
                v-if="item.price"
                class="menu-card__price"
                >{{ item.price }}</span
              >
            </article>
          </div>

          <img
            v-if="page.menuItems.length > 2"
            class="menu__deco"
            src="/images/deco-menu.svg"
            alt=""
            aria-hidden="true" />

          <div
            v-if="page.menuItems.length > 2"
            class="menu__row">
            <article
              v-for="item in page.menuItems.slice(2)"
              :key="item.title"
              class="menu-card">
              <img
                v-if="item.image"
                class="menu-card__thumb"
                :src="item.image"
                :alt="item.title" />
              <div class="menu-card__text">
                <h3>{{ item.title }}</h3>
                <p v-if="item.description">{{ item.description }}</p>
              </div>
              <span
                v-if="item.price"
                class="menu-card__price"
                >{{ item.price }}</span
              >
            </article>
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
.menu__body {
  padding: 136px 0 120px;
  background: var(--color-cream);
}

.menu__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
}

.menu__heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  text-align: center;
}

.menu__heading .section-title {
  max-width: 774px;
}

.menu__rows {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 57px;
}

.menu__row {
  display: grid;
  width: 100%;
  max-width: 1170px;
  grid-template-columns: repeat(2, minmax(0, 535px));
  justify-content: space-between;
  gap: 40px 100px;
}

.menu__deco {
  width: min(164px, 28vw);
  height: auto;
}

.menu-card {
  display: flex;
  width: 100%;
  min-height: 473px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 40px 28px;
  border-radius: var(--radius-card);
  background: #fff;
  text-align: center;
}

.menu-card__thumb {
  width: min(200px, 42vw);
  height: min(200px, 42vw);
  border-radius: 50%;
  object-fit: cover;
}

.menu-card__text {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-card__text h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(20px, 2vw, 24px);
  color: var(--color-brand);
}

.menu-card__text p {
  margin: 0;
  font-size: 18px;
  line-height: 1.45;
  color: var(--color-brand);
}

.menu-card__price {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  border-radius: var(--radius-pill);
  background: var(--color-brand);
  color: #fff;
  font-family: var(--font-display);
  font-size: 24px;
  letter-spacing: 1.2px;
}

@media (max-width: 1100px) {
  .menu__body {
    padding: 88px 0 80px;
  }

  .menu__row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px;
  }

  .menu-card {
    min-height: 0;
  }
}

@media (max-width: 700px) {
  .menu__body {
    padding: 56px 0 48px;
  }

  .menu__inner {
    gap: 40px;
  }

  .menu__row {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .menu-card__text p {
    font-size: 16px;
  }
}
</style>
