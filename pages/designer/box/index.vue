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
        <h1>Welcome to the grow box designer, this tool will <b>help you pick the right bundle for the job.</b></h1>
        <p>
          We'll start by the <b>main box.</b><br /><br />
          And then the <b>veg box</b>, which is optionnal, but allows to <b>double the frequency of your harvests</b>, so you can avoid having too much at once, but still have <b>continuous supply</b>.<br />
          You can easily have one veg box for two Main boxes.
        </p>
        <br />
        <p :id='$style.shippinginfos'>
          <b>Free shipping</b> in us/ca/eu <b>from $179</b><br />
          <b>Free shipping from $279</b> worldwide
        </p>
      </div>
      <div :class='$style.separator'></div>
      <h2>Light system</h2>
      <Box v-for='(box, i) in boxes' :key='i' :box='box' :i='i' :visible='i == 0 || boxes[i].leds || (boxes[i - 1].leds && boxes[i - 1].main)' :main='box.main' />
      <div v-if='this.nBoxes != 0' :id='$style.total' :class='$style.subtotal'>
        <h4>Lighting price:</h4>
        <div :id='$style.price'>
          <span>${{ this.ledprice.price }}</span>${{ this.ledprice.realprice }}
          <h2 :class='$style.freeshipping' v-if='this.totalprice.realprice > 279'>FREE SHIPPING 🚀 !</h2>
          <h2 :class='$style.freeshipping' v-else-if='this.totalprice.realprice > 179'>FREE SHIPPING 🚀 (US/CA/EU) !</h2>
        </div>
        <div :class='$style.separator'></div>
      </div>
      <div v-else :class='$style.separator'></div>

      <div v-if='this.nBoxes != 0' :id='$style.accessorieschoice'>
        <CheckBox :color='controller ? "#3AB20B" : "#C4C4C4"' :checked='controller' v-on:click='setController(true)' /><h2 v-on:click='setController(true)' :class='controller ? $style.selected : ""'>With controller</h2>
        <CheckBox :color='!controller ? "#3AB20B" : "#C4C4C4"' :checked='!controller' v-on:click='setController(false)' /><h2 v-on:click='setController(false)' :class='!controller ? $style.selected : ""'>Without controller</h2>
      </div>
      <div v-if='controller && this.nBoxes != 0' :id='$style.accessories'>
        <h2>Controller bundle</h2>
        <div :id='$style.controllerpack'>
          <ControllerPackItem icon='controller.png' name='Controller' n='1' price='99' />
          <ControllerPackItem icon='power.png' name='Power Supply' n='1' price='0' free='1' />
          <ControllerPackItem icon='sht21.png' name='Temperature and humidity sensor' :n='(this.nMainBoxes == 0 && this.nVegBoxes != 0) ? this.nVegBoxes : this.nMainBoxes' :price='24.99' />
          <ControllerPackItem icon='blower.png' name='Main box ventilation' :n='(this.nMainBoxes == 0 && this.nVegBoxes != 0) ? this.nVegBoxes : this.nMainBoxes' :price='29' />
          <ControllerPackItem v-if='this.nVegBoxes > 0 && this.nMainBoxes > 0' icon='fan.png' name='Veg box ventilation' :n='this.nVegBoxes' :price='15' />
        </div>
        <div v-if='this.nBoxes != 0' :id='$style.total' :class='$style.subtotal'>
          <h4>Controller bundle price:</h4>
          <div :id='$style.price'>
            <span>${{ this.controllerprice.price }}</span>${{ this.controllerprice.realprice }}
            <h2 :class='$style.freeshipping' v-if='this.totalprice.realprice > 279'>FREE SHIPPING 🚀 !</h2>
            <h2 :class='$style.freeshipping' v-else-if='this.totalprice.realprice > 179'>FREE SHIPPING 🚀 (US/CA/EU) !</h2>
          </div>
          <div :class='$style.separator'></div>
        </div>
      </div>
      <div v-if='this.nBoxes != 0' :id='$style.total'>
        <h1>Total:</h1>
        <div :id='$style.price'>
          <span>${{ this.totalprice.price }}</span>${{ this.totalprice.realprice }}
          <h2 :class='$style.freeshipping' v-if='this.totalprice.realprice > 279'>FREE SHIPPING 🚀 !</h2>
          <h2 :class='$style.freeshipping' v-else-if='this.totalprice.realprice > 179'>FREE SHIPPING 🚀 (US/CA/EU) !</h2>
        </div>
      </div>
    </div>
    <div :id='$style.submitform'>
      <!--Got a promo code ?
      <input :id='$style.promocode' type='text' v-model='promo' placeholder='Enter your promocode here.' />-->
      <div v-if='!this.controller && this.nVegBoxes != 0' :id='$style.disclaimer'>
        Oops looks like you picked veg lights (36 and 72) without the controller, that's not possible yet.<br />
        Head to the <a href='https://www.supergreenlab.com/discord'>discord server</a> and ask for it if you want power-supplied veg lights !<br />
        <b>Remove the veg box before going to the cart</b> or <a href='javascript:void(0)' v-on:click='setController(true)'><b>add a controller</b></a>.
      </div>
      <a v-on:click='createCart()' :id='$style.cta' :class='`${!valid ? $style.disabled : $style.enabled} ${loading_cart ? $style.loading : ""}`' href='javascript:void(0)'>
        {{ loading_cart ? "Please wait" : "checkout" }}
      </a>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/logo.vue'
import Box from '~/components/box.vue'
import CheckBox from '~/components/checkbox.vue'
import ControllerPackItem from '~/components/controllerpackitem.vue'

const roundPrices = (p) => ({
  price: Math.round(p.price * 100) / 100,
  realprice: Math.round(p.realprice * 100) / 100,
})

export default {
  components: { Logo, Box, ControllerPackItem, CheckBox, },
  data() {
    return {
      promo: '',
      loading_cart: false,
    }
  },
  computed: {
    controller() {
      return this.$store.state.boxes.controller
    },
    boxes() {
      return this.$store.state.boxes.boxes
    },
    valid() {
      if (this.$store.state.boxes.boxes.findIndex((b) => !!b.leds) == -1) {
        return false
      }
      if (!this.controller && this.nVegBoxes != 0) {
        return false
      }
      return true
    },
    controllerprice() {
      const controllerpacks = [0, 149, 179]
      let nMainBoxes = this.nMainBoxes,
          nVegBoxes = this.nVegBoxes
      if (nMainBoxes == 0 && nVegBoxes == 1) {
        nMainBoxes = 1
        nVegBoxes = 0
      }
      return roundPrices({
        price: 119 + (24.99 * nMainBoxes) + (29 * nMainBoxes) + 22.99 * nVegBoxes,
        realprice: controllerpacks[Math.min(2, nMainBoxes)] + 15 * nVegBoxes,
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
      if (this.controller) {
        return roundPrices({
          price: this.controllerprice.price + this.ledprice.price,
          realprice: this.controllerprice.realprice + this.ledprice.realprice,
        })
      }
      return this.ledprice
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
      let cart_url = 'https://shop.supergreenlab.com/pages/loading-cart'
      const led_cart = this.$store.state.boxes.boxes.filter(b => b.leds).map((b) => `${b.leds.ids[b.color]}:${b.leds.n}`).join(',')

      if (this.controller) {
        const controllerpacks = [
          [0, '23013022826544', '23015235289136'], // without veg fan
          [0, '23015231127600', '23015235321904'], // with
        ]
        let nMainBoxes = this.nMainBoxes,
          nVegBoxes = this.nVegBoxes
        if (nMainBoxes == 0 && nVegBoxes == 1) {
          nMainBoxes = 1
          nVegBoxes = 0
        }

        const controller_cart = `${controllerpacks[nVegBoxes][Math.min(2, nMainBoxes)]}:1`
        cart_url = `${cart_url}#${led_cart},${controller_cart}`
      } else {
        cart_url = `${cart_url}#${led_cart}`
      }
      window.location.href = cart_url
    },
    setController(controller) {
      this.$store.commit('boxes/controller', {controller})
    }
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
  padding: 50pt 0 20pt 0
  font-weight: 300
  @media only screen and (max-width: 500px)
    padding: 0pt 0

#intro > h1
  font-weight: 300
  margin: 20pt 0 60pt 0

#intro > h2
  margin: 40pt 0 40pt 0
  @media only screen and (max-width: 500px)
    margin: 20pt 0 20pt 0

#shippinginfos
  font-size: 1.2em

#shippinginfos > b
  color: #3bb30b
  animation: blinker 1s linear infinite;

#controllerpack
  display: flex
  flex-wrap: wrap

#body
  padding: 0 30pt
  width: 100%
  max-width: 600pt
  @media only screen and (max-width: 500px)
    padding: 0 10pt

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

.separator
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
  margin-bottom: 30pt
  @media only screen and (max-width: 500px)
    padding-bottom: 5pt
    margin-bottom: 10pt

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

#accessorieschoice
  display: flex
  margin 0pt 0 40pt 0

#accessorieschoice > h2
  margin: 0 10pt 0 0
  cursor: pointer
  opacity: 0.3
  transform: scale(0.98)
  transition: transform 0.2s

#accessorieschoice > h2:hover
  opacity: 0.5

#accessorieschoice > h2 > small
  font-size: 0.8em
  font-weight: 300

#accessorieschoice > .selected
  transform: scale(1)
  opacity: 1 !important

#disclaimer
  color: #EA1E1E
  text-align: center

@keyframes blinker {
  50% {
    opacity: 0.4;
  }
}

.freeshipping
  color: #2C800B
  font-size: 1.2em
  font-weight: 600
  animation: blinker 1s linear infinite;

</style>
