<!--
      Copyright (C) 2020  SuperGreenLab <towelie@supergreenlab.com>
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
  <section :id='$style.container'>
    <nuxt/>

    <transition name="popup">
      <Disclaimer v-if='showDisclaimer && this.$route.name != "cookies"' :onClose='closeDisclaimer' />
    </transition>

    <transition name="popup">
      <div v-if='promo' :id='$style.promo'>
        <h1>Promo code {{ promo.promocode }} activated !</h1>
        <h2>Enjoy your {{ promo.discount }}% off :)</h2>
      </div>
    </transition>

    <portal-target name='root'>
    </portal-target>
  </section>
</template>

<script>
import Disclaimer from '~/components/layout/overlay-major.vue'

import { loadFromStorage, saveToStorage, setHref } from '~/lib/client-side.js'

export default {
  components: {Disclaimer,},
  data() {
    return {
      showDisclaimer: false,
    }
  },
  mounted() {
    if (!loadFromStorage('disclaimerShown')) {
      this.$data.showDisclaimer = true
    }
  },
  computed: {
    promo() {
      const sglSellerID = process.env.sglSellerID
      const discount = this.$store.state.checkout.discounts[sglSellerID],
            promocode = this.$store.state.checkout.promocodes[sglSellerID]
      if (!promocode || !discount) return null
      return {promocode, discount}
    },
  },
  methods: {
    closeDisclaimer(ok) {
      if (ok) {
        this.$data.showDisclaimer = false
        saveToStorage('disclaimerShown', 1)
      } else {
        setHref('https://www.google.com')
      }
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  justify-content: center
  background-color: white

#promo
  z-index: 100
  position: fixed
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  width: 100vw
  bottom: 0
  background-color: #3BB30B
  color: white
  font-size: 0.7em
  padding: 5pt 0

#promo > h1
  margin: 0

</style>
