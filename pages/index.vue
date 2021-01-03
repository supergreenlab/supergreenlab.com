<!--
      Copyright (C) 2019  SuperGreenLab <towelie@supergreenlab.com>
      Author: Constantin Clauzel <constantin.clauzel@gmail.com>

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.

      You should have received a copy of the GNU General Public License
      along with this program.  If not, see <http://www.gnu.org/licenses/>.
 -->

<template>
  <section :id="$style.container">
    <div id='header_wrapper'>
      <div :id='$style.header'>
        <Header responsiveHide='true' />
      </div>
    </div>
    <div :id='$style.body'>
      <div id='top'></div>
      <Top ref='top' />
      <div id='use-steps'></div>
      <div :class='$style.space'></div>
      <UseSteps ref='use-steps' />
      <div :class='$style.space'></div>
      <div :class='$style.title'>
        <SectionTitle title='follow the guide to becoming'
                      green='a ninja grower'
                      title2='we publish guides on youtube'
                      smalltitle='and offer free 24/7/365 support'
                      separator='true'/>
      </div>
      <div id='guides'></div>
      <div :id='$style.guides' ref='guides'>
        <LatestGuide />
        <div :class='$style.space'></div>
        <Youtube />
      </div>
      <div :class='$style.space'></div>
      <div :class='$style.title'>
        <SectionTitle title='Join the community'
                      green='of growbox builders'
                      title2='What will you build?'
                      separator='true'/>
      </div>
      <Examples ref='community' />
      <div :class='$style.space'></div>
      <div :class='$style.title'>
        <SectionTitle title='Ready to grow?'
                      green='Follow the steps below'
                      separator='true'/>
      </div>
      <Ready ref='ready' />
      <div :class='$style.space'></div>
      <div :class='$style.title'>
        <SectionTitle title='STEP 1'
                      green='CHOOSE YOUR FURNITURE' />
      </div>
      <div :class='$style.shop'>
        <ProductList ref='homepage-furniture' :products='furnitures' :center=true :maxItems=4 />
      </div>
      <div :class='$style.title'>
        <SectionTitle title='STEP 2'
                      green='GET A BUNDLE' />
      </div>
      <div :class='$style.space'></div>
      <div :id='$style.bundles'>
        <div :class='$style.bundle' v-for='b in bundles' :key='b.id' :ref='b.slug'>
          <div :id='b.slug'></div>
          <Bundle :bundle='b' :showdescription='false' />
        </div>
      </div>
      <div :class='$style.title'>
        <SectionTitle title='STEP 3'
                      green='GET YOUR GROWING MEDIUM' />
      </div>
      <div :class='$style.shop'>
        <ProductList ref='homepage-soil' :products='soil' :center=true :maxItems=4 />
      </div>
      <div :class='$style.title'>
        <SectionTitle title='STEP 4'
                      green='GET NUTRIENTS' />
      </div>
      <div :class='$style.shop'>
        <ProductList ref='homepage-nutrients' :products='nutrients' :center=true :maxItems=4 />
      </div>
      <div :class='$style.title'>
        <SectionTitle title='STEP 5'
                      green='MIGHT NEED SOME TOOLS TOO'
                      title2='The SGL basics :)' />
      </div>
      <div :class='$style.shop'>
        <ProductList ref='homepage-tools' :products='tools' :center=true :maxItems=4 />
      </div>
      <div :class='$style.space'></div>
      <Social ref='social' />
      <div :class='$style.space'></div>
      <Testimonials ref='testimonials' />
    </div>
    <Footer />
    <transition name="popup">
      <Promocode v-if='showPopup' :onClose='closePopup' />
    </transition>
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'
import Top from '~/components/home/top.vue'
import PreOrder from '~/components/home/preorder.vue'
import UseSteps from '~/components/home/use-steps.vue'
import Stealth from '~/components/home/stealth-build.vue'
import Testimonials from '~/components/home/testimonials.vue'
import BundleIntro from '~/components/home/bundle.vue'
import ContinuousSupply from '~/components/home/continuous-supply.vue'
import ProgressiveSunriseSunset from '~/components/home/progressive-sunrise-sunset.vue'
import App from '~/components/home/app.vue'
import LatestDiaries from '~/components/home/latest-diaries.vue'
import Bundle from '~/components/bundle/bundle.vue'
import Instagram from '~/components/home/instagram.vue'
import Youtube from '~/components/home/youtube.vue'
import LatestGuide from '~/components/home/latestguide.vue'
import ProductList from '~/components/products/productlist.vue'
import Social from '~/components/home/social.vue'
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import Footer from '~/components/layout/footer.vue'
import Promocode from '~/components/layout/overlay-promocode.vue'
import Examples from '~/components/home/examples.vue'
import Ready from '~/components/home/ready.vue'

import { loadFromStorage, saveToStorage, addEventListener, removeEventListener, innerHeight, } from '~/lib/client-side.js'

export default {
  head() {
    return {
      title: 'SuperGreenLab - Automated LED Grow Lights for ninja growers',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Ultimate grow shop and guides for home growing stealth grow boxes building. Build your own connected grow box with our app and our complete bundle for DIY furniture-as-a-growbox: automated and controlled with an app. Comes with light, ventilation, and sensors (temp and RH).'
        },
      ],
    }
  },
  components: { Header, SectionTitle, Top, PreOrder, UseSteps, Stealth, Testimonials, BundleIntro, ContinuousSupply, ProgressiveSunriseSunset, App, LatestDiaries, Bundle, Instagram, Youtube, LatestGuide, ProductList, Social, Footer,  Promocode, Examples, Ready,},
  data() {
    return {
      showPopup: false,
    }
  },
  created () {
    addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    if (this.timeout) clearTimeout(this.timeout)
    removeEventListener('scroll', this.handleScroll);
  },
  mounted() {
    if (!process.server && !(this.$store.state.checkout.promocode.value || loadFromStorage('popupShown2'))) {
      const nVisits = parseInt(loadFromStorage('nVisits2') || '1')
      saveToStorage('nVisits2', nVisits+1)
      if (nVisits > 3) {
        setTimeout(() => this.$data.showPopup = true, 3000)
      }
    }
  },
  computed: {
    bundles() {
      return this.$store.getters['eshop/bundles']
    },
    promo() {
      const discount = this.$store.state.checkout.discount.value,
            promocode = this.$store.state.checkout.promocode.value
      if (!promocode || !discount) return {promocode: '', discount: 0}
      return {promocode, discount}
    },
    furnitures() {
      return this.$store.getters['eshop/collection']('homepage-furniture')
    },
    soil() {
      return this.$store.getters['eshop/productsWithTypes'](['SOIL', 'POT'])
    },
    nutrients() {
      return this.$store.getters['eshop/productsWithTypes'](['NUTRIENT'])
    },
    tools() {
      return this.$store.getters['eshop/productsWithTypes'](['TOOLS'])
    },
  },
  methods: {
    closePopup() {
      saveToStorage('popupShown2', 1)
      this.$data.showPopup = false
    },
    handleScroll(e) {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        Object.keys(this.$refs).forEach((name) => {
          if (this.lastEvent == name) {
            return;
          }
          let ref = this.$refs[name]
          if (!ref.length) ref = [ref]
          ref.forEach((ref) => {
            const $el = ref.$el ? ref.$el : ref
            const { y, height } = $el.getBoundingClientRect(),
              centery = y + height / 2,
              winh = innerHeight()

            if (centery > winh / 4 && centery < winh * 3/4) {
              this.$matomo.trackEvent('Homepage navigation', 'Homepage Scroll To', `Homepage Scroll to ${name.replace('-', ' ')}`)
              this.lastEvent = name
            }
          })
        })
      }, 250)
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center

#header
  position: fixed
  width: 100%
  top: 0 
  left: 0
  z-index: 1000

#body
  width: 100%
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

.title
  width: 100%
  margin: 20pt 0 20pt 0

.separator
  height: 2pt
  margin: 30pt 0
  background-color: #eaeaea

#guides
  width: 100%
  max-width: 900pt

.shop
  display: flex
  width: 100%
  max-width: 900pt

#bundles
  display: flex
  flex-direction: column
  align-items: center
  width: 100%

.bundle
  margin: 0 0 30pt 0
  width: 100%
  max-width: 1000pt

.space
  height: 40pt

</style>
