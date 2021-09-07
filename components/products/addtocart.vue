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
  <section :id='$style.container' :class='small ? $style.small : ""'>
    <div>
      <Number v-if='!lineItems' v-model='n' :small=true />
      <nuxt-link v-if='done' :id='$style.button' to='/cart'><b>GO TO CART</b></nuxt-link>
      <a v-else :id='$style.button' :style='{"opacity": activated ? 0.5 : 1}' href='javascript:void(0);' @click='addToCartClicked'><b>{{ activated ? "PLEASE WAIT" : (added ? "ITEM ADDED!" : "ADD TO CART") }}</b></a>
    </div>
    <p v-if='discreet !== false'>Our bundles are shipped discreet</p>
  </section>
</template>

<script>
import Number from '~/components/widgets/number.vue'

export default {
  components: {Number,},
  props: ['product', 'sellingPoint', 'name', 'lineItems', 'small', 'discreet',],
  data() {
    return {
      n: 1,
      activated: false,
      added: false,
      done: false
    }
  },
  beforeDestroy() {
    if (this.timeout) clearTimeout(this.timeout)
  },
  methods: {
    addToCartClicked() {
      if (this.$data.activated) return
      const { product, sellingPoint, lineItems, name,} = this.$props
      const { n } = this.$data
      const cart = lineItems ? lineItems : [{ n, product, sellingPoint }]
      this.$matomo && this.$matomo.trackEvent('product', 'addtocart', name || sellingPoint.slug)
      this.$data.activated = true
      this.timeout = setTimeout(() => {
        this.$data.activated = false
        this.$data.added = true
        this.$emit('click')
        cart.forEach(li => this.$store.commit('checkout/addToCart', li))
        this.timeout = setTimeout(() => {
          this.$data.done = true
        }, 2000)
      }, 800)
    },
  },
}
</script>

<style module lang=stylus>

#container
  font-family: Roboto
  display: flex
  flex-direction: column
  justify-content: flex-end
  align-items: flex-end
  text-align: right
  font-weight: 600;

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

#container.small > #button
  padding: 6pt 18pt
  font-size: 1em
  border-radius: 4pt

#button:hover
  background-color: #2F880B

#button > b
  font-weight: 600

#number
  align-self: flex-end

</style>
