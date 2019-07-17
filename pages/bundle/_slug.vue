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
  <section :id='$style.container'>
    <div :id='$style.header'>
      <Header />
    </div>
    <div :id='$style.body'>
      <Bundle nobottom='true' v-bind='bundle' />
      <Title icon='package.svg' title='PACKAGE CONTENT' />
      <Item v-if='bundle.bigleds' :color='color' :n='bundle.bigleds' v-bind='led("192")' />
      <Item v-if='bundle.smallleds' :color='color' :n='bundle.smallleds' v-bind='led("144")' />
      <Item v-if='bundle.tinyleds' :color='color' :n='bundle.tinyleds' v-bind='led("36")' />
      <Item v-if='bundle.ventilation' :n='bundle.ventilation' v-bind='accessory("blower")' />
      <Item v-if='bundle.sensor' :n='bundle.sensor' v-bind='accessory("sensor")' />
      <Item n='1' v-bind='accessory("controller")' last='true' />
      <Title icon='world.svg' title='SHIPPING INFORMATIONS' />
      <Shipping />
      <div :id='$style.buy'>
        <div :id='$style.promocode'>
          <TextInput label='Promo code' v-model='promocode' optional='true' />
          <a :id='$style.buybutton' :class='!valid ? $style.invalid : $style.valid' href='javascript:void(0)' @click='buy'>PAY NOW <b>${{ bundle.price }}</b></a>
          Free shipping
        </div>
      </div>
    </div>
    <div :id='$style.loading' v-if='loading'>
      <div :id='$style.loadingcontainer'>
        <Loading label='Preparing your order, please wait' />
      </div>
    </div>
  </section>
</template>

<script>
import Header from '~/components/header.vue'
import Bundle from '~/components/homesection-bundle.vue'
import Item from '~/components/bundle-item.vue'
import Title from '~/components/bundle-title.vue'
import Shipping from '~/components/shipping-form.vue'
import TextInput from '~/components/shipping-text.vue'
import Loading from '~/components/loading.vue'

import { bundles, leds, accessories, } from '~/config.json'
import { createCheckout, setShippingAddress, applyCoupon, applyFreeShipping,} from '~/lib/storefront.js'

const binding = (name) => ({
  get() {
    return this.$store.state.checkout[name].value
  },
  set(value) {
    this.$store.commit('checkout/updateCheckout', {key: name, value})
  },
})

export default {
  components: {Header, Bundle, Title, Item, Shipping, TextInput, Loading,},
  data() {
    return {
      loading: false
    }
  },
  computed: {
    valid() {
      return Object.keys(this.$store.state.checkout).findIndex((k) => typeof this.$store.state.checkout[k].value !== 'undefined' && !this.$store.state.checkout[k].value && !this.$store.state.checkout[k].optional) == -1
    },
    bundle() {
      const { slug } = this.$route.params
      return bundles.find((b) => b.slug == slug)
    },
    led() {
      return (slug) => leds.find((l) => l.slug == slug)
    },
    accessory() {
      return (slug) => accessories.find((a) => a.slug == slug)
    },
    color() {
      return this.$store.state.checkout.color
    },
    promocode: binding('promocode'),
  },
  methods: {
    async buy() {
      if (!this.valid) return
      this.$data.loading = true
      this.$store.commit('checkout/setCart', {id: `gid://shopify/ProductVariant/${this.bundle.ids[this.color]}`, n: 1})
			const checkout = await createCheckout(this.$store.state.checkout)
			await setShippingAddress(this.$store.state.checkout, checkout)
			if (this.$store.state.checkout.promocode) {
				await applyCoupon(this.$store.state.checkout, checkout)
			}
      await applyFreeShipping(this.$store.state.checkout, checkout)
      window.location.href = checkout.webUrl
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
  padding: 50pt 0 0 0

#buy
  display: flex
  flex-direction: column
  align-items: flex-end
  justify-content: flex-end
  text-align: right
  margin: 40pt 50pt 20pt 0
  @media only screen and (max-width: 600px)
    margin-top: 30pt

#buybutton
  display: block
  background-color: #3BB30B
  padding: 8pt 25pt
  margin: 5pt 0 0 0
  border-radius: 5pt
  color: white
  text-decoration: none
  text-align: center

#buybutton > b
  font-weight: 600

#promocode
  text-align: left

#loading
  display: flex
  align-items: center
  justify-content: center
  position: fixed
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  background-color: rgba(255, 255, 255, 0.6)
  z-index: 1000

#loadingcontainer
  position: relative
  width: 200pt
  height: 100pt

.invalid
  opacity: 0.6
  cursor: default !important

.valid:hover
  background-color: #2F880B
  
</style>
