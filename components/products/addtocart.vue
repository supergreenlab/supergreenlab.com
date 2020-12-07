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
      <Number v-model='n' :small=true />
      <a :id='$style.button' href='javascript:void(0);' @click='addToCartClicked'><b>ADD TO CART</b></a><br />
    </div>
    <p v-if='discreet !== false'>Our bundles are shipped discreet</p>
  </section>
</template>

<script>
import Number from '~/components/widgets/number.vue'

export default {
  components: {Number,},
  props: ['product', 'sellingPoint', 'small', 'discreet',],
  data() {
    return {
      n: 1,
    }
  },
  methods: {
    addToCartClicked() {
      const { product, sellingPoint, } = this.$props
      const { n } = this.$data
      this.$matomo && this.$matomo.trackEvent('bundle', 'addtocartclicked', sellingPoint.slug)
      this.$store.commit('checkout/addToCart', { n, product, sellingPoint })
    },
  },
}
</script>

<style module lang=stylus>

#container
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
