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
        <div :id="$style.title" v-html='$md.render(config.title)'></div>
        <div :id="$style.description" v-html='$md.render(config.description)'></div>
        <div v-for='product in products' :key='product.id' :class='$style.productspotlight'>
          <div :id='$style.pics'>
            <Pics :pics='product.pics' :hideArrow=true />
          </div>
          <div :id='$style.content'>
            <h3 v-html='$md.render(product.name)'></h3>
            <div v-html='$md.render(product.tagline)'></div>
            <div v-html='$md.render(product.description)'></div>
          </div>
          <div :id='$style.pricing'>
            <Price :lineItems='[{sellingPoint: product.SellingPoints[0], n: 1}]' :freeshipping='false' />
            <AddToCart :product='product' :sellingPoint='product.SellingPoints[0]' :discreet='false' @click='handleAddToCart' />
            <!-- <nuxt-link v-if='done' :id='$style.button' to='/cart'><b>GO TO CART</b></nuxt-link>
            <a v-else :id='$style.button' :style='{"opacity": activated ? 0.5 : 1}' href='javascript:void(0);' @click='buyNow'><b>{{ activated ? "PLEASE WAIT" : (added ? "ADDED IN CART!" : "BUY NOW") }}</b></a> -->
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
      // activated: false,
      // added: false,
      // done: false
    }
  },
  beforeDestroy() {
    if (this.timeout) clearTimeout(this.timeout)
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
    // buyNow() {
    //   if (this.$data.activated) return
    //   const { product, sellingPoint, lineItems, name,} = this.$props
    //   const { n } = this.$data
    //   const cart = lineItems ? lineItems : [{ n, product, sellingPoint }]
    //   this.$matomo && this.$matomo.trackEvent('product', 'addtocart', name || sellingPoint.slug)
    //   this.$data.activated = true
    //   this.timeout = setTimeout(() => {
    //     this.$data.activated = false
    //     this.$data.added = true
    //     this.$emit('click')
    //     cart.forEach(li => this.$store.commit('checkout/addToCart', li))
    //     this.timeout = setTimeout(() => {
    //       this.$data.done = true
    //     }, 2000)
    //   }, 800)
    },

}

</script>

<style module lang=stylus>

#container
  display: flex
  justify-content: center
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

#content > h3
  color: #5E5E5E

#content > div
  margin-bottom: 5pt

.productspotlight
  display: flex
  align-items: center
  justify-content: center

#pics
  width: 300pt
  height: 300pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat

#pricing
  display: flex
  flex-direction: column
  align-self: flex-end

#button
  display: block
  background-color: #3BB30B
  text-align: center
  padding: 8pt 25pt
  border-radius: 5pt
  color: white
  text-decoration: none
  font-size: 1.2em
  margin: 4pt 0
  white-space: nowrap
  transition: opacity 0.2s
  font-weight: bold
  cursor: pointer


#button:hover
  background-color: #2F880B

</style>
