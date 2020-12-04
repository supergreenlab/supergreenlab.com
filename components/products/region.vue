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
    <div v-if='expanded' :id='$style.regions'>
      <div
        :class='$style.region + " " + (i !== regions.length - 1 ? $style.rightborder : "")'
        :id='region.code == r.code ? $style.selected : ""'
        v-for='(r, i) in regions'
        :key='r.id'
        @click='setRegion(r)'>
        <div :class='$style.flag' :style='{"background-image": `url(${require(`~/assets/img/${r.flag.fileSmall}`)})`}'></div>
        {{ r.code }}
      </div>
    </div>
    <div v-else>
      <div :id='$style.regions'>
        <div :class='$style.region' :id='$style.selected' @click='expanded = true'>
          <div :class='$style.flag' :style='{"background-image": `url(${require(`~/assets/img/${region.flag.fileSmall}`)})`}'></div>
          <p>
            <small>Selected region:</small><br />
            {{ region.name }}<br />
            <small>Click to change</small>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      expanded: false
    }
  },
  methods: {
    setRegion(region) {
      this.$store.commit('eshop/setRegion', region)
      this.$data.expanded = false
    }
  },
  computed: {
    region() {
      return this.$store.state.eshop.region
    },
    regions() {
      return this.$store.state.eshop.regions
    },
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  height: 45pt
  color: #909090

#regions
  display: flex
  border: 2pt solid #dedede
  border-radius: 4pt
  margin-right: 3pt
  max-width: 97vw
  overflow-x: auto

.region
  display: flex
  align-items: center
  justify-content: center
  padding: 2pt
  cursor: pointer
  font-weight: bold
  opacity: 0.5
  transition: opacity 0.2s

.flag
  width: 15pt
  height: 15pt
  margin-right: 2pt
  border-radius: 3pt
  background-position: center
  background-size: cover
  background-repeat: no-repeat
  background-color: rgba(0, 0, 0, 0.5)

.region:hover
  background-color: #dfdfdf

.rightborder
  border-right: 1pt solid #dfdfdf

#selected
  color: #565656
  opacity: 1

</style>
