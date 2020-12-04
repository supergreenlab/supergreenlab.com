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
      <div :id='$style.shipdisclaimer'>
        <b>NORMAL SHIPPING IS BACK!</b><br /><br />
        The loooooong wait is over! We're now shipping worlwide, 24h after you order.<br /><br />
        <h4>Thanks for your support:)</h4>
      </div>
      <div>
        <div :id='$style.cart'>
          <b>Items in your cart</b>
          <div :id='$style.items'>
            <div :class='$style.item' v-for='lineItem in cart' :key='lineItem.sellingPoint.id'><img :src='require(`~/assets/img/${brandProduct(lineItem).pics[0].fileSmall}`)'/>x{{ lineItem.n }}</div>
            <div :id='$style.separator'></div>
            <Price :lineItems='cart' :small=true />
          </div>
        </div>
        <Shipping />
        <CheckoutButton :valid='valid' :cart='cart' @click='goToPaiement' />
      </div>
    </div>
    <Footer />
    <div :id='$style.loading' v-if='loading'>
      <div :id='$style.loadingcontainer'>
        <Loading label='Preparing your order, please wait' />
      </div>
    </div>
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'
import Shipping from '~/components/shipping/form.vue'
import Loading from '~/components/widgets/loading.vue'
import Footer from '~/components/layout/footer.vue'
import OutOfStock from '~/components/products/outofstock.vue'
import CheckoutButton from '~/components/cart/checkoutbutton.vue'
import Price from '~/components/products/price.vue'

import { createCheckout, setShippingAddress, applyCoupon, applyShipping,} from '~/lib/storefront.js'

const SGL_SELLER = 'recT9nIg4ahFv9J29'

export default {
  components: {Header, Shipping, Loading, Footer, OutOfStock, CheckoutButton, Price},
  data() {
    return {
      loading: false,
      showPreOrderForm: false,
    }
  },
  destroyed() {
    if (this.timeout) clearTimeout(this.timeout)
  },
  methods: {
    async goToPaiement() {
      if (!this.valid) return
      //this.$matomo && this.$matomo.trackEvent('shipping-form', 'buypressed', this.$route.params.slug, Math.floor((this.bundle.price - this.bundle.price*this.promo.discount/100) * 100) / 100)
      this.$data.loading = true
      const { shopify } = this.$store.getters['eshop/seller'](SGL_SELLER).params
      const cart = this.cart.map(lineItem => ({id: `gid://shopify/ProductVariant/${lineItem.sellingPoint.params.shopify.shopifyid}`, n: lineItem.n}))
      console.log(cart)
      const checkout = await createCheckout(shopify, this.$store.state.shipping.email.value, cart)
      console.log(checkout)
      await setShippingAddress(shopify, checkout, this.$store.state.shipping)
      if (this.$store.state.checkout.promocode) {
        await applyCoupon(shopify, checkout, this.$store.state.checkout.promocode.value)
      }
      await applyShipping(shopify, checkout)
      setTimeout(() => {
        window.opener.postMessage('sglcheckoutdone', '*')
        window.location.href = checkout.webUrl
      }, 1000)
    }
  },
  computed: {
    brandProduct() {
      return (lineItem) => this.$store.getters['eshop/brandProduct'](lineItem.sellingPoint.BrandProduct[0])
    },
    valid() {
      return this.cart.every(lineItem => lineItem.sellingPoint.canorder) && Object.keys(this.$store.state.checkout).findIndex((k) => typeof this.$store.state.checkout[k].value !== 'undefined' && !this.$store.state.checkout[k].value && !this.$store.state.checkout[k].optional) == -1
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
    promoDiscount() {
      return this.$store.getters['checkout/promoDiscount']
    },
    cart() {
      return this.$store.state.checkout.cart.filter(lineItem => lineItem.sellingPoint.Seller[0] === SGL_SELLER)
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
  padding: 0 40pt

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

#buy
  display: flex
  flex-direction: column
  align-items: flex-end
  justify-content: flex-end
  text-align: right
  margin: 40pt 50pt 20pt 0
  @media only screen and (max-width: 600px)
    margin: 30pt 10pt 20pt 0

#loading
  display: flex
  align-items: center
  justify-content: center
  position: fixed
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  background-color: rgba(255, 255, 255, 0.6)
  z-index: 1000

#loadingcontainer
  position: relative
  width: 200pt
  height: 100pt

.invalid
  opacity: 0.6
  cursor: default !important

.valid:hover
  background-color: #2F880B

#shipdisclaimer
  background-color: #f2f2f2
  padding: 20pt 15pt
  color: #717171
  font-size: 1.2em
  text-align: center

#shipdisclaimer > b
  color: #3BB30B

#shipdisclaimer > h4
  text-align: center;

#shipdisclaimer > a
  color: #717171

#shipdisclaimer > a:hover
  color: #3BB30B

#cart
  margin: 0 50pt
  padding: 10pt
  border: 1pt solid #dedede
  border-radius: 5pt
  @media only screen and (max-width: 600px)
    margin: 0 5pt

#items
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-items: center
  padding: 4pt 0

.item
  margin: 5pt

#separator
  flex: 1
  @media only screen and (max-width: 600px)
    display: none

</style>
