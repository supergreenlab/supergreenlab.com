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
    <div :id='$style.logo'>
      <Logo subtitle='Growbox Designer' />
    </div>
    <div :id='$style.body'>
      <div :id='$style.intro'>
        <h2>Growbox designer</h2>
        <p>
          We'll start by the main boxes.<br /><br />
            And then the veg box, which is optionnal, but allows to double the frequency of your harvests, so you can avoid having too much at once, but still have continuous supply.<br />
          You can easily have one veg box for two Main boxes.
        </p>
      </div>
      <div :id='$style.separator'></div>
      <h2>Light system</h2>
      <Box v-for='(box, i) in boxes' :key='i' :box='box' :i='i' :visible='i == 0 || boxes[i].leds || (boxes[i - 1].leds && boxes[i - 1].main)' :main='box.main' />
      <div v-if='this.nBoxes != 0' :id='$style.total' :class='$style.subtotal'>
        <h4>Lighting price:</h4>
        <div :id='$style.price'>
          <span>${{ this.ledprice.price }}</span>${{ this.ledprice.realprice }}
        </div>
      </div>

      <h2>Controller bundle</h2>
      <div :id='$style.controllerpack'>
        <ControllerPackItem icon='controller.png' name='Controller' n='1' price='99' />
        <ControllerPackItem icon='power.png' name='Power Supply' n='1' price='0' free='1' />
        <ControllerPackItem icon='sht21.png' name='Temperature and humidity sensor' :n='this.nMainBoxes' :price='24.99' />
        <ControllerPackItem icon='blower.png' name='Main box ventilation' :n='this.nMainBoxes' :price='29' />
        <ControllerPackItem v-if='this.nVegBoxes > 0' icon='fan.png' name='Veg box ventilation' :n='this.nVegBoxes' :price='24.99' />
      </div>
      <div v-if='this.nBoxes != 0' :id='$style.total' :class='$style.subtotal'>
        <h4>Controller bundle price:</h4>
        <div :id='$style.price'>
          <span>${{ this.controllerprice.price }}</span>${{ this.controllerprice.realprice }}
        </div>
      </div>
      <div :id='$style.total'>
        <h1>Total:</h1>
        <div :id='$style.price'>
          <span>${{ this.totalprice.price }}</span>${{ this.totalprice.realprice }}
        </div>
      </div>
    </div>
    <div :id='$style.submitform'>
      <!--Got a promo code ?
      <input :id='$style.promocode' type='text' v-model='promo' placeholder='Enter your promocode here.' />-->
      <a v-on:click='createCart()' :id='$style.cta' :class='`${!valid ? $style.disabled : $style.enabled} ${loading_cart ? $style.loading : ""}`' href='javascript:void(0)'>
        {{ loading_cart ? "Please wait" : "checkout" }}
      </a>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/logo.vue'
import Box from '~/components/box.vue'
import ControllerPackItem from '~/components/controllerpackitem.vue'

const roundPrices = (p) => ({
  price: Math.round(p.price * 100) / 100,
  realprice: Math.round(p.realprice * 100) / 100,
})

export default {
  components: { Logo, Box, ControllerPackItem, },
  data() {
    return {
      promo: '',
      loading_cart: false,
    }
  },
  computed: {
    boxes() {
      return this.$store.state.boxes.boxes
    },
    valid() {
      return this.$store.state.boxes.boxes.findIndex((b) => !!b.leds) != -1
    },
    controllerprice() {
      const controllerpacks = [0, 129, 159]
      return roundPrices({
        price: 99 + (24.99 * this.nMainBoxes) + (29 * this.nMainBoxes) + 24.99 * this.nVegBoxes,
        realprice: controllerpacks[Math.min(2, this.nMainBoxes)] + 24.99 * this.nVegBoxes,
      })
    },
    ledprice() {
      let promoMain = 1 - Math.min(15, Math.floor(this.nMainBoxLeds / 2) * 5) / 100
      return roundPrices({
        price: this.$store.getters['boxes/ledPrice'](true) + this.$store.getters['boxes/ledPrice'](false),
        realprice: this.$store.getters['boxes/ledPrice'](true) * promoMain + this.$store.getters['boxes/ledPrice'](false) * 0.9,
      })
    },
    totalprice() {
      return roundPrices({
        price: this.controllerprice.price + this.ledprice.price,
        realprice: this.controllerprice.realprice + this.ledprice.realprice,
      })
    },
    nBoxes() {
      return this.nMainBoxes + this.nVegBoxes
    },
    nMainBoxes() {
      return this.$store.getters['boxes/nBoxes'](true)
    },
    nVegBoxes() {
      return this.$store.getters['boxes/nBoxes'](false)
    },
    nMainBoxLeds() {
      return this.$store.getters['boxes/nLeds'](true)
    },
    nVegBoxLeds() {
      return this.$store.getters['boxes/nLeds'](false)
    },
  },
  methods: {
    createCart() {
      if (!this.valid) {
        return
      }
      this.$data.loading_cart = true
      const controllerpacks = [0, '23013022826544', '23015235289136']
      const led_cart = this.$store.state.boxes.boxes.filter(b => b.leds).map((b) => Array(b.leds.n).fill().map(() => `id[]=${b.leds.ids[b.color]}`).join('&')).join('&')
      const controller_cart = `id[]=${controllerpacks[Math.min(2, this.nMainBoxes)]}&quantity[]=1`
      const ventilation_cart = `id[]=22985779314736&quantity[]=${this.nVegBoxes}`
      const cart_url = `https://shop.supergreenlab.com/cart/add/?${led_cart}&${controller_cart}&${ventilation_cart}`
      console.log(cart_url)
      window.location.href = cart_url
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
  min-height: 100vh

#logo
  margin: 5pt
  font-size: 1.5em
  align-self: flex-start

#intro
  padding: 50pt 0
  font-weight: 300

#intro > h2
  margin: 40pt 0 40pt 0

#controllerpack
  display: flex
  flex-wrap: wrap

#body
  padding: 0 30pt 0 30pt
  width: 100%
  max-width: 600pt

#body > h2
  margin: 10pt 0 20pt 0

#cta
  display: flex
  flex-direction: column
  text-transform: uppercase
  color: white
  margin: 20pt 0
  padding: 5pt 35pt
  border-radius: 3pt
  text-decoration: none
  text-align: center
  font-size: 1.2em
  font-weight: 400
  align-self: center

#cta.enabled
  background-color: #3BB30B

#cta.enabled:hover
  background-color: #2C800B
  
.disabled
  opacity: 0.4
  cursor: default

#cta.disabled
  background-color: #c4c4c4

#promocode
  height: 25pt

#submitform
  display: flex
  flex-direction: column
  margin-top: 20pt

#separator
  height: 1pt
  background-color: #EFEFEF
  width: 100%
  margin: 20pt 0

#total
  display: flex
  flex-direction: column
  align-items: flex-end
  justify-content: flex-end
  text-align: right

.subtotal
  font-size: 0.9em
  color: #454545
  border-bottom: 1pt solid #EFEFEF
  padding-bottom: 20pt
  margin-bottom: 30pt

#price
  font-weight: 600
  font-size: 1.5em

#price > span
  font-size: 0.9em
  text-decoration: line-through
  font-weight: 300
  margin-right: 5pt
  opacity: 0.5

.loading
  opacity: 0.5

</style>
