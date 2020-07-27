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
      <div :class='$style.space'></div>
      <div id='use-steps'></div>
      <UseSteps ref='use-steps' />
      <div :class='$style.space'></div>
      <Instagram ref='instagram' />
      <div :class='$style.space'></div>
      <Youtube ref='youtube' />
      <div :class='$style.space'></div>
      <Social />
      <div :class='$style.space'></div>
      <BundleIntro ref='bundle-intro' />
      <div :class='$style.space'></div>
      <div :id='$style.bundles'>
        <div :class='$style.bundle' v-for='b in bundles'>
          <div :id='b.ref'></div>
          <Bundle v-bind='b' description='' :promodiscount='promo.discount' />
        </div>
      </div>
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
import Header from '~/components/header.vue'
import Top from '~/components/homesection-top.vue'
import UseSteps from '~/components/homesection-use-steps.vue'
import Stealth from '~/components/homesection-stealth-build.vue'
import Testimonials from '~/components/homesection-testimonials.vue'
import BundleIntro from '~/components/homesection-bundle-intro.vue'
import Bundle from '~/components/homesection-bundle.vue'
import Instagram from '~/components/homesection-instagram.vue'
import Youtube from '~/components/homesection-youtube.vue'
import SpareParts from '~/components/homesection-spareparts.vue'
import Social from '~/components/homesection-social.vue'
import SectionTitle from '~/components/sectiontitle.vue'
import Footer from '~/components/homesection-footer.vue'
import Promocode from '~/components/overlay-promocode.vue'

import { bundles, } from '~/config/bundles.json'

export default {
  components: { Header, SectionTitle, Top, UseSteps, Stealth, Testimonials, BundleIntro, Bundle, Instagram, Youtube, SpareParts, Social, Footer,  Promocode, },
  data() {
    return {
      showPopup: false,
      currentRef: 'top',
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    if (this.timeout) clearTimeout(this.timeout)
    window.removeEventListener('scroll', this.handleScroll);
  },
  mounted() {
    if (!(this.$store.state.checkout.promocode.value || window.localStorage.getItem('popupShown2'))) {
      const nVisits = parseInt(window.localStorage.getItem('nVisits2') || '1')
      window.localStorage.setItem('nVisits2', nVisits+1)
      if (nVisits > 3) {
        setTimeout(() => this.$data.showPopup = true, 3000)
      }
    }
  },
	computed: {
		bundles() {
			return bundles
		},
    promo() {
      const discount = this.$store.state.checkout.discount.value,
            promocode = this.$store.state.checkout.promocode.value
      if (!promocode || !discount) return {promocode: '', discount: 0}
      return {promocode, discount}
    },
    totaldiscount() {
      const bundle = this.bundle,
            promo = this.promo
      return parseInt((1 - (1-bundle.discount/100) * (1-promo.discount/100) ) * 100)
    },
	},
  methods: {
    closePopup() {
      window.localStorage.setItem('popupShown2', 1)
      this.$data.showPopup = false
    },
    handleScroll(e) {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        Object.keys(this.$refs).forEach((name) => {
          if (this.lastEvent == name) {
            return;
          }
          const ref = this.$refs[name],
                { y, height } = ref.$el.getBoundingClientRect(),
                centery = y + height / 2,
                winh = window.innerHeight

          if (centery > winh / 4 && centery < winh * 3/4) {
            this.$matomo && this.$matomo.trackEvent('front-page', 'scrollto', name)
            this.lastEvent = name
            this.$data.currentRef = name
          }
        })
      }, 250)
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

#title
  margin: 20pt 0 20pt 0

.separator
  height: 2pt
  margin: 30pt 0
  background-color: #efefef

#shop
  height: 150pt
  margin: 30pt
  background-image: url('~assets/img/shop.svg')
  background-position: center
  background-repeat: no-repeat
  background-size: contain

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
