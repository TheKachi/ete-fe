export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ete-merchant-web-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/tailwind.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  plugins: ['./plugins/validate'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/svg',
  ],

  axios: {
    baseURL:
      'http://a3b8e4e5c9deb4f1c8f8ee6ae905ee0f-1513708545.eu-west-3.elb.amazonaws.com/',
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
        },
        user: {
          property: 'data',
        },
        logout: { url: '/account/logout', method: 'post' },
        endpoints: {
          login: { url: '/account/login', method: 'post' },
          logout: { url: '/account/logout', method: 'post' },
          user: { url: '/account/token', method: 'get' },
        },
      },
    },
    redirect: {
      login: '/signin',
      logout: '/',
      user: '/settings',
      home: '/dashboard',
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
