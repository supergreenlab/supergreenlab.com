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
  <section>
    <div :id="$style.container">
      <div :id="$style.spotlightcontainer">
        <h2 :id="$style.title" v-html='$md.render(config.title)'></h2>
        <div :id="$style.description" v-html='$md.render(config.description)'></div>
        <div v-for='product in products' :key='product.id' :class='$style.productspotlight'>
          <div :id='$style.pics'>
            <!-- <div>{{ product }}</div> -->
            <Pics :pics='product.pics' :hideArrow=true />
          </div>
          <div :id='$style.content'>
            <nuxt-link :to='`/product/${product.SellingPoints[0].slug}`' :id='$style.contentlink'>
              <h3 v-html='$md.render(product.name)'></h3>
              <div v-html='$md.render(product.tagline)' :id='$style.tagline'></div>
              <div v-html='$md.render(product.bulletpoints)' :id='$style.bullets'></div>
            </nuxt-link>
            <div :id='$style.pricing'>
              <Price :lineItems='[{sellingPoint: product.SellingPoints[0], n: 1}]' :freeshipping='false' />
              <AddToCart :product='product' :sellingPoint='product.SellingPoints[0]' :discreet='false' @click='handleAddToCart' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import Pics from '~/components/products/pics.vue'
import Price from '~/components/products/price.vue'
import AddToCart from '~/components/products/addtocart.vue'

import { products } from '~/config/products.json'

export default {
  props: ['config',],
  components: { Pics, Price, AddToCart},
  data() {
    return {
      addedToCart: false,
    }
  },
  computed: {
    products() {
      const { config } = this.$props
      // console.log(config)
      return (config.products || []).map(p => products.find(p1 => p1.id == p))
    },
  },
  methods: {
    handleAddToCart() {
      setTimeout(() => this.$data.addedToCart = true, 1000)
    }
  }
}

</script>

<style module lang=stylus>

#container
  display: flex

  align-items: center

#spotlightcontainer
  display:flex
  flex-direction: column

#title
  text-transform: uppercase
  font-weight: bold
  font-size: 2.5em
  color: #5E5E5E

#description
  margin: 10pt 0

#content
  display:flex
  flex-direction: column
  margin: 0 10pt

#contentlink
  text-decoration: none

#contentlink:hover
  text-decoration: underline

#contentlink > h3
  color: #5E5E5E

#contentlink > div
  margin-bottom: 5pt

.productspotlight
  display: flex
  align-items: center
  justify-content: center

#pics
  width: 40%
  height: 300pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat

#pricing
  display: flex
  flex-direction: column
  align-self: flex-end

#bullets
  color: #454545

#bullets strong
  color: #3BB30B
  font-weight: 600

#bullets ul
  padding: 0
  list-style-type: none

#bullets ul li
  margin-bottom:7pt

#bullets ul li::before
  content: '- '
  color: #3bb30b
  font-weight: bold

#tagline
  color: #3bb30b
  font-weight: bold

</style>
