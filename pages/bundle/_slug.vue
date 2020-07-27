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
      <Bundle nobottom='true' v-bind='bundle' addtocart='true' noframe='true' :promodiscount='promo.discount' />
      <Title icon='guides.svg' title='GUIDES' />
      <div :id='$style.guides'>
        <div :class='$style.guide'>
          <Guide icon='guide-mobile.svg'
                 analytics='guide-setup-with-the-app'
                 title='HOW TO'
                 subtitle='SETUP WITH THE APP'
                 slug='how-to-setup-with-the-app'
                 button='LEARN MORE' />
        </div>
        <div :class='$style.guide'>
          <Guide icon='guide-install-led.svg'
                 analytics='guide-install-led'
                 title='HOW TO'
                 subtitle='INSTALL A LED PANEL'
                 slug='how-to-install-a-led-panel'
                 button='LEARN MORE' />
        </div>
      </div>
      <Title icon='package.svg' title='BUNDLE CONTENT' />
      <Item v-if='bundle.bigleds' :showHarvest='true' :discount='totaldiscount' :color='color' :n='bundle.bigleds' v-bind='led("192")' />
      <Item v-if='bundle.smallleds' :showHarvest='!bundle.bigleds' :discount='totaldiscount' :color='color' :n='bundle.smallleds' v-bind='led("144")' />
      <Item v-if='bundle.tinyleds' :showHarvest='!bundle.bigleds && !bundle.smallleds' :discount='totaldiscount' :color='color' :n='bundle.tinyleds' v-bind='led("36")' />
      <Item v-if='bundle.ventilation' :discount='totaldiscount' :n='bundle.ventilation' v-bind='accessory("blower")' />
      <Item v-if='bundle.sensor' :discount='totaldiscount' :n='bundle.sensor' v-bind='accessory("sensor")' />
      <Item n='1' v-bind='accessory("controller")' :discount='totaldiscount' last='true' />
      <div :class='$style.price'>
        <Price :price='bundle.price' :promodiscount='promo.discount' :freeshipping='false' />
      </div>
      <div :id='$style.guides'>
        <Title icon='guides.svg' title='QUESTIONS?' />
        <div :class='$style.guide'>
          <Guide icon='enveloppe.svg'
                 analytics='ask-by-email'
                 title='GOT QUESTIONS ?'
                 subtitle='DROP US AN EMAIL'
                 text='at towelie@supergreenlab.com'
                 button='EMAIL' />
        </div>
        <div :class='$style.guide'>
          <Guide icon='ask.svg'
                 analytics='ask-on-discord'
                 title='GOT QUESTIONS ?'
                 subtitle='ASK US BY CHAT'
                 href='javascript:$crisp.push(["set", "session:event", ["show_chat"]])'
                 button='START CHAT' />
        </div>
      </div>
      <div id='shipping'></div>
      <Title icon='world.svg' title='ORDER YOURS NOW!' />
      <div :id='$style.shipdisclaimer'>
        <b>OUT OF STOCK NOTICE:</b> manufacturing of new Ninja bundles in progress (5-8 weeks).<br />
        As the bundles come together <b>we will have a more precise shipping estimate.</b><br /><br />
        <b>Want to be updated on the restock status?</b><br />
        Fill out the form below and we'll let you know when we're ready for pre-orders :)<br /><br />
        <h4>Thanks for your support:)</h4>
      </div>
      <div :id='$style.preorderoverlay' v-if='bundle.outofstock'>
        <div class="typeform-widget" data-url="https://supergreenlab.typeform.com/to/i0dIP6" data-transparency="100" data-hide-headers=true data-hide-footer=true style="width: 100%; height: 500px;"></div> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/"; if(!gi.call(d,id)) { js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })() </script>
      </div>
      <div v-else>
        <Shipping />
        <div :id='$style.buy'>
          <div :id='$style.promocode'>
            <!--<OutOfStock v-if='bundle.outofstock' />-->
            <TextInput label='Promo code' v-model='promocode' name='promocode' optional='true' />
            <a :id='$style.buybutton' :class='!valid ? $style.invalid : $style.valid' href='javascript:void(0)' @click='buy'>PAY NOW <b>{{ priceConv(bundle.price - bundle.price*promo.discount / 100) }}</b></a>
            <div :class='$style.block'>
              <img src='~assets/img/powered-by-stripe.png' width="300"><br />
            </div>
            <!--<div :class='$style.block'>
              <img src='~assets/img/crypto.png'>
            </div>-->
            <div :class='$style.block'>
              <img src='~assets/img/paypal.png'>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <div :id='$style.loading' v-if='loading'>
      <div :id='$style.loadingcontainer'>
        <Loading label='Preparing your order, please wait' />
      </div>
    </div>
  </section>
</template>

<script>
import Header from '~/components/header.vue'
import Guide from '~/components/bundle-guide.vue'
import Bundle from '~/components/homesection-bundle.vue'
import Item from '~/components/bundle-item.vue'
import Title from '~/components/bundle-title.vue'
import Price from '~/components/price.vue'
import Shipping from '~/components/shipping-form.vue'
import TextInput from '~/components/shipping-text.vue'
import Loading from '~/components/loading.vue'
import Footer from '~/components/homesection-footer.vue'
import OutOfStock from '~/components/outofstock.vue'

import priceConv from '~/lib/price.js'

import { bundles, } from '~/config/bundles.json'
import { leds, } from '~/config/leds.json'
import { accessories, } from '~/config/accessories.json'
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
  components: {Header, Guide, Bundle, Title, Price, Item, Shipping, TextInput, Loading, Footer, OutOfStock,},
  data() {
    return {
      loading: false
    }
  },
  destroyed() {
    if (this.timeout) clearTimeout(this.timeout)
  },
  computed: {
    valid() {
      return this.bundle.canorder && Object.keys(this.$store.state.checkout).findIndex((k) => typeof this.$store.state.checkout[k].value !== 'undefined' && !this.$store.state.checkout[k].value && !this.$store.state.checkout[k].optional) == -1
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
    promocode: {
      get() {
        return this.$store.state.checkout.promocode.value
      },
      set(value) {
        this.$store.commit('checkout/updateCheckout', {key: 'promocode', value})
        this.$store.commit('checkout/setDiscount', 0)
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.$store.dispatch('checkout/setPromocode', { code: value }), 400)
      },
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
    async buy() {
      if (!this.valid) return
      this.$matomo && this.$matomo.trackEvent('shipping-form', 'buypressed', this.$route.params.slug, Math.floor((this.bundle.price - this.bundle.price*this.promo.discount/100) * 100) / 100)
      this.$data.loading = true
      this.$store.commit('checkout/setCart', {id: `gid://shopify/ProductVariant/${this.bundle.ids[this.color]}`, n: 1})
			const checkout = await createCheckout(this.$store.state.checkout)
      console.log(checkout)
			await setShippingAddress(this.$store.state.checkout, checkout)
			if (this.$store.state.checkout.promocode) {
				await applyCoupon(this.$store.state.checkout, checkout)
			}
      await applyFreeShipping(this.$store.state.checkout, checkout)
      setTimeout(() => window.location.href = checkout.webUrl, 1000)
    },
    priceConv(dols) {
      return priceConv(dols)
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
    margin: 30pt 10pt 20pt 0

#buybutton
  display: block
  background-color: #3BB30B
  padding: 8pt 25pt
  margin: 5pt 0 0 0
  border-radius: 5pt
  color: white
  text-decoration: none
  text-align: center
  font-weight: 500

#buybutton > b
  font-weight: 600

#promocode
  text-align: left

#preorderoverlay
  background-color: white

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

.block
  display: flex

.blockicon
  width: 20pt
  height: 20pt
  margin: 5pt

#pricecontainer
  display: flex
  flex: 1
  justify-content: flex-end
  border-top: 1pt solid #eeeeee
  border-bottom: 1pt solid #eeeeee
  margin: 10pt 10pt 15pt 0
  color: #454545
  @media only screen and (max-width: 600px)
    font-size: 0.8em

.price
  display: flex
  justify-content: flex-end
  margin: 10pt 10pt 10pt 20pt

#guides
  display: flex
  flex-wrap: wrap

.guide
  margin: 20pt 0
  flex-basis: 50% 
  @media only screen and (max-width: 600px)
    flex-basis: 100% 
    margin: 20pt 5pt

#shipdisclaimer
  background-color: #f2f2f2
  padding: 20pt 15pt
  color: #717171
  font-size: 1.2em
  text-align: center

#shipdisclaimer > b
  color: #3BB30B

</style>
