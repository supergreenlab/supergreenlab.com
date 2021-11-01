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
    <Header />
    <div :id='$style.body'>
      <div :id='$style.sharecart'>
        <a v-if='!shared' href='javascript:void(0)' @click='exportCart'><img src='~/assets/img/icon_share.svg' />share this cart</a>
        <div v-else>Cart URL copied to clipboard!</div>
      </div>
      <Title title='SuperGreenLab Cart' />
      <div :class='$style.carttype'>Those are the items you selected that are directly available on our shop.</div>
      <ShopifyCart v-for='seller in shopifySellers' :seller='seller' :key='seller.id' />
      <div :id='$style.space'></div>
      <Title title='Checklist Cart' />
      <div :class='$style.carttype'>Those are the items you selected that are available in other shops.</div>
      <div v-if='tierSellers.length != 0'>
        <div :class='$style.tiercart' v-for='seller in tierSellers' :key='seller.id'>
          <TierCart :seller='seller' />
        </div>
      </div>
      <div v-else :id='$style.noseller'>
        Empty checklist cart
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import md5 from 'blueimp-md5'

import Header from '~/components/layout/header.vue'
import Footer from '~/components/layout/footer.vue'
import Title from '~/components/cart/title.vue'
import ShopifyCart from '~/components/cart/shopifycart.vue'
import TierCart from '~/components/cart/tiercart.vue'

import { baseUrl } from '~/lib/client-side.js'
import { seller, } from '~/lib/json_db.js'

const isShopify = (s) => {
  try {
    s = seller(s)
    return s.type == 'shopify' && s.params.shopify && s.params.shopify.token
  } catch(e) {
    return false
  }
}

export default {
  head() {
    return {
      title: 'SuperGreenLab - Automated LED Grow Lights for ninja growers',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Ultimate grow shop and guides for home growing stealth grow boxes building. Build your own connected grow box with our app and our complete bundle for DIY furniture-as-a-growbox: automated and controlled with an app. Comes with light, ventilation, and sensors (temp and RH).'
        },
      ],
    }
  },
  components: {Header, Footer, Title, ShopifyCart, TierCart},
  data() {
    return {
      shared: false
    }
  },
  computed: {
    shopifySellers() {
      return this.$store.getters['checkout/cart'].filter(li => isShopify(li.sellingPoint.Seller[0])).map(li => seller(li.sellingPoint.Seller[0])).filter((o, i, a) => a.indexOf(o) == i)
    },
    tierSellers() {
      return this.$store.getters['checkout/cart'].filter(li => !isShopify(li.sellingPoint.Seller[0])).map(li => seller(li.sellingPoint.Seller[0])).filter((o, i, a) => a.indexOf(o) == i)
    }
  },
  methods: {
    async exportCart() {
      const cart = this.$store.state.checkout.cart
      const cartData = btoa(cart.map(li => `${li.n};${li.product};${li.sellingPoint}`).join('|'))
      const url = `${baseUrl}/c?d=${cartData}`
      await navigator.clipboard.writeText(url)
      this.$data.shared = true
      setTimeout(() => this.$data.shared = false, 1000)
      this.$analytics.trackEvent('cart', 'share', md5(cartData))
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

#body
  width: 100%
  max-width: 900pt
  padding: 100pt 15pt 0 15pt
  @media only screen and (max-width: 600pt)
    padding: 100pt 5pt 0 5pt

#sharecart
  display: flex
  height: 15pt
  justify-content: flex-end
  color: #454545
  font-size: 1.1em

#sharecart a
  display: flex
  align-items: center
  justify-content: center
  color: #454545
  text-decoration: none

#sharecart a:hover
  text-decoration: underline

#sharecart img
  width: 15pt
  margin-right: 5pt

.carttype
  color: #454545
  margin: 10pt 30pt

.tiercart
  margin: 0 5pt 30pt 0

#noseller
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center
  padding: 20pt 0
  font-size: 1.1em
  color: #454545

#space
  height: 40pt

</style>
