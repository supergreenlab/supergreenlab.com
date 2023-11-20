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
      <LineItem v-for='lineItem in cart' :key='lineItem.sellingPoint.id' :lineItem='lineItem' :alternative='alternative' />
    </div>
    <div v-if='cart.length != 0 && !hasStickers' :id='$style.stickers'>
      <h3>Support SGL by adding these stickers to your cart 💚</h3>
      <ProductItem :location='checkout' :product='stickersProduct' />
    </div>
    <div :id='$style.checkoutbutton'>
      <div v-if='psuDisclaimer' :id='$style.psuDisclaimer'><b>{{ nRequirePSU }} item{{ nRequirePSU > 1 ? 's' : ''}}</b> require a <nuxt-link to='/product/power-supply-24v-6-25a'>PSU</nuxt-link>, <b>you only have {{ nPSUs }} PSUs</b> in your cart, <b>make sure you have enough.</b><br /></div>
      <CheckoutButton :cart='cart' v-model='promocode' :promocodePrompt='true' @click='startCheckout' :valid='valid' />
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
import ProductItem from '~/components/products/smallproductitem.vue'

import { addEventListener, availHeight, availWidth, screenX } from '~/lib/client-side.js'
import { product } from '~/lib/json_db.js'

export default {
  components: {Header, Footer, LineItem, CheckoutButton, ProductItem,},
  props: ['seller', 'alternative',],
  destroyed() {
    if (this.timeout) clearTimeout(this.timeout)
  },
  methods: {
    startCheckout() {
      if (!this.valid) {
        return
      }
      const width = 800
      const { seller } = this.$props
      open(`/checkout/${seller.slug}`, '_blank', `width=${width},height=${availHeight()-100},top=100,left=${screenX() + availWidth()/2 - width/2}`)
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
        const sglSellerIDs = [process.env.sglSellerID, process.env.sgteuSellerID, process.env.sgtusSellerID]
        const { seller } = this.$props
        if (sglSellerIDs.includes(seller.id)) {
          sglSellerIDs.forEach(sglSellerID => this.$store.commit('checkout/setPromocode', { sellerid: sglSellerID, promocode: value }))
        } else {
          this.$store.commit('checkout/setPromocode', { sellerid: seller.id, promocode: value })
        }
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          if (sglSellerIDs.includes(seller.id)) {
            sglSellerIDs.forEach(sglSellerID => this.$store.dispatch('checkout/fetchPromocode', { sellerid: sglSellerID, promocode: value }))
          } else {
            this.$store.dispatch('checkout/fetchPromocode', { sellerid: seller.id, promocode: value })
          }
        }, 400)
      },
    },
    stickersProduct() {
      return product('recA9OzCLgi3JaSIO')
    },
    valid() {
      return this.cart.findIndex(lineItem => lineItem.sellingPoint.outofstock) == -1
    },
    cart() {
      const { seller } = this.$props
      return this.$store.getters['checkout/cart'].filter(lineItem => lineItem.sellingPoint.Seller[0] === seller.id)
    },
    hasStickers() {
      return this.$store.getters['checkout/cart'].find(lineItem => lineItem.product.id == 'recA9OzCLgi3JaSIO')
    },
    nRequirePSU() {
      const lineItems = this.cart
      return lineItems.reduce((acc, li) => acc + (li.product.needspsu ? li.n : 0), 0)
    },
    nPSUs() {
      const lineItems = this.cart
      return lineItems.reduce((acc, li) => acc + (li.product.type.includes('SGL_PSU') ? li.n : 0), 0)
    },
    psuDisclaimer() {
      let nRequirePSU = this.nRequirePSU
      let nPSUs = this.nPSUs
      return nRequirePSU > nPSUs
    },
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
  flex-direction: column
  justify-content: flex-end
  align-self: flex-end

#psuDisclaimer
  max-width: 400px
  margin-bottom: 10px
  color: #454545
  > b
    color: #3bb30b

#stickers
  color: #454545

</style>
