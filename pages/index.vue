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
    <div :id='$style.header'>
      <Header />
    </div>
    <div :id='$style.body'>
      <div id='top'></div>
      <Top ref='top' />
      <div :class='$style.separator'></div>
      <UseSteps ref='use-steps' />
      <div :class='$style.separator'></div>
      <Stealth ref='stealth' />
      <div :class='$style.separator'></div>
      <BundleIntro ref='bundle-intro' />
      <div :class='$style.separator'></div>
      <div :id='$style.shop'></div>
      <div :id='$style.title'>
        <SectionTitle title='Welcome to the shop'
                      green='Checkout our bundles'/>
      </div>
      <div id='mono'></div>
      <div :class='$style.bundle' v-for='b in bundles'>
        <div :id='b.ref'></div>
        <Bundle v-bind='b' />
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import Header from '~/components/header.vue'
import Top from '~/components/homesection-top.vue'
import UseSteps from '~/components/homesection-use-steps.vue'
import Stealth from '~/components/homesection-stealth-build.vue'
import BundleIntro from '~/components/homesection-bundle-intro.vue'
import Bundle from '~/components/homesection-bundle.vue'
import SectionTitle from '~/components/sectiontitle.vue'
import Footer from '~/components/homesection-footer.vue'

import { bundles } from '../config.json'

export default {
  components: { Header, SectionTitle, Top, UseSteps, Stealth, BundleIntro, Bundle, Footer, },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    if (this.timeout) clearTimeout(this.timeout)
    window.removeEventListener('scroll', this.handleScroll);
  },
	computed: {
		bundles() {
			return bundles
		}
	},
  methods: {
    handleScroll(e) {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        Object.keys(this.$refs).forEach((name) => {
          const ref = this.$refs[name],
                { y, height } = ref.$el.getBoundingClientRect(),
                centery = y + height / 2,
                winh = window.innerHeight

          if (centery > 0 && centery < winh) {
            this.$matomo && this.$matomo.trackEvent('front-page', 'scrollto', name)
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
  max-width: 900pt

#title
  margin: 20pt 0 20pt 0

.separator
  height: 2pt
  margin: 30pt 0
  background-color: #efefef

#shop
  height: 150pt
  background-image: url('~assets/img/shop.svg')
  background-position: center
  background-repeat: no-repeat
  background-size: contain

.bundle
  margin: 0 0 30pt 0

</style>
