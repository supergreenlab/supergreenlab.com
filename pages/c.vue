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
    <Header />
    <div :id='$style.body'>
      <Title title='Add these items to your cart?' />
      <div v-if='!error' :class='$style.lineItems'>
        <LineItem v-for='(lineItem, i) in cart' :key='lineItem.sellingPoint.id' :lineItem='lineItem' :showCheckbox=true :onDeleteLineItem='() => handleDeleteLineItem(i)' :onChangeLineItem='(n) => handleChangeLineItem(i, n)' :onToggleChecked='() => handleToggleChecked(i)' />
      </div>
      <nuxt-link :id='$style.addtocart' v-if='done' to='/cart'><b>GO TO CART</b></nuxt-link>
      <a :style='{"opacity": activated ? 0.5 : 1}' v-else-if='!error' :id='$style.addtocart' href='javascript:void(0)' @click='addToCart'><b>{{ activated ? "PLEASE WAIT" : (added ? "ITEMS ADDED!" : "ADD THESE TO YOUR CART") }}</b></a>
      <h2 v-if='error'>Ooops looks like something went wrong with this url</h2>
    </div>
    <Footer />
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'
import Footer from '~/components/layout/footer.vue'
import Title from '~/components/cart/title.vue'
import LineItem from '~/components/cart/lineitem.vue'

import Vue from 'vue'

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
  components: {Header, Footer, Title, LineItem,},
  data() {
    return {
      cart: [],
      error: false,
      activated: false,
      added: false,
      done: false
    }
  },
  mounted() {
    const { d: data } = this.$route.query
    try {
      const items = atob(data).split('|').map(i => i.split(';')).map(i => ({
        n: parseInt(i[0]),
        product: this.$store.getters['eshop/product'](i[1]),
        sellingPoint: this.$store.getters['eshop/sellingPointWithID'](i[2]),
        checked: i[3] === 'true',
      }))
      this.$data.cart = items
    } catch(e) {
      this.$data.error = true
    }
  },
  methods: {
    handleDeleteLineItem(i) {
      this.$data.cart.splice(i, 1)
    },
    handleChangeLineItem(i, n) {
      Vue.set(this.$data.cart, i, Object.assign({}, this.$data.cart[i], { n } ))
    },
    handleToggleChecked(i) {
      Vue.set(this.$data.cart, i, Object.assign({}, this.$data.cart[i], { checked: !this.$data.cart[i].checked } ))
    },
    addToCart() {
      if (this.$data.activated) return
      this.$data.activated = true
      this.timeout = setTimeout(() => {
        this.$data.activated = false
        this.$data.added = true
        this.$data.cart.forEach(({ n, product, sellingPoint }) => {
          this.$store.commit('checkout/addToCart', { n, product, sellingPoint, checked: false })
          this.timeout = setTimeout(() => {
            this.$data.done = true
          }, 2000)
        }, 800)
      })
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
  display: flex
  flex-direction: column
  width: 100%
  max-width: 900pt
  padding: 100pt 0 0 0
  @media only screen and (max-width: 600pt)
    padding: 100pt 5pt 0 5pt

.lineItems
  display: flex
  flex-direction: column
  margin: 10pt 30pt
  @media only screen and (max-width: 600pt)
    margin: 5pt 5pt

#addtocart
  align-self: flex-end
  background-color: #3BB30B
  padding: 8pt 25pt
  border-radius: 5pt
  color: white
  text-decoration: none

#addtocart:hover
  background-color: #2F880B

#addtocart > b
  font-weight: 600

</style>
