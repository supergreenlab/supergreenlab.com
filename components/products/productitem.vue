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
    <nuxt-link @click.native='click' :id='$style.infos' :to='link'>
      <div :id='$style.pic'>
        <Pics :pics='brandProduct.pics' :hideArrow=true />
      </div>
      <h3>{{ brandProduct.name }}<br />BY {{ brand.name }}</h3>
      <b :id='seller.id == sglSellerId ? $style.green : $style.normal'>{{ seller.name }}</b>
      <div :id='$style.tagline' v-if='product.tagline' v-html='$md.render(product.tagline)'></div>
    </nuxt-link>
    <div :id='$style.addtocartcontainer' v-if='brandProduct.sellable'>
      <div :class='$style.price'>
        <Price :lineItems='[{sellingPoint, n: 1}]' :small=true />
      </div>
      <OutOfStock v-if='sellingPoint.outofstock' />
      <AddToCart v-else :product='product' :sellingPoint='sellingPoint' :small='true' :discreet=false :n='1' :location='location' />
    </div>
    <div :id='$style.addtocartcontainer' v-else>
      <div :id='$style.downloadlink'>
        <nuxt-link :id='$style.productpage' :to='link'>Free download!</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import OutOfStock from '~/components/products/outofstock.vue'
import Price from '~/components/products/price.vue'
import AddToCart from '~/components/products/addtocart.vue'
import Pics from '~/components/products/pics.vue'

import { seller, brand, brandProduct, } from '~/lib/json_db.js'

export default {
  components: {Price, OutOfStock, AddToCart, Pics,},
  props: ['product', 'location',],
  computed: {
    sellingPoint() {
      const { product } = this.$props
      return this.$store.getters['eshop/sellingPointForProduct'](product.id)
    },
    brandProduct() {
      return brandProduct(this.sellingPoint.BrandProduct[0])
    },
    brand() {
      return brand(this.brandProduct.Brand[0])
    },
    url() {
      return this.sellingPoint.url
    },
    seller() {
      return seller(this.sellingPoint.Seller[0])
    },
    sglSellerId() {
      return process.env.sglSellerId
    },
    link() {
      const { product } = this.$props
      if (product.type.indexOf("SGL_BUNDLE") !== -1) {
        return `/bundle/${product.slug}`
      }
      const sglSellerIDs = [process.env.sglSellerID, process.env.sgteuSellerID, process.env.sgtusSellerID]
      if (sglSellerIDs.includes(this.seller.id)) {
        return `/product/${product.slug}`
      }
      return `/product/${this.sellingPoint.slug}`
    },
  },
  methods: {
    click() {
      this.$analytics.trackEvent(this.$props.location || 'productitem', 'viewproduct', this.sellingPoint.slug)
    }
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-between
  height: 340pt
  color: #454545

#infos
  display: flex
  flex-direction: column
  align-items: center
  cursor: pointer
  text-decoration: none
  color: #454545

#infos:hover
  text-decoration: underline

#infos > h3
  display: flex
  align-items: flex-start
  margin: 0
  text-align: center

#pic
  margin: 10pt
  width: 100pt
  height: 100pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat

.price
  display: flex
  margin: 10pt 0

#green
  color: #3bb30b
  font-weight: 600

#normal
  font-weight: 300

#tagline
  text-align: center
  font-size: 0.9em
  margin: 5pt 40pt
  @media only screen and (max-width: 600pt)
    margin: 5pt 20pt

#tagline strong
  color: #3bb30b
  font-weight: bold

#addtocartcontainer
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

#productpage
  display: block
  background-color: #3bb30b
  text-align: center
  padding: 5pt 15pt
  border-radius: 3pt
  color: #ffffff
  text-decoration: none
  font-size: 0.9em
  margin: 5pt 0
  white-space: nowrap
  text-transform: uppercase
  cursor: pointer

#productpage:hover
  background-color: #2F880B

#downloadlink
  display: flex
  margin: 10pt 5pt 10pt 10pt
  font-weight: 800
  font-size: 1.2em
  > a
    padding: 10pt 25pt

</style>
