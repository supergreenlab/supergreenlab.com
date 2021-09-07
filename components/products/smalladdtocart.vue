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
    <a :id='$style.button' :style='{"opacity": activated ? 0.5 : 1}' href='javascript:void(0);' @click='addToCartClicked'><b>{{ activated ? "PLEASE WAIT" : (added ? "ITEM ADDED!" : "ADD TO CART") }}</b></a>
  </section>
</template>

<script>
export default {
  components: {},
  props: ['product', 'sellingPoint',],
  data() {
    return {
      activated: false,
      added: false,
      done: false,
    }
  },
  beforeDestroy() {
    if (this.timeout) clearTimeout(this.timeout)
  },
  methods: {
    addToCartClicked() {
      const { product, sellingPoint, } = this.$props
      this.$matomo && this.$matomo.trackEvent('bundle', 'addtocartclicked', sellingPoint.id)
      this.$data.activated = true
      this.timeout = setTimeout(() => {
        this.$data.activated = false
        this.$data.added = true
        this.$emit('click')
        this.$store.commit('checkout/addToCart', { n: 1, product, sellingPoint })
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
  display: flex
  flex-direction: column
  justify-content: flex-end
  align-items: flex-end
  text-align: right
  font-weight: 600;

#button
  font-family: Roboto
  display: block
  background-color: #3BB30B
  text-align: center
  padding: 4pt 12pt
  border-radius: 3pt
  color: white
  text-decoration: none
  font-size: 0.9em
  margin: 4pt 10pt
  white-space: nowrap

#button:hover
  background-color: #2F880B

#button > b
  font-weight: 600

</style>
