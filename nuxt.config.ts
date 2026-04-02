export default defineNuxtConfig({
  future: { compatibilityVersion: 5 },
  compatibilityDate: '2025-07-15',
  ssr: true,
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/hints',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
    '@vueuse/nuxt',
    'nuxt-monaco-editor',
  ],

  monacoEditor: {
    locale: 'tr',
    optimizeMonacoDeps: false,
  },

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

  vite: {
    optimizeDeps: {
      include: [
        'tinymce/tinymce',
        '@tinymce/tinymce-vue',
        'tinymce/icons/default/icons.min.js',
        'tinymce/themes/silver/theme.min.js',
        'tinymce/models/dom/model.min.js',
        'axios',
        'zod',
      ],
    },
  },
})
