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
      <Bundle nobottom='true' v-bind='bundle' />
      <Title icon='package.svg' title='PACKAGE CONTENT' />
      <Item v-if='bundle.bigleds' :n='bundle.bigleds' v-bind='led("192")' />
      <Item v-if='bundle.smallleds' :n='bundle.smallleds' v-bind='led("144")' />
      <Item v-if='bundle.tinyleds' :n='bundle.tinyleds' v-bind='led("36")' />
      <Item v-if='bundle.ventilation' :n='bundle.ventilation' v-bind='accessory("blower")' />
      <Item v-if='bundle.sensor' :n='bundle.sensor' v-bind='accessory("sensor")' />
      <Item n='1' v-bind='accessory("controller")' />
      <!--<Title icon='world.svg' title='SHIPPING INFORMATIONS' />
      <Shipping />-->
      <div :id='$style.buy'>
        <a href='javascript:void(0)' @click='buy'>PAY NOW <b>${{ bundle.price }}</b></a><br />
        Free shipping
      </div>
    </div>
  </section>
</template>

<script>
import Header from '~/components/header.vue'
import Bundle from '~/components/homesection-bundle.vue'
import Item from '~/components/bundle-item.vue'
import Title from '~/components/bundle-title.vue'
import Shipping from '~/components/shipping-form.vue'

import { bundles, leds, accessories } from '~/config.json'

export default {
  components: {Header, Bundle, Title, Item, Shipping,},
  computed: {
    bundle() {
      const { slug } = this.$route.params
      return bundles.find((b) => b.slug == slug)
    },
    led() {
      return (slug) => leds.find((l) => l.slug == slug)
    },
    accessory() {
      return (slug) => accessories.find((a) => a.slug == slug)
    },
  },
  methods: {
    buy() {
      window.location.href = this.bundle.url
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
  justify-content: flex-end
  text-align: right
  margin: 20pt 0
  @media only screen and (max-width: 600px)
    margin-top: 30pt

#buy > a
  display: block
  align-self: flex-end
  background-color: #3BB30B
  padding: 8pt 25pt
  border-radius: 5pt
  color: white
  text-decoration: none

#buy > a:hover
  background-color: #2F880B

#buy > a > b
  font-weight: 600

</style>
