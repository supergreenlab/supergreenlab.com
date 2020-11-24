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
      <p v-if='min'>
        Min: <span :class='$style.green'>{{ minStr }}</span>
      </p>
      <p v-if='max'>
        Max: <span :class='$style.green'>{{ maxStr }}</span>
      </p>
      <a v-if='zoom' href='javascript:void(0)' @click='toggleZoom'>View</a>
    </div>
    <portal v-if='showZoom' to='root'>
      <div :id='$style.fullscreen' @click='toggleZoom'>
        <div :id='$style.iconfullscreen' :style='{"background-image": `url(${require(`~/assets/img/${zoom}`)})`}'></div>
      </div>
    </portal>
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
  props: ['icon', 'title', 'subtitle', 'min', 'max', 'unit', 'n', 'zoom',],
  data() {
    return {
      showZoom: false
    }
  },
  computed: {
    isImperial() {
      const off = new Date().getTimezoneOffset() / 60
      return (off >= 4 && off <= 10)
    },
    minStr() {
      let { min, unit, n } = this.$props
      min *= (this.isImperial ? unitConv[unit] : 1)
      if (unit == 'cm2') {
        min *= Math.sqrt(n)
        min = Math.floor(min)
        min = `${min}x${min}`
      } else {
        min *= n
      }
      if (this.isImperial) {
        unit = unitMap[unit]
      }
      return `${Math.round(min)}${unit}`
    },
    maxStr() {
      let { max, unit, n } = this.$props
      max *= (this.isImperial ? unitConv[unit] : 1)
      max = Math.floor(max)
      if (unit == 'cm2') {
        max *= Math.sqrt(n)
        max = Math.floor(max)
        max = `${max}x${max}`
      } else {
        max *= n
      }
      if (this.isImperial) {
        unit = unitMap[unit]
      }
      return `${max}${unit}`
    },
  },
  methods: {
    toggleZoom() {
      this.$data.showZoom = !this.$data.showZoom
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

#metrics > a
  flex: 1
  margin-top: 5pt

.green
  font-weight: 600
  color: #3BB30B

#fullscreen
  position: fixed
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  display: flex
  align-items: center
  justify-content: center
  background-color: white

#iconfullscreen
  height: 90%
  width: 90%
  margin: 0 15pt 0 0
  background-position: center
  background-size: contain
  background-repeat: no-repeat

</style>
