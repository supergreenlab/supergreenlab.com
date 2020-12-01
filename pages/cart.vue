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
      <Title title='SuperGreenLab Cart' />
      <div :class='$style.carttype'>Those are the items you selected that are directly available on our shop.</div>
      <SGLCart />
      <Title title='Checklist Cart' />
      <div :class='$style.carttype'>Those are the items you selected that are directly available on our shop.</div>
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
import Header from '~/components/layout/header.vue'
import Footer from '~/components/layout/footer.vue'
import Title from '~/components/cart/title.vue'
import SGLCart from '~/components/cart/sglcart.vue'
import TierCart from '~/components/cart/tiercart.vue'

export default {
  components: {Header, Footer, Title, SGLCart, TierCart},
  computed: {
    tierSellers() {
      const deduplicate = {}
      return this.$store.state.checkout.cart.filter(lineItem => lineItem.sellingPoint.Seller[0] !== 'recT9nIg4ahFv9J29').map(lineItem => this.$store.getters['eshop/seller'](lineItem.sellingPoint.Seller[0])).filter(seller => {
        if (deduplicate[seller.id]) {
          return false
        }
        deduplicate[seller.id] = true
        return true
      })
    }
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
  padding: 100pt 0 0 0

.carttype
  margin: 10pt 30pt

.tiercart
  margin: 0 5pt

#noseller
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center
  padding: 20pt 0
  font-size: 1.1em

</style>
