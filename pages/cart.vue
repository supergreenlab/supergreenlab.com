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
    <div :id='$style.header'>
      <Header />
    </div>
    <div :id='$style.body'>
      <CartTitle title='SuperGreenLab Cart' />
      <div :class='$style.carttype'>Those are the items you selected that are directly available on our shop.</div>
      <div :class='$style.lineItems'>
        <div v-for='lineItem in cart'>
          <LineItem :lineItem='lineItem' />
        </div>
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'
import Footer from '~/components/layout/footer.vue'
import CartTitle from '~/components/cart/carttitle.vue'
import LineItem from '~/components/cart/lineitem.vue'

export default {
  components: {Header, Footer, CartTitle, LineItem,},
  computed: {
    valid() {
      return false
    },
    promocode: {
      get() {
        return this.$store.state.checkout.promocode.value
      },
      set(value) {
        this.$store.commit('checkout/updateCheckout', {key: 'promocode', value})
        this.$store.commit('checkout/setDiscount', 0)
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.$store.dispatch('checkout/setPromocode', { code: value }), 400)
      },
    },
    promo() {
      const discount = this.$store.state.checkout.discount.value,
            promocode = this.$store.state.checkout.promocode.value
      if (!promocode || !discount) return {promocode: '', discount: 0}
      return {promocode, discount}
    },
    cart() {
      return this.$store.state.checkout.cart
    },
    totalPrice() {
      return this.$store.getters['checkout/getTotalPrice']
    },
 },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center

#header
  position: fixed
  width: 100%
  top: 0 
  left: 0
  z-index: 1000

#body
  width: 100%
  max-width: 900pt
  padding: 50pt 0 0 0

.lineItems
  display: flex
  flex-direction: column
  margin: 30pt

.carttype
  margin: 30pt

</style>
