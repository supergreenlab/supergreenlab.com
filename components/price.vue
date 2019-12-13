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
    <div v-if='promodiscount' :id='$style.pricecontainer'>
      <div :class='$style.price + " " + $style.smallprice'>
        <h1>{{ priceConv(price) }}
          <div :id='$style.redbar'></div>
        </h1>
      </div>
      <div :class='$style.price'>
        <h1>{{ priceConv(price - price * promodiscountdef / 100) }}</h1><br />
        <small>incl.tax<span v-if='freeshipping'> + <b>FREE SHIPPING*</b></span></small>
        <span>promocode: <b>-{{ promodiscountdef }}%</b></span>
      </div>
    </div>
    <div v-else :class='$style.price'>
      <h1>{{ priceConv(price - price*promodiscountdef/100) }}</h1>
      <small>incl. tax<span v-if='freeshipping'> + <b>FREE SHIPPING*</b></span></small>
    </div>
  </section>
</template>

<script>
import priceConv from '~/lib/price.js'

export default {
  props: ['price', 'promodiscount', 'freeshipping',],
  methods: {
    priceConv(dols) {
      return priceConv(dols)
    },
  },
  computed: {
    promodiscountdef() {
      return this.$props.promodiscount || 0
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex

#pricecontainer
  display: flex
  flex: 1
  justify-content: flex-end
  margin: 10pt 10pt 15pt 0
  color: #454545
  @media only screen and (max-width: 600px)
    flex-direction: column
    font-size: 0.8em
    margin: 0

.price
  position: relative
  display: flex
  flex-direction: column
  justify-content: center

.smallprice
  margin: 0 10pt 10pt 10pt
  font-size: 0.8em
  @media only screen and (max-width: 600px)
    margin: 0

.price > h1
  position: relative
  margin-bottom: 0
  color: #3BB30B
  @media only screen and (max-width: 600px)
    margin-top: 4pt

.price > small
  color: #717171

.smallprice > h1
  color: #787878

#redbar
  width: 50%
  height: 2pt
  top: 40%
  left: 25%
  transform: rotate(-30deg)
  position: absolute
  background-color: #FF0000

</style>
