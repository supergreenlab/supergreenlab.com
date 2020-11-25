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
    <div :id='$style.pic' :style='{"background-image": `url(${require(`~/assets/img/${pic}`)})`}'></div>
    <h3>{{ name }}</h3>
    <div :class='$style.price'>
      <Price :price='product.SellingPoints[0].price' :promodiscount='promodiscount' :small=true />
    </div>
    <OutOfStock v-if='outofstock' />
    <AddToCart :product='product' :sellingPoint='product.SellingPoints[0]' :small='true' :discreet=false />
  </section>
</template>

<script>
import OutOfStock from '~/components/products/outofstock.vue'
import Price from '~/components/products/price.vue'
import AddToCart from '~/components/products/addtocart.vue'

export default {
  components: {Price, OutOfStock, AddToCart, },
  props: ['product', 'promodiscount'],
  computed: {
    pic() {
      const { product } = this.$props
      const brandProduct = this.$store.getters['eshop/brandProduct'](product.SellingPoints[0].BrandProduct[0])
      return brandProduct.pics[0].fileLarge
    },
    name() {
      const { product } = this.$props
      const brandProduct = this.$store.getters['eshop/brandProduct'](product.SellingPoints[0].BrandProduct[0])
      return brandProduct.name
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  justify-content: space-between
  height: 250pt
  color: #454545

#container > h3
  display: flex
  align-items: flex-start
  margin: 0

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

#goto
  display: block
  align-self: flex-start
  background-color: #3BB30B
  padding: 8pt 25pt
  border-radius: 5pt
  color: white
  text-decoration: none

#goto:hover
  background-color: #2F880B

#goto > b
  font-weight: 600

</style>
