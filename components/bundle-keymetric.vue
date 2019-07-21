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
    <div :id='$style.icon' :style='{"background-image": `url(${require(`~/assets/img/${icon}`)})`}'></div>
    <div :id='$style.metrics'>
      <h3>{{ title }}</h3>
      <small v-if='subtitle'>{{ subtitle }}</small>
      <p>
        Min: <span :class='$style.green'>{{ minStr }}</span>
      </p>
      <p>
        Max: <span :class='$style.green'>{{ maxStr }}</span>
      </p>
    </div>
  </section>
</template>

<script>

const unitConv = {
  'cm': 0.393701,
  'cm2': 0.393701,
  'g': 0.35274,
  'w': 1,
  '': 1,
}

const unitMap = {
  'cm': 'in',
  'cm2': 'sq in',
  'g': 'oz',
  'w': 'w',
  '' : '',
}

export default {
  props: ['icon', 'title', 'subtitle', 'min', 'max', 'unit', 'n',],
  computed: {
    isImperial() {
      const off = new Date().getTimezoneOffset() / 60
      return (off >= 4 && off <= 10)
    },
    minStr() {
      let { min, unit, n } = this.$props
      min *= n * (this.isImperial ? unitConv[unit] : 1)
      min = Math.floor(min*100)/100
      if (unit == 'cm2') {
        min = `${min}x${min}`
      } 
      if (this.isImperial) {
        unit = unitMap[unit]
      }
      return `${min}${unit}`
    },
    maxStr() {
      let { max, unit, n } = this.$props
      max *= n * (this.isImperial ? unitConv[unit] : 1)
      max = Math.floor(max*100)/100
      if (unit == 'cm2') {
        max = `${max}x${max}`
      } 
      if (this.isImperial) {
        unit = unitMap[unit]
      }
      return `${max}${unit}`
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  color: #606060

#icon
  height: 60pt
  width: 60pt
  margin: 0 15pt 0 0
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  @media only screen and (max-width: 600px)
    height: 40pt
    width: 40pt

#metrics
  display: flex
  flex-direction: column
  justify-content: space-between

#metrics > p
  font-weight: 400
  font-size: 1.1em

.green
  font-weight: 600
  color: #3BB30B

</style>
