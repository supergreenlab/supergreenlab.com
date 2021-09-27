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
  <section v-if='cart.length != 0' :id='$style.container'>
    <div :class='$style.lineItems'>
      <LineItem v-for='lineItem in cart' :key='lineItem.sellingPoint.id' :lineItem='lineItem' />
    </div>
    <div :id='$style.checkoutbutton'>
      <CheckoutButton :cart='cart' v-model='promocode' :promocodePrompt='true' @click='valid ? startCheckout : undefined' :valid='valid' />
    </div>
  </section>
  <section v-else :id='$style.emptycontainer'>
    Empty cart
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'
import Footer from '~/components/layout/footer.vue'
import LineItem from '~/components/cart/lineitem.vue'
import CheckoutButton from '~/components/cart/checkoutbutton.vue'

import { addEventListener, availHeight, availWidth, screenX } from '~/lib/client-side.js'

export default {
  components: {Header, Footer, LineItem, CheckoutButton,},
  props: ['seller',],
  destroyed() {
    if (this.timeout) clearTimeout(this.timeout)
  },
  methods: {
    startCheckout() {
      const width = 800
      const { seller } = this.$props
      open(`/checkout/${seller.id}`, '_blank', `width=${width},height=${availHeight()-100},top=100,left=${screenX() + availWidth()/2 - width/2}`)
      addEventListener('message', (event) => {
        if (event.data == 'sglcheckoutdone') {
          this.cart.forEach(lineItem => {
            this.$store.commit('checkout/addToCart', Object.assign({}, lineItem, { n: 0 }))
          })
        }
      })
    }
  },
  computed: {
    promocode: {
      get() {
        const { seller } = this.$props
        return this.$store.state.checkout.promocodes[seller.id]
      },
      set(value) {
        const { seller } = this.$props
        this.$store.commit('checkout/setPromocode', { sellerid: seller.id, promocode: value })
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.$store.dispatch('checkout/fetchPromocode', { sellerid: seller.id, promocode: value }), 400)
      },
    },
    valid() {
      return this.cart.findIndex(lineItem => lineItem.sellingPoint.outofstock) == -1
    },
    promoDiscount() {
      return this.$store.getters['checkout/promoDiscount']
    },
    cart() {
      const { seller } = this.$props
      return this.$store.getters['checkout/cart'].filter(lineItem => lineItem.sellingPoint.Seller[0] === seller.id)
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

#emptycontainer
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center
  padding: 20pt 0
  font-size: 1.1em

.lineItems
  display: flex
  flex-direction: column
  margin: 10pt 30pt
  @media only screen and (max-width: 600pt)
    margin: 5pt 5pt

#checkoutbutton
  display: flex
  justify-content: flex-end
  align-self: flex-end

</style>
