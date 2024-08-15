// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@pinia/nuxt', 'dayjs-nuxt', "@sidebase/nuxt-auth"],
  auth: {
    origin:"http://80.90.189.5/",
    globalAppMiddleware: true,
  },

  compatibilityDate: "2024-07-12",
  dayjs: {
    locales: ['ru'],
  },
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
      ]
    }
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  }
})