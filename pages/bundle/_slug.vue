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
      <Bundle :nobottom=true :bundle='bundle' :addtocart=true :noframe=true :showdescription=true :showRelatedProducts=true />
      <Title icon='icon-see-shop.svg' title='SPARE PARTS' />
      <ProductList :products='sglSpareParts' :center=true :maxItems=4 />
      <div :class='$style.space'></div>
      <BundleIntro ref='bundle-intro' />
      <div :class='$style.space'></div>
      <ContinuousSupply ref='continuous_supply' />
      <div :class='$style.space'></div>
      <ProgressiveSunriseSunset ref='progressive_sunrise_sunset' />
      <div :class='$style.space'></div>
      <App ref='app' />
      <div :class='$style.space'></div>
      <LatestDiaries ref='latest_diaries' />
      <Title icon='package.svg' title='BUNDLE CONTENT' />
      <Item v-if='bundle.specs.bigleds' :showHarvest='true' :n='bundle.specs.bigleds' :item='led("sgl-192")' />
      <Item v-if='bundle.specs.smallleds' :showHarvest='!bundle.specs.bigleds' :n='bundle.specs.smallleds' :item='led("sgl-144")' />
      <Item v-if='bundle.specs.tinyleds' :showHarvest='!bundle.specs.bigleds && !bundle.specs.smallleds' :n='bundle.specs.tinyleds' :item='led("sgl-36")' />
      <Item v-if='bundle.specs.ventilation' :n='bundle.specs.ventilation' :item='accessory("sgl-blower")' />
      <Item v-if='bundle.specs.sensor' :n='bundle.specs.sensor' :item='accessory("sgl-temperature-humidity-sensor")' />
      <Item n='1' :item='accessory("sgl-controller")' last='true' />
      <Item n='1' :item='accessory("power-supply-24v-6-25a")' last='true' />
      <div :class='$style.price'>
        <Price :lineItems='[{sellingPoint: bundle.SellingPoints[0], n: 1}]' :freeshipping='false' />
        <AddToCart :product='bundle' :sellingPoint='bundle.SellingPoints[0]' />
      </div>
      <Title icon='guides.svg' title='GUIDES' />
      <div :id='$style.guides'>
        <ProductGuide v-for='guide in guides' :key='guide.id' :guide='guide' />
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
      <Title icon='icon-see-shop.svg' title='SEE ALSO' />
      <div v-if='relatedProducts.length' :id='$style.products'>
        <ProductList :products='relatedProducts' :maxItems=4 />
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'
import Guide from '~/components/bundle/guide.vue'
import ProductGuide from '~/components/guides/small.vue'
import ProductList from '~/components/products/productlist.vue'
import Bundle from '~/components/bundle/bundle.vue'
import Item from '~/components/bundle/item.vue'
import Title from '~/components/bundle/title.vue'
import Price from '~/components/products/price.vue'
import Footer from '~/components/layout/footer.vue'
import BundleIntro from '~/components/home/bundle.vue'
import ContinuousSupply from '~/components/home/continuous-supply.vue'
import ProgressiveSunriseSunset from '~/components/home/progressive-sunrise-sunset.vue'
import App from '~/components/home/app.vue'
import LatestDiaries from '~/components/home/latest-diaries.vue'
import AddToCart from '~/components/products/addtocart.vue'

import { guides } from '~/config/guides.json'

export default {
  components: {Header, Guide, ProductGuide, ProductList, Bundle, Title, Price, Item, Footer, ContinuousSupply, ProgressiveSunriseSunset, App, BundleIntro, LatestDiaries, AddToCart,},
  head() {
    return {
      title: `SuperGreenLab - ${this.brandProduct.name} - ${this.bundle.tagline}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.brandProduct.description
        },
      ],
    }
  },
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
    bundle() {
      const { slug } = this.$route.params
      return this.$store.getters['eshop/productWithSlug'](slug)
    },
    brandProduct() {
      return this.$store.getters['eshop/brandProduct'](this.bundle.SellingPoints[0].BrandProduct[0])
    },
    led() {
      return (slug) => this.$store.getters['eshop/productWithSlug'](slug)
    },
    accessory() {
      return (slug) => this.$store.getters['eshop/productWithSlug'](slug)
    },
    guides() {
      return guides.filter(g => {
        return g.requires && g.requires.indexOf(this.bundle.id) !== -1
      }).map(g => {
        if (g.first) {
          return guides.find(g2 => g2.id == g.first)
        }
        return g
      }).filter((g, i, a) => {
        return a.indexOf(g) == i
      })
    },
    sglSpareParts() {
      return this.$store.getters['eshop/leds'].concat(this.$store.getters['eshop/accessories'])
    },
    relatedProducts() {
      /*return this.$store.getters['eshop/productsWithTypes'](['FURNITURE', 'CARBON FILTER', 'SOIL']).filter((p, i, a) => {
        return a.indexOf(p) == i
      }).filter(p => p.id !== this.bundle.id)*/
      return [].concat(...['FURNITURE', 'TENT', 'CARBON FILTER', 'SOIL', 'NUTRIENT'].map(t => this.$store.getters['eshop/productsWithTypes'](t))).filter((p, i, a) => {
        return a.indexOf(p) == i
      }).filter(p => p.id !== this.bundle.id)
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
  max-width: 900pt
  padding: 50pt 0 0 0

.price
  display: flex
  flex-direction: column
  align-items: flex-end
  margin: 10pt 10pt 10pt 20pt
  color: #454545

#guides
  display: flex
  flex-wrap: wrap
  margin: 0 10pt

.guide
  margin: 20pt 0
  flex-basis: 50%
  @media only screen and (max-width: 600px)
    flex-basis: 100%
    margin: 20pt 5pt

.space
  height: 40pt

</style>
