import fs from 'fs';
import pkg from './package'
import { products, sellingPoints, sellers, } from './config/products.json'
import { guides } from './config/guides.json'

  /*console.log([
    ].concat(products.filter(p => p.type.indexOf('SGL_BUNDLE') !== -1).map(p => `/bundle/${p.slug}`))
    .concat(sellingPoints.map(sp => `/product/${sp.slug}`))
    .concat(guides.map(g => `/guide/${g.slug}`)));*/

const sglSellerIDs = [process.env.SGL_SELLERID, process.env.SGTEU_SELLERID, process.env.SGTUS_SELLERID]

export default {
  target: 'static',

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og:image', property: 'og:image', content: '/website-pic.jpg' },
      { name: 'google-site-verification', content: 'yO8SzRAEdKz2IbsGb9aTEKn7l3NSYvtnTq2cKjVvja8' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,600' }
    ],
    script: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-Z5YYTRX9MJ',
        async: 'true',
      },
      {
        src: 'https://api.goaffpro.com/loader.js?shop=supergreenlab.myshopify.com',
      },
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
    'vue-slick-carousel/dist/vue-slick-carousel.css',
    'vue-slick-carousel/dist/vue-slick-carousel-theme.css',
    //'sgl-diary-feed/dist/sgl-diary-feed.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/init.js', ssr: false },
    { src: '~plugins/gtag.js', ssr: false },
    //{ src: '~plugins/matomo.js', ssr: false },
    //{ src: '~plugins/analytics.js', ssr: false },
    { src: '~plugins/fake-analytics.js', ssr: false },
    { src: '~plugins/crisp.js', ssr: false },
    //{ src: '~plugins/sgl-diary-feed.js', ssr: false },
    { src: '~plugins/vue-slick-carousel.js', ssr: false },
    { src: '~plugins/infinite-loading.js', ssr: false },
    { src: '~plugins/vue-touch.js', ssr: false },
    { src: '~plugins/vue-select.js', ssr: false },
    { src: '~/plugins/chart.js', mode: 'client', ssr: false },
  ],

  components: [{
    path: '~/components/plant',
    pathPrefix: false,
  }],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/sitemap',
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    //['nuxt-matomo', { matomoUrl: 'https://analytics.supergreenlab.com/', trackerUrl: 'https://analytics.supergreenlab.com/matomo.php', scriptUrl: 'https://analytics.supergreenlab.com/matomo.js', siteId: process.env.NODE_ENV !== 'production' ? 7 : 4, debug: process.env.NODE_ENV !== 'production'}],
    'portal-vue/nuxt',
    'nuxt-client-init-module',
  ],
  sitemap: {
    hostname: 'https://www.supergreenlab.com',
    exclude: [
      '/designer',
      '/designer/*',
      '/testshop',
    ]
  },

  env: {
    sglSellerID: process.env.SGL_SELLERID,
    sgteuSellerID: process.env.SGTEU_SELLERID,
    sgtusSellerID: process.env.SGTUS_SELLERID,
    API_URL: process.env.API_URL || 'https://api2.supergreenlab.com',
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    runtime: true,
    injected: true,
    preset: 'default',
    linkify: true,
    breaks: true,
    use: [
      'markdown-it-div',
      'markdown-it-attrs'
    ]
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vue-agile'],
  },

  generate: {
    exclude: ['/testshop',],
    routes: [
    ].concat(products.filter(p => p.type.indexOf('SGL_BUNDLE') !== -1).map(p => `/bundle/${p.slug}`))
    .concat(products.filter(p => p.type.indexOf('SGL_BUNDLE') === -1 && sglSellerIDs.includes(p.SellingPoints[0].Seller[0])).map(p => `/product/${p.slug}`))
    .concat(sellingPoints.map(sp => `/product/${sp.slug}`))
    .concat(guides.map(g => `/guide/${g.slug}`))
    .concat(sellers.filter(s => s.type == 'shopify' && s.params.shopify && s.params.shopify.token).map(s => `/checkout/${s.slug}`)),
  },

  router: {
    async scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        await new Promise((r) => setTimeout(r, 400))
        return savedPosition
      }

      const findEl = async (hash, x=0) => {
        return document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 2) {
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
        if (to.path == from.path && 'scrollBehavior' in document.documentElement.style) {
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
