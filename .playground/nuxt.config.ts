import { fileURLToPath } from 'node:url'

// Local dev/preview app for the template layer. Not published — it just `extends` the
// layer (`..`) so you can render the root component with a mock in isolation.
export default defineNuxtConfig({
  extends: ['..'],
  modules: ['@nuxt/eslint'],
  eslint: {
    config: {
      rootDir: fileURLToPath(new URL('..', import.meta.url)),
    },
  },
})
