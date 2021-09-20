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
  <section :id="$style.container">
    <div :id='$style.pic'>
      <Pics :pics='product.pics' />
    </div>
    <div :id='$style.text'>
      <h2 :id="$style.title" v-html='$md.render(title)'></h2>
      <div :id="$style.description" v-html='$md.render(description)'></div>
      <div>
        <nuxt-link :class='$style.productpage' :to='product.type.indexOf("SGL_BUNDLE") == -1 ? `/product/${sellingPoint.slug}` : `/bundle/${product.slug}`'>View product page</nuxt-link>
      </div>
      <div :id='$style.addtocartcontainer'>
        <div :class='$style.price'>
          <Price :lineItems='[{sellingPoint: sellingPoint, n: 1}]' :freeshipping='false' />
        </div>
        <OutOfStock v-if='sellingPoint.outofstock' />
        <AddToCart v-else :product='product' :sellingPoint='sellingPoint' @click='handleAddToCart' />
      </div>
    </div>
  </section>
</template>

<script>

import Pics from '~/components/products/pics.vue'
import SmallProductList from '~/components/products/smallproductlist.vue'
import OutOfStock from '~/components/products/outofstock.vue'
import AddToCart from '~/components/products/addtocart.vue'
import Price from '~/components/products/price.vue'

import { products } from '~/lib/json_db.js'

export default {
  props: ['config',],
  components: { SmallProductList, Pics, OutOfStock, AddToCart, Price, },
  data() {
    return {
      addedToCart: false,
    }
  },
  computed: {
    product() {
      const { config } = this.$props
      return products(config.products)[0]
    },
    sellingPoint() {
      return this.$store.getters['eshop/sellingPointForProduct'](this.product.id)
    },
    title() {
      const { config: { title } } = this.$props
      return title || this.product.name
    },
    description() {
      const { config: { description } } = this.$props
      return description.trim() || `${this.product.bullets}\n${this.product.description}`
    },
  },
  methods: {
    handleAddToCart() {
      setTimeout(() => this.$data.addedToCart = true, 1000)
    },
  }
}

</script>

<style module lang=stylus>

#container
  display: flex
  margin: 5pt
  /* flex-direction: column */
  @media only screen and (max-width: 600px)
    flex-direction: column

#pic
  width: 300pt
  height: 300pt
  @media only screen and (max-width: 600px)
    width: 100%

#text
  display: flex
  flex-direction: column
  flex: 1
  margin: 0 20pt
  @media only screen and (max-width: 600px)
    margin: 0

#title
  text-transform: uppercase
  font-weight: bold
  font-size: 2.5em
  color: #5E5E5E
  margin-bottom: 10pt
  margin: 10pt 0 10pt 0
  @media only screen and (max-width: 600px)
    font-size: 1.5em

#description
  text-align: justify
  margin: 0 10pt
  color: #454545
  margin: 10pt 5pt
  @media only screen and (max-width: 600px)
    margin: 0 5pt

#description strong
  color: #3BB30B
  font-weight: 600

#description ul
  padding: 0
  list-style-type: none

#description ul li
  margin-bottom:7pt

#description ul li::before
  content: '- '
  color: #3bb30b
  font-weight: bold

.productpage
  color: #3bb30b

#addtocartcontainer
  display: flex
  flex-direction: column
  margin-top: 20pt
  align-items: flex-end

.price
  margin-bottom: 10pt

#addtocart
  display: flex
  flex-direction: column
  justify-content: flex-end
  text-align: right
  color: #3bb30b;
  font-weight: 600;
  @media only screen and (max-width: 600px)
    align-self: flex-end

#addtocart > a
  display: block
  align-self: flex-end
  background-color: #3BB30B
  padding: 8pt 25pt
  border-radius: 5pt
  color: white
  text-decoration: none
  font-size: 22px
  margin: 4pt 0

#addtocart > a:hover
  background-color: #2F880B

#addtocart > a > b
  font-weight: 600

</style>
