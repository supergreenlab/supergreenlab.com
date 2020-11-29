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
    <nuxt-link :id='$style.infos' :to='`/product/${sellingPoint.slug}`'>
      <div :id='$style.pic' :style='{"background-image": `url(${require(`~/assets/img/${brandProduct.pics[0].fileLarge}`)})`}'></div>
      <h3>{{ brandProduct.name }}<br />BY {{ brand.name }}</h3>
    </nuxt-link>
    <div :class='$style.price'>
      <Price :price='sellingPoint.price' :promoDiscount='promoDiscount' :small=true />
    </div>
    <OutOfStock v-if='product.outofstock' />
    <AddToCart :product='product' :sellingPoint='sellingPoint' :small='true' :discreet=false :n='n' />
  </section>
</template>

<script>
import OutOfStock from '~/components/products/outofstock.vue'
import Price from '~/components/products/price.vue'
import AddToCart from '~/components/products/addtocart.vue'

export default {
  components: {Price, OutOfStock, AddToCart, },
  props: ['product', 'promoDiscount'],
  data() {
    return {
      n: 1
    }
  },
  computed: {
    sellingPoint() {
      const { product } = this.$props
      return product.SellingPoints[0]
    },
    brandProduct() {
      return this.$store.getters['eshop/brandProduct'](this.sellingPoint.BrandProduct[0])
    },
    brand() {
      return this.$store.getters['eshop/brand'](this.brandProduct.Brand[0])
    },
    url() {
      return this.sellingPoint.url
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-between
  height: 300pt
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

</style>
