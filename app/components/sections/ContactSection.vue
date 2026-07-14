<template>
  <section
    id="contact"
    class="contact">
    <div class="contact__body">
      <img
        class="contact__deco"
        src="/images/deco-contact.svg"
        alt=""
        aria-hidden="true" />

      <div class="contact__inner container">
        <div class="contact__heading">
          <ScribbleLabel
            kind="contact"
            tone="white"
            align="center"
            >{{ page.contactLabel }}</ScribbleLabel
          >
          <div class="contact__heading-copy">
            <h2 class="contact__title">{{ page.contactHeading }}</h2>
            <p class="contact__desc">{{ page.contactDescription }}</p>
          </div>
        </div>

        <form
          class="contact__form"
          @submit.prevent="onSubmit">
          <label class="field field--full">
            <span class="sr-only">votre nom</span>
            <input
              v-model="form.name"
              type="text"
              name="name"
              placeholder="votre nom"
              required />
          </label>

          <div class="field-row">
            <label class="field">
              <span class="sr-only">téléphone</span>
              <input
                v-model="form.phone"
                type="tel"
                name="phone"
                placeholder="téléphone" />
            </label>
            <label class="field">
              <span class="sr-only">email</span>
              <input
                v-model="form.email"
                type="email"
                name="email"
                placeholder="email"
                required />
            </label>
          </div>

          <div class="field-row">
            <label class="field">
              <span class="sr-only">date et heure</span>
              <input
                v-model="form.datetime"
                type="text"
                name="datetime"
                placeholder="date et heure" />
            </label>
            <label class="field">
              <span class="sr-only">couverts</span>
              <input
                v-model="form.seats"
                type="text"
                name="seats"
                placeholder="couverts" />
            </label>
          </div>

          <label class="field field--full field--textarea">
            <span class="sr-only">message</span>
            <textarea
              v-model="form.message"
              name="message"
              placeholder="message"
              rows="4" />
          </label>

          <button
            class="btn btn-light"
            type="submit">
            {{ page.contactCta }}
          </button>
        </form>

        <div
          v-if="page.socials.length"
          class="contact__socials">
          <a
            v-for="social in page.socials"
            :key="social.name"
            class="contact__social"
            :href="social.href"
            :aria-label="social.name"
            target="_blank"
            rel="noopener noreferrer">
            <img
              :src="social.icon"
              alt="" />
          </a>
        </div>

        <p class="contact__copy">{{ page.copyright }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { PropType } from 'vue'
import type { FoodPageContent } from '../../types/food'
import ScribbleLabel from './ScribbleLabel.vue'

const props = defineProps({
  page: {
    type: Object as PropType<FoodPageContent>,
    required: true,
  },
})

const form = reactive({
  name: '',
  phone: '',
  email: '',
  datetime: '',
  seats: '',
  message: '',
})

function onSubmit(): void {
  const to: string = props.page.email
  if (!to) {
    return
  }
  const subject = encodeURIComponent(`Réservation — ${form.name || 'Client'}`)
  const body = encodeURIComponent(
    [
      `Nom : ${form.name}`,
      `Téléphone : ${form.phone}`,
      `Email : ${form.email}`,
      `Date / heure : ${form.datetime}`,
      `Couverts : ${form.seats}`,
      '',
      form.message,
    ].join('\n'),
  )
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
}
</script>

<style scoped>
.contact__body {
  position: relative;
  overflow: hidden;
  background: var(--color-brand);
  color: #fff;
  padding: 80px 0 72px;
}

.contact__deco {
  position: absolute;
  left: 0;
  top: 36px;
  width: min(182px, 22vw);
  height: auto;
  pointer-events: none;
}

.contact__inner {
  display: flex;
  max-width: 860px;
  flex-direction: column;
  align-items: center;
  gap: 61px;
}

.contact__heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  max-width: 615px;
  text-align: center;
}

.contact__heading-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.contact__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(32px, 3.4vw, 48px);
  line-height: 1.15;
  white-space: nowrap;
}

.contact__desc {
  margin: 0;
  max-width: 578px;
  font-size: 20px;
  line-height: 1.6;
}

.contact__form {
  display: flex;
  width: 100%;
  max-width: 680px;
  flex-direction: column;
  align-items: center;
  gap: 19px;
}

.field-row {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field {
  display: block;
  width: 100%;
}

.field input,
.field textarea {
  width: 100%;
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  padding: 15px 20px;
  outline: none;
  border-radius: 0;
}

.field--textarea textarea {
  padding-bottom: 80px;
  resize: vertical;
  min-height: 140px;
}

.field input::placeholder,
.field textarea::placeholder {
  color: rgba(255, 255, 255, 0.9);
  text-transform: lowercase;
  font-size: 14px;
  font-weight: 600;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.contact__socials {
  display: flex;
  gap: 10px;
}

.contact__social {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 100px;
  background: var(--color-accent);
}

.contact__social img {
  width: 18px;
  height: 18px;
}

.contact__copy {
  margin: 0;
  font-size: 18px;
  text-align: center;
}

@media (max-width: 700px) {
  .contact__body {
    padding: 64px 0 48px;
  }

  .contact__inner {
    gap: 40px;
  }

  .contact__title {
    white-space: normal;
  }

  .contact__desc {
    font-size: 16px;
  }

  .field-row {
    grid-template-columns: 1fr;
  }

  .contact__deco {
    width: 110px;
    top: 20px;
  }
}
</style>
