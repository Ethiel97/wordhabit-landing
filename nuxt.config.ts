export default defineNuxtConfig({
  compatibilityDate: '2026-05-07',
  modules: ['@nuxt/ui'],

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
      title: 'Wordhabit — Master a new word every day',
      meta: [
        { name: 'description', content: 'Wordhabit turns vocabulary into a daily ritual. Flashcards, quizzes, and streaks designed to make words stick — for real.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
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
})