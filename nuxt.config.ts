// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
  ],

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'vercel',
  },

  runtimeConfig: {
    discordClientId: process.env.DISCORD_CLIENT_ID,
    discordClientSecret: process.env.DISCORD_CLIENT_SECRET,
    discordRedirectUri: process.env.DISCORD_REDIRECT_URI || 'http://localhost:3000/api/auth/callback',
    databaseUrl: process.env.DATABASE_URL,
    public: {
      discordClientId: process.env.DISCORD_CLIENT_ID,
    },
  },

  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            plasma: {
              50: '#f0f0ff',
              100: '#e0e0ff',
              200: '#c0c0ff',
              300: '#a0a0ff',
              400: '#8080ff',
              500: '#7170ff',
              600: '#6060cc',
              700: '#484899',
              800: '#303066',
              900: '#181833',
            },
            dark: {
              50: '#f0f1f3',
              100: '#b0b5c0',
              200: '#8a8f98',
              300: '#5a5e66',
              400: '#3a3e44',
              500: '#1c1d22',
              600: '#141518',
              700: '#0d0e10',
              800: '#08090a',
              900: '#07080a',
            },
          },
        },
      },
    },
  },
})
