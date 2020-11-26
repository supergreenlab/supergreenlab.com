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
      <div :class='$style.sideDivs'></div>
      CHECK THOSE OUT AT <div :id='$style.logo' :style='{"background-image": `url(${sellerPic})`}'></div>
      <div :class='$style.sideDivs'>
        <CheckBox @click='toggleAll' :checked='checked' />
      </div>
    </div>
    <div :class='$style.lineItems'>
      <LineItem v-for='lineItem in cart' :lineItem='lineItem' />
    </div>
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'
import Footer from '~/components/layout/footer.vue'
import LineItem from '~/components/cart/lineitem.vue'
import CheckoutButton from '~/components/cart/checkoutbutton.vue'
import CheckBox from '~/components/widgets/checkbox.vue'

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
  background-color: #eaeaea
  border-radius: 10pt

.lineItems
  display: flex
  flex-direction: column
  margin: 10pt 30pt

#checkoutbutton
  display: flex
  justify-content: flex-end
  align-self: flex-end

#seller
  display: flex
  align-items: center
  justify-content: center
  margin: 10pt 30pt

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

</style>
