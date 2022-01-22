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
  <section :id='$style.container' :class='{[$style.expanded]: expanded}'>
    <div v-if='expanded' :id='$style.selector'>
      <span>search: </span><input placeholder='ex: spain' type='text' v-model='search' :id='$style.search' />
      <div :id='$style.regions'>
        <div
          :class='$style.region + " " + (i !== regions.length - 1 ? $style.rightborder : "")'
          :id='region.code == r.code ? $style.selected : ""'
          v-for='(r, i) in regions'
          :key='r.id'
          @click='setRegion(r)'>
          <div :class='$style.flag' :style='{"background-image": `url(/img/${r.flag.fileSmall})`}'></div>
          {{ r.code }}
        </div>
      </div>
    </div>
    <div v-else>
      <div :id='$style.current'>
        <div :class='$style.region' :id='$style.selected' @click='expanded = true'>
          <div :class='$style.flag' :style='{"background-image": `url(/img/${region.flag.fileSmall})`}'></div>
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
      expanded: false,
      search: '',
    }
  },
  methods: {
    setRegion(region) {
      this.$analytics.trackEvent('regions', 'change', region.code)
      this.$store.commit('eshop/setRegion', region)
      this.$data.expanded = false
    }
  },
  computed: {
    region() {
      return this.$store.state.eshop.region
    },
    regions() {
      const { search } = this.$data
      const regions = this.$store.getters['eshop/availableRegions']
      if (!search) return regions
      return regions.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.code.toLowerCase().includes(search.toLowerCase()))
    },
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  color: #909090

.expanded
  width: 100%
  max-width: 400px

#selector
  width: 100%
  border: 2pt solid #dedede
  border-radius: 4pt
  padding: 5px 5px 0 5px

#regions
  display: flex
  overflow-x: auto
  margin-bottom: 3px

#current
  border: 2pt solid #dedede
  border-radius: 4pt

.region
  display: flex
  align-items: center
  justify-content: center
  padding: 5pt
  cursor: pointer
  font-weight: bold
  opacity: 0.5
  transition: opacity 0.2s
  margin-right: 5px

.flag
  width: 20pt
  height: 20pt
  margin-right: 2pt
  padding: 4px
  border-radius: 3pt
  background-position: center
  background-size: cover
  background-repeat: no-repeat
  background-color: rgba(0, 0, 0, 0.5)

#regions > .region:hover
  background-color: #dfdfdf
  border-radius: 3px

#selected
  color: #565656
  opacity: 1

#search
  margin: 3px
  height: 30px
  width: 100px
  border: 2px solid #cdcdcd
  border-radius: 4px

</style>
