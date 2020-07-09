import pkg from './package'

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'SuperGreenLab - Automated LED Grow Lights for ninja growers',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Stealthy LED bundle for DIY furniture-as-a-growbox: automated and controlled with an app. Comes with light, ventilation, and sensors (temp and RH).' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/global.css',
    '@/assets/css/froala_blocks.min.css',
    '@/assets/css/froala_editor.pkgd.min.css',
    '@/assets/css/bootstrap.min.css',
    '@/assets/css/froala_style.min.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/analytics.js', ssr: false },
    { src: '~plugins/init.js', ssr: false },
    { src: '~plugins/matomo.js', ssr: false },
    { src: '~plugins/crisp.js', ssr: false },
    //{ src: '~plugins/pixel.js', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/sitemap',
    '@nuxtjs/axios',
    ['nuxt-matomo', { matomoUrl: '//analytics.supergreenlab.com/', trackerUrl: '//analytics.supergreenlab.com/matomo.php', scriptUrl: '//analytics.supergreenlab.com/matomo.js', siteId: 1 }],
    'portal-vue/nuxt',
  ],
  sitemap: {
    hostname: 'https://www.supergreenlab.com',
    exclude: [
      '/designer',
      '/designer/*',
    ]
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  generate: {
    routes: [
      '/bundle/mono-box-bundle',
      '/bundle/multi-box-bundle',
      '/bundle/closet-box-bundle',
      '/bundle/micro-box-bundle',
      '/guide/how-to-install-a-led-panel',
      '/guide/how-to-setup-with-the-app',
      '/guide/how-to-setup-controller'
    ]
  },

  router: {
    scrollBehavior: async (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      const findEl = async (hash, x) => {
        return document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 50) {
              return resolve()
            }
            setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
          })
      }

      const scrollTo = (y) => {
        const wrapper = document.getElementById('header_wrapper')
        if (wrapper) {
          y -= wrapper.children[0].clientHeight
        }
        if ('scrollBehavior' in document.documentElement.style) {
          return window.scrollTo({ top: y, behavior: 'smooth' })
        }
        return window.scrollTo(0, y)
      }

      if (to.hash) {
        let el = await findEl(to.hash)
        return scrollTo(el.offsetTop)
      }

      await new Promise((r) => setTimeout(r, 200))
      return {x: 0, y: 0}
    }
  }
}
