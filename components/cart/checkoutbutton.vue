<!--
      Copyright (C) 2020  SuperGreenLab <towelie@supergreenlab.com>
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
    <div :id='$style.buy'>
      <div :id='$style.promocode' v-if='promocodePrompt'>
        <TextInput label='SGL Promo code' v-model='code' name='promocode' optional='true' />
      </div>
      <a :id='$style.buybutton' :class='!valid ? $style.invalid : $style.valid' href='javascript:void(0)' @click='$emit("click")'>PAY NOW <b>{{ price }}</b></a>
      <div :class='$style.block'>
        <img src='~assets/img/powered-by-stripe.png' /><br />
      </div>
      <div :class='$style.block'>
        <img src='~assets/img/paypal.png'>
      </div>
    </div>
  </section>
</template>

<script>
import TextInput from '~/components/shipping/text.vue'

export default {
  components: { TextInput, },
  props: ['valid', 'cart', 'value', 'promocodePrompt',],
  computed: {
    code: {
      get() {
        return this.$props.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    price() {
      const { cart } = this.$props
      if (cart.length == 0) return 0
      return this.$store.getters['checkout/lineItemsPrice'](cart)
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  justify-content: flex-end

#buybutton
  display: block
  background-color: #3BB30B
  padding: 8pt 25pt
  margin: 5pt 0 0 0
  border-radius: 5pt
  color: white
  text-decoration: none
  text-align: center
  font-weight: 500

#buybutton > b
  font-weight: 600

#promocode
  text-align: left

.block
  display: flex

.block > img
  max-width: 200pt
  @media only screen and (max-width: 600px)
    max-width: 150pt

.blockicon
  width: 20pt
  height: 20pt
  margin: 5pt

.invalid
  opacity: 0.6
  cursor: default !important

.valid:hover
  background-color: #2F880B

</style>
