// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules:[
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  piniaPersistedstate: {
    storage: 'cookies',
    cookieOptions: {
      sameSite: 'strict'
    }
  },
  typescript: {
    tsConfig: {
      "extends": "../../../tsconfig.base.json"
    }
  }
})
