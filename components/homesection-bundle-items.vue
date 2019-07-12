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
    <a href='https://shop.supergreenlab.com/collections/grow-lights/products/192-301b' v-if='bigleds > 0' :class='$style.icon' :id='$style.light'>
      <div :class='$style.number'>{{ bigleds }}</div>
      <span>Big led</span>
    </a>
    <a href='https://shop.supergreenlab.com/collections/grow-lights/products/sgb-144-301b' v-if='smallleds > 0' :class='$style.icon' :id='$style.smalllight'>
      <div :class='$style.number'>{{ smallleds }}</div>
      <span>Medium led</span>
    </a>
    <a href='https://shop.supergreenlab.com/collections/grow-lights/products/sgb-36-301b' v-if='tinyleds > 0' :class='$style.icon' :id='$style.tinylight'>
      <div :class='$style.number'>{{ tinyleds }}</div>
      <span>Tiny led</span>
    </a>
    <a href='https://shop.supergreenlab.com/collections/accessories/products/blower' :class='$style.icon' :id='$style.ventilation'>
      <div :class='$style.number'>{{ ventilation }}</div>
      <span>Ventilation</span>
    </a>
    <a href='https://shop.supergreenlab.com/collections/accessories/products/sht21-temperature-humidity-probe' :class='$style.icon' :id='$style.sensor'>
      <div :class='$style.number'>{{ sensor }}</div>
      <span>Sensor</span>
    </a>
  </section>
</template>

<script>
import Step from '~/components/homesection-step.vue'

export default {
  components: { Step, },
  props: ['bigleds', 'smallleds', 'tinyleds', 'ventilation', 'sensor',],  
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-wrap: wrap

.icon
  display: flex
  flex-direction: column
  align-items: center
  position: relative
  width: 70pt
  height: 70pt
  background-position: bottom
  background-size: contain
  background-repeat: no-repeat
  margin: 0 20pt 0 0
  font-weight: 400
  transition: transform 0.2s
  cursor: pointer
  color: #5E5E5E
  @media only screen and (max-width: 600px)
    flex-basis: 50%
    margin: 20pt 0pt 0 0

.icon:hover
  transform: scale(1.1)

.icon > span
  margin-top: -15pt
  white-space: nowrap

#light
  background-image: url('~assets/img/light.svg')

#smalllight
  width: 50pt
  background-image: url('~assets/img/smalllight.svg')

#tinylight
  width: 50pt
  background-image: url('~assets/img/tinylight.svg')

#ventilation
  background-image: url('~assets/img/ventilation.svg')

#sensor
  background-image: url('~assets/img/sensor.svg')

.number
  display: flex
  justify-content: center
  align-items: center
  position: absolute
  width: 20pt
  height: 20pt
  border-radius: 10pt
  background-color: #3bb30b
  color: white
  font-weight: 600
  right: 0
  bottom: 0

</style>
