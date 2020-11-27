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
    <div :class='$style.lineItems'>
      <LineItem v-for='lineItem in cart' :key='lineItem.sellingPoint.id' :lineItem='lineItem' :promoDiscount='promoDiscount' />
    </div>
    <div :id='$style.checkoutbutton'>
      <CheckoutButton :price='totalPrice' v-model='promocode' :promocodePrompt='true' @click='startCheckout' :promoDiscount='promoDiscount' />
    </div>
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'
import Footer from '~/components/layout/footer.vue'
import LineItem from '~/components/cart/lineitem.vue'
import CheckoutButton from '~/components/cart/checkoutbutton.vue'

export default {
  components: {Header, Footer, LineItem, CheckoutButton,},
  destroyed() {
    if (this.timeout) clearTimeout(this.timeout)
  },
  methods: {
    startCheckout() {
      window.open('/sglcheckout', '_blank', 'width=800,height=900')
    }
  },
  computed: {
    promocode: {
      get() {
        return this.$store.state.checkout.promocode.value
      },
      set(value) {
        this.$store.commit('checkout/setPromocode', value)
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.$store.dispatch('checkout/fetchPromocode', { code: value }), 400)
      },
    },
    promoDiscount() {
      return this.$store.getters['checkout/promoDiscount']
    },
    cart() {
      return this.$store.state.checkout.cart.filter(lineItem => lineItem.sellingPoint.Seller[0] === 'recT9nIg4ahFv9J29')
    },
    totalPrice() {
      const price = this.cart.reduce((t, lineItem) => t + lineItem.n * lineItem.sellingPoint.price, 0)
      return price - price * this.promoDiscount.discount / 100
    }
 },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: stretch
  align-items: stretch

.lineItems
  display: flex
  flex-direction: column
  margin: 10pt 30pt
  @media only screen and (max-width: 600pt)
    margin: 5pt 15pt

#checkoutbutton
  display: flex
  justify-content: flex-end
  align-self: flex-end

</style>
