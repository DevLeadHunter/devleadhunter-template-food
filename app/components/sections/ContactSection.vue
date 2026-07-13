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
          <span class="contact__label">{{ contact.label }}</span>
          <h2 class="contact__title">{{ contact.title }}</h2>
          <p class="contact__desc">{{ contact.description }}</p>
        </div>

        <form
          class="contact__form"
          @submit.prevent="onSubmit">
          <label class="field field--full">
            <span class="sr-only">your Name</span>
            <input
              v-model="form.name"
              type="text"
              name="name"
              placeholder="your Name"
              required />
          </label>

          <div class="field-row">
            <label class="field">
              <span class="sr-only">phone number</span>
              <input
                v-model="form.phone"
                type="tel"
                name="phone"
                placeholder="phone number" />
            </label>
            <label class="field">
              <span class="sr-only">email address</span>
              <input
                v-model="form.email"
                type="email"
                name="email"
                placeholder="email address"
                required />
            </label>
          </div>

          <div class="field-row">
            <label class="field">
              <span class="sr-only">date time</span>
              <input
                v-model="form.datetime"
                type="text"
                name="datetime"
                placeholder="date time" />
            </label>
            <label class="field">
              <span class="sr-only">seats</span>
              <input
                v-model="form.seats"
                type="text"
                name="seats"
                placeholder="seats" />
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
            {{ contact.cta }}
          </button>
        </form>

        <div class="contact__socials">
          <a
            v-for="social in contact.socials"
            :key="social.name"
            class="contact__social"
            :href="social.href"
            :aria-label="social.name">
            <img
              :src="social.icon"
              alt="" />
          </a>
        </div>

        <p class="contact__copy">{{ site.copyright }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { contact, site } from '../../data/site'

const form = reactive({
  name: '',
  phone: '',
  email: '',
  datetime: '',
  seats: '',
  message: '',
})

function onSubmit(): void {
  const subject = encodeURIComponent(`Table reservation — ${form.name || 'Guest'}`)
  const body = encodeURIComponent(
    [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Date/Time: ${form.datetime}`,
      `Seats: ${form.seats}`,
      '',
      form.message,
    ].join('\n'),
  )
  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
}
</script>

<style scoped>
.contact__body {
  position: relative;
  overflow: hidden;
  background: var(--color-brand);
  color: #fff;
  padding: 109px 0 72px;
}

.contact__deco {
  position: absolute;
  left: 0;
  top: 36px;
  width: 182px;
  height: 57px;
  pointer-events: none;
}

.contact__inner {
  display: flex;
  max-width: 760px;
  flex-direction: column;
  align-items: center;
  gap: 61px;
}

.contact__heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 615px;
  text-align: center;
}

.contact__label {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.7px;
  text-transform: lowercase;
}

.contact__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 48px;
  line-height: 1.15;
}

.contact__desc {
  margin: 0;
  font-size: 20px;
  line-height: 1.5;
}

.contact__form {
  display: flex;
  width: 100%;
  max-width: 576px;
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
}

.field--textarea textarea {
  padding-bottom: 80px;
  resize: vertical;
  min-height: 140px;
}

.field input::placeholder,
.field textarea::placeholder {
  color: rgba(255, 255, 255, 0.85);
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
  gap: 16px;
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

@media (max-width: 900px) {
  .contact__body {
    padding: 72px 0 48px;
  }

  .contact__title {
    font-size: 36px;
  }

  .field-row {
    grid-template-columns: 1fr;
  }

  .contact__deco {
    width: 120px;
  }
}
</style>
