// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@pinia/nuxt', 'dayjs-nuxt'],
  compatibilityDate: "2024-07-12",
  dayjs: {
    locales: ['ru'],
  },
})