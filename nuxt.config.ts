export default defineNuxtConfig({
  compatibilityDate: '2026-05-07',
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/i18n',
    'nuxt-og-image',
  ],

  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    langDir: 'locales',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'wordhabit_locale',
      fallbackLocale: 'en',
    },
  },

  site: {
    url: 'https://wordhabit.app',
    name: 'Wordhabit',
  },

  // OG images only. nuxt-og-image resolves the renderer's fonts through
  // @nuxt/fonts; its bundled Inter 400/700 covers everything but the
  // display face. Bricolage ships as a local static TTF
  // (public/fonts/) because the remote providers serve woff2 or
  // variable fonts; the local static file keeps the display weight
  // deterministic across edge environments.
  fonts: {
    families: [
      {name: 'Bricolage Grotesque', provider: 'local', weights: [800], global: true},
    ],
  },

  css: ['~~/assets/css/main.css'],

  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
  },

  ui: {
    colorMode: false,
  },

  runtimeConfig: {
      apiUrl: process.env.NUXT_API_URL,
      polarAccessToken: process.env.POLAR_ACCESS_TOKEN,
      public: {
        playStoreUrl: process.env.NUXT_PUBLIC_PLAY_STORE_URL
          ?? 'https://play.google.com/store/apps/details?id=com.enthusiastdev.wordhabit',
        appStoreUrl: process.env.NUXT_PUBLIC_APP_STORE_URL ?? '',
        // Same PostHog project as the mobile app, so web and app share
        // one funnel. An empty key disables analytics entirely,
        // mirroring the Flutter side.
        posthogKey: process.env.NUXT_PUBLIC_POSTHOG_KEY ?? '',
        posthogHost: process.env.NUXT_PUBLIC_POSTHOG_HOST
          ?? 'https://us.i.posthog.com',
      },
  },
})
