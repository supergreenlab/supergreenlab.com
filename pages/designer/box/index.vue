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
      <Box v-for='(box, i) in boxes' :key='i' :box='box' :i='i' :visible='i == 0 || boxes[i].leds || boxes[i - 1].leds' />
    </div>
    <div :id='$style.submitform'>
      <!--Got a promo code ?
      <input :id='$style.promocode' type='text' v-model='promo' placeholder='Enter your promocode here.' />-->
      <a v-on:click='createCart()' :id='$style.cta' :class='!valid ? $style.disabled : $style.enabled' href='javascript:void(0)'>checkout</a>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/logo.vue'
import Box from '~/components/box.vue'

export default {
  components: { Logo, Box, },
  data() {
    return {
      promo: '',
    }
  },
  computed: {
    boxes() {
      return this.$store.state.boxes.boxes
    },
    valid() {
      return this.$store.state.boxes.boxes.findIndex((b) => !!b.leds) != -1
    },
  },
  methods: {
    createCart() {
      if (!this.valid) {
        return
      }
      const url_cart = this.$store.state.boxes.boxes.filter(b => b.leds).map((b) => `${b.leds.ids[b.color]}:${b.leds.n}`).join(',')
      window.location.href=`https://shop.supergreenlab.com/cart/${url_cart}`
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

#body
  padding: 0 30pt 0 30pt
  width: 100%
  max-width: 600pt

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

</style>
