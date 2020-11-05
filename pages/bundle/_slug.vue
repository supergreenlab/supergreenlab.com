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
      <Bundle nobottom='true' :bundle='bundle' addtocart='true' noframe='true' :promodiscount='promo.discount' />
      <Title icon='guides.svg' title='GUIDES' />
      <div :id='$style.guides'>
        <div :class='$style.guide'>
          <Guide icon='guide-mobile.svg'
                 analytics='guide-setup-with-the-app'
                 title='HOW TO'
                 subtitle='SETUP WITH THE APP'
                 slug='how-to-setup-controller'
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
      <Item v-if='bundle.bigleds' :showHarvest='true' :discount='totaldiscount' :n='bundle.bigleds' :item='led("192")' />
      <Item v-if='bundle.smallleds' :showHarvest='!bundle.bigleds' :discount='totaldiscount' :n='bundle.smallleds' :item='led("144")' />
      <Item v-if='bundle.tinyleds' :showHarvest='!bundle.bigleds && !bundle.smallleds' :discount='totaldiscount' :n='bundle.tinyleds' :item='led("36")' />
      <Item v-if='bundle.ventilation' :discount='totaldiscount' :n='bundle.ventilation' :item='accessory("blower")' />
      <Item v-if='bundle.sensor' :discount='totaldiscount' :n='bundle.sensor' :item='accessory("sensor")' />
      <Item n='1' :item='accessory("controller")' :discount='totaldiscount' last='true' />
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
import Footer from '~/components/homesection-footer.vue'

import priceConv from '~/lib/price.js'

export default {
  components: {Header, Guide, Bundle, Title, Price, Item, Footer,},
  data() {
    return {
      loading: false,
      showPreOrderForm: false,
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
      return this.$store.state.eshop.sgl.bundles.find((b) => b.slug == slug)
    },
    led() {
      return (slug) => this.$store.state.eshop.sgl.leds.find((l) => l.slug == slug)
    },
    accessory() {
      return (slug) => this.$store.state.eshop.sgl.accessories.find((a) => a.slug == slug)
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

</style>
