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
      <h3>Key metrics for <b>{{n}} {{ name }}</b></h3>
    </div>
    <div :id='$style.metrics'>
      <div v-if='distance' :class='$style.metric'>
        <Metric
          n='1'
          icon='distance.svg'
          title='LED height above plant'
          v-bind='distance' />
      </div>
      <div v-if='power' :class='$style.metric'>
        <Metric
          :n='n'
          icon='energy.svg'
          title='Power consumption'
          v-bind='power' />
      </div>
      <div v-if='coverage' :class='$style.metric'>
        <Metric
          :n='n'
          icon='surface.svg'
          title='Surface coverage'
          v-bind='coverage' />
      </div>
      <div v-if='yield && showHarvest' :class='$style.metric'>
        <Metric
          :n='n'
          icon='bag.svg'
          title='Approx yield'
          subtitle='(depends on strain and grower’s skills)'
          v-bind='yield' />
      </div>
      <div v-if='plants' :class='$style.metric'>
        <Metric
          :n='n'
          icon='plants.svg'
          title='Number of plants'
          subtitle='(depends on strain and grower’s skills)'
          v-bind='plants' />
      </div>
    </div>
  </section>
</template>

<script>
import Title from '~/components/bundle-title.vue'
import Metric from '~/components/bundle-keymetric.vue'

export default {
  components: {Title, Metric,},
  props: ['distance', 'power', 'coverage', 'yield', 'plants', 'n', 'name', 'showHarvest',],
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  padding: 20pt
  @media only screen and (max-width: 600px)
    padding: 0

#header
  display: flex
  width: 100%
  color: #6F6F6F
  align-items: center
  justify-content: space-between
  border-bottom: 1pt solid #D2D2D2
  margin-bottom: 20pt

#header > h3 > b
  color: #3bb30b

#metrics
  display: flex
  flex-wrap: wrap
  margin: 0 30pt
  @media only screen and (max-width: 600px)
    margin: 0 0

.metric
  flex-basis: 50%
  padding: 10pt
  @media only screen and (max-width: 600px)
    flex-basis: auto

</style>
