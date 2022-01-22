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
  <section :id='$style.container' :class='picOnly ? $style.small : ""'>
    <nuxt-link @click.native='click' :id='$style.infos' :to='link'>
      <div :id='$style.pic'>
        <Pics :pics='brandProduct.pics' :hideArrow=true />
      </div>
      <h3>{{ brandProduct.name }}<span v-if='!picOnly'><br />BY {{ brand.name }}</span></h3>
      <b :id='seller.id == sglSellerId ? $style.green : $style.normal'>{{ seller.name }}</b>
    </nuxt-link>
    <div v-if='!picOnly'>
      <div :class='$style.price'>
        <Price :lineItems='[{sellingPoint, n: 1}]' :small=true />
      </div>
      <OutOfStock v-if='!picOnly && sellingPoint.outofstock' />
      <SmallAddToCart v-else-if='!picOnly' :location='location' :hideNumber='true' :product='product' :sellingPoint='sellingPoint' :small='true' :discreet=false :n='1' />
    </div>
  </section>
</template>

<script>
import OutOfStock from '~/components/products/outofstock.vue'
import Price from '~/components/products/price.vue'
import SmallAddToCart from '~/components/products/smalladdtocart.vue'
import Pics from '~/components/products/pics.vue'

import { seller, brand, brandProduct, } from '~/lib/json_db.js'

export default {
  components: {Price, OutOfStock, SmallAddToCart, Pics,},
  props: ['product', 'picOnly', 'location',],
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
        return `/product/${this.product.slug}`
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
  color: #454545
  font-size: 0.9em
  height: 200pt

#container.small
  height: 110pt

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
  margin: 5pt
  width: 80pt
  height: 80pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat

#container.small #pic
  width: 50pt
  height: 50pt

.price
  display: flex
  margin: 3pt 0

#green
  color: #3bb30b
  font-weight: 600

#normal
  font-weight: 300

</style>
