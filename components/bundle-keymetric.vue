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

export default {
  props: ['icon', 'title', 'subtitle', 'min', 'max', 'unit',],
  computed: {
    minStr() {
      let { min, unit } = this.$props
      if (unit == 'cm2') {
        min = `${min}x${min}`
      } 
      return `${min}${unit}`
    },
    maxStr() {
      let { max, unit } = this.$props
      if (unit == 'cm2') {
        max = `${max}x${max}`
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
