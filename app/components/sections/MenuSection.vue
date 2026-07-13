<template>
  <section
    id="menu"
    class="menu">
    <WaveSeparator tone="light" />
    <div class="menu__body">
      <div class="menu__inner container">
        <div class="menu__heading">
          <span class="section-label">{{ menu.label }}</span>
          <h2 class="section-title">{{ menu.title }}</h2>
        </div>

        <div class="menu__rows">
          <div class="menu__row">
            <article
              v-for="item in menu.items.slice(0, 2)"
              :key="item.title"
              class="menu-card">
              <img
                class="menu-card__thumb"
                :src="item.image"
                :alt="item.title" />
              <div class="menu-card__text">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
              <span class="menu-card__price">{{ item.price }}</span>
            </article>
          </div>

          <img
            class="menu__deco"
            src="/images/deco-menu.svg"
            alt=""
            aria-hidden="true" />

          <div class="menu__row">
            <article
              v-for="item in menu.items.slice(2)"
              :key="item.title"
              class="menu-card">
              <img
                class="menu-card__thumb"
                :src="item.image"
                :alt="item.title" />
              <div class="menu-card__text">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
              <span class="menu-card__price">{{ item.price }}</span>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { menu } from '../../data/site'
import WaveSeparator from './WaveSeparator.vue'
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
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 100px;
}

.menu__deco {
  width: 164px;
  height: 89px;
}

.menu-card {
  display: flex;
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
  width: 200px;
  height: 200px;
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
  font-size: 24px;
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

@media (max-width: 900px) {
  .menu__body {
    padding: 72px 0;
  }

  .menu__row {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .menu-card {
    min-height: 0;
  }
}
</style>
