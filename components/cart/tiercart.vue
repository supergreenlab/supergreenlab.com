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
    <div :id='$style.seller'>
      CHECK THOSE OUT AT <div :id='$style.logo' :style='{"background-image": `url(${sellerPic})`}'></div>
    </div>
    <div :id='$style.lineItems'>
      <LineItem :key='lineItem.sellingPoint.id' v-for='lineItem in cart' :lineItem='lineItem' :showCheckbox=true :showProductLink=true />
    </div>
    <div :id='$style.checkout' v-if='isAmazonCart'>
      <CheckBox @click='toggleAll' :checked='checked' label='Mark all as bought' />
      This will open {{ seller.url.replace('https://www.', '') }} with a pre-filled shopping cart
      <a :id='$style.button' :href='amazonCartUrl' target='_blank'><b>AMAZON CART - {{ priceConv(totalPrice) }}</b></a><br />
    </div>
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'
import Footer from '~/components/layout/footer.vue'
import LineItem from '~/components/cart/lineitem.vue'
import CheckoutButton from '~/components/cart/checkoutbutton.vue'
import CheckBox from '~/components/widgets/checkbox.vue'

import priceConv from '~/lib/price.js'

export default {
  props: ['seller'],
  components: {Header, Footer, LineItem, CheckoutButton, CheckBox,},
  destroyed() {
    if (this.timeout) clearTimeout(this.timeout)
  },
  methods: {
    toggleAll() {
      const checked = this.checked
      this.cart.forEach(lineItem => this.$store.commit('checkout/checkLineItem', { lineItem, checked: !checked }))
    },
    priceConv(dols) {
      return priceConv(dols)
    },
  },
  computed: {
    cart() {
      const { seller } = this.$props
      return this.$store.state.checkout.cart.filter(li => li.sellingPoint.Seller[0] === seller.id)
    },
    totalPrice() {
      return this.$store.getters['checkout/getTotalPrice']
    },
    sellerPic() {
      const { seller } = this.$props
      return require(`~/assets/img/${seller.logo[0].fileLarge}`)
    },
    checked() {
      return this.cart.every(li => li.checked)
    },
    totalPrice() {
      return this.cart.reduce((t, lineItem) => t + lineItem.n * lineItem.sellingPoint.price, 0)
    },
    isAmazonCart() {
      const { seller } = this.$props
      return seller.type.includes('amazon')
    },
    amazonCartUrl() {
      const { seller } = this.$props
      let url = `${seller.url}/gp/aws/cart/add.html`
      return url + this.cart.reduce((acc, lineItem, i) => {
        const asin = new URL(lineItem.sellingPoint.url).pathname.split('/').filter(p => !!p).pop()
        return acc += `${acc ? '&' : '?'}ASIN.${i+1}=${asin}&Quantity.${i+1}=${lineItem.n}`
      }, '')
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
  background-color: #eaeaea
  border-radius: 10pt

#lineItems
  display: flex
  flex-direction: column
  margin: 10pt 30pt
  @media only screen and (max-width: 600pt)
    margin: 5pt 15pt

#checkoutbutton
  display: flex
  justify-content: flex-end
  align-self: flex-end

#seller
  display: flex
  align-items: center
  justify-content: center
  margin: 10pt 30pt
  @media only screen and (max-width: 600pt)
    flex-direction: column

#logo
  width: 100pt
  height: 30pt
  margin: 0 10pt
  background-position: left
  background-size: contain
  background-repeat: no-repeat

.sideDivs
  flex: 1
  display: flex
  justify-content: flex-end

#checkout
  display: flex
  flex-direction: column
  align-items: flex-end
  margin: 0 30pt 20pt 0
  @media only screen and (max-width: 600pt)
    margin: 0 10pt 5pt 0

#button
  display: block
  align-self: flex-end
  background-color: #3BB30B
  padding: 8pt 25pt
  border-radius: 5pt
  color: white
  text-decoration: none
  font-size: 1.2em
  margin: 4pt 0
  @media only screen and (max-width: 600pt)
    padding: 6pt 20pt
    font-size: 1.1em

#container.small > #button
  padding: 6pt 18pt
  font-size: 1em
  border-radius: 4pt

#button:hover
  background-color: #2F880B

#button > b
  font-weight: 600

</style>
