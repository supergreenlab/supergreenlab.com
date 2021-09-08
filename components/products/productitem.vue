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
    <nuxt-link @click.native='click' :id='$style.infos' :to='product.type.indexOf("SGL_BUNDLE") == -1 ? `/product/${sellingPoint.slug}` : `/bundle/${product.slug}`'>
      <div :id='$style.pic'>
        <Pics :pics='brandProduct.pics' :hideArrow=true />
      </div>
      <h3>{{ brandProduct.name }}<br />BY {{ brand.name }}</h3>
      From <b :id='seller.id == "recT9nIg4ahFv9J29" ? $style.green : $style.normal'>{{ seller.name }}</b>
      <div :id='$style.tagline' v-if='product.tagline' v-html='$md.render(product.tagline)'></div>
    </nuxt-link>
    <div :class='$style.price'>
      <Price :lineItems='[{sellingPoint, n: 1}]' :small=true />
    </div>
    <OutOfStock v-if='sellingPoint.outofstock' />
    <AddToCart v-else :product='product' :sellingPoint='sellingPoint' :small='true' :discreet=false :n='1' />
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
  props: ['product',],
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
  },
  methods: {
    click() {
      this.$matomo && this.$matomo.trackEvent('productitem', 'viewproduct', this.sellingPoint.slug)
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

</style>
