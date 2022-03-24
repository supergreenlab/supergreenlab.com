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
      <Top ref='top' :focus='currentRef == "top"' />
      <div :class='$style.containerslot'>
        <Shop location='HOME_TOP' nomargin='true' />
      </div>
      <div id='use-steps'></div>
      <BlockStep ref='welcome' />
      <BlockExamples ref='bundle-intro' />
      <BlockBundle ref='bundles' />
      <BlockApp ref='app' />
      <BlockDiscord ref='discord' />
      <BlockGuide ref='everything-you-need' />
      <BlockShop ref='shop' />
      <HomeNewsletter ref='newsletter' />
    </div>
    <Footer />
    <transition name="popup">
      <Promocode v-if='showPopup' :onClose='closePopup' />
      <OverlayGuide v-if='showGuidePopup' :onClose='closeGuidePopup' />
    </transition>
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'
import Top from '~/components/home/top.vue'
import Shop from '~/components/shop/shop.vue'
import BlockStep from '~/components/home/blockstep.vue'
import BlockExamples from '~/components/home/blockexamples.vue'
import BlockBundle from '~/components/home/blockbundle.vue'
import BlockApp from '~/components/home/blockapp.vue'
import BlockGuide from '~/components/home/blockguide.vue'
import BlockDiscord from '~/components/home/blockdiscord.vue'
import BlockShop from '~/components/home/blockshop.vue'
import HomeNewsletter from '~/components/layout/newsletter.vue'
import Footer from '~/components/layout/footer.vue'
import Promocode from '~/components/layout/overlay-promocode.vue'

import OverlayGuide from '~/components/home/overlay-guide.vue'

import { loadFromStorage, saveToStorage, addEventListener, removeEventListener, innerHeight,} from '~/lib/client-side.js'

export default {
  components: { Header, Top, Shop, Footer, Promocode, OverlayGuide, HomeNewsletter, BlockStep ,BlockExamples, BlockBundle, BlockApp, BlockGuide, BlockDiscord , BlockShop },
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
  data() {
    return {
      showGuidePopup: false,
      showPopup: false,
      currentRef: 'top',
      scrolledToBottom: false,
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
    const sglSellerIDs = [process.env.sglSellerID, process.env.sgteuSellerID, process.env.sgtusSellerID]
    const sglSellerID = sglSellerIDs.find(s => this.$store.state.checkout.promocodes[s] && this.$store.state.checkout.discounts[s])
    const promocode = this.$store.state.checkout.promocodes[sglSellerID]
    if (!process.server && !(promocode || loadFromStorage('popupShown2'))) {
      const nVisits = parseInt(loadFromStorage('nVisits2') || '1')
      saveToStorage('nVisits2', nVisits+1)
      if (nVisits > 3) {
        setTimeout(() => this.$data.showPopup = true, 3000)
      }
    }
    this.$analytics.monitorEvents(['front-page;navigation;backtotop'], this.onBackToTop)
  },
  unmounted() {
    this.$analytics.removeEventMonitor(this.onBackToTop)
  },
	computed: {
    promo() {
      const sglSellerIDs = [process.env.sglSellerID, process.env.sgteuSellerID, process.env.sgtusSellerID]
      const sglSellerID = sglSellerIDs.find(s => this.$store.state.checkout.promocodes[s] && this.$store.state.checkout.discounts[s])
      const promocode = this.$store.state.checkout.promocodes[sglSellerID],
            discount = this.$store.state.checkout.discounts[sglSellerID]
      if (!promocode || !discount) return {promocode: '', discount: 0}
      return {promocode, discount}
    },
	},

  methods: {
    closePopup() {
      saveToStorage('popupShown2', 1)
      this.$data.showPopup = false
    },
    closeGuidePopup() {
      this.$data.showGuidePopup = false
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
              winh = innerHeight()

            let isCoveringScreen = Math.min(y+height, winh) - Math.max(y, 0) > (height * 3/4 < winh * 3/4 ? height * 3/4 : winh * 3/4)

            if (isCoveringScreen) {
              this.$analytics.trackEvent('front-page', 'scrollto', name)
              this.lastEvent = name
              this.$data.currentRef = name
            }
          })
        })
      }, 250)
    },
    onBackToTop() {
      this.$data.showGuidePopup = true
      this.$analytics.removeEventMonitor(this.onBackToTop)
    },
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

.space
  height: 40pt

.containerslot
  width: 100%
  max-width: 900pt
  margin: 30pt 0 20pt 0

.widgetcontainer
  margin: 20pt 0

#spacer
  height: 10pt

</style>
