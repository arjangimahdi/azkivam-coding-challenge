// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  extends: ['./layers/ui'],
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/image', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://interview-api.azkivam.com/api/v1/',
      apiTimeout: '10000',
    },
  },
})
