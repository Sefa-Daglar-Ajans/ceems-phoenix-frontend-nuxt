import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  future: { compatibilityVersion: 5 },
  compatibilityDate: '2025-07-15',
  ssr: true,
  devtools: { enabled: true },

  nitro: {
    publicAssets: [
      {
        baseURL: '/tinymce',
        dir: resolve(__dirname, 'node_modules/tinymce'),
        maxAge: 60 * 60 * 24 * 30,
      },
    ],
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/hints',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  icon: {
    serverBundle: 'remote',
  },

  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [300, 400, 500, 600, 700] },
      { name: 'Montserrat', provider: 'google', weights: [500, 600, 700, 800] },
    ],
  },

  image: {
    quality: 80,
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4000',
    },
  },
})
