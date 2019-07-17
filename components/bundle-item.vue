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
    <div :id='$style.product'>
      <div :id='$style.iconcontainer'>
        <div :id='$style.icon' :style='{"background-image": `url(${require(`~/assets/img/${iconcomp}`)})`}'></div>
      </div>
      <div :id='$style.description'>
        <div :id='$style.header'>
          <h3>{{ name }}</h3>
          <h2 :id='$style.n'>x{{ n }}</h2>
        </div>
        <div :id='$style.bullets'>
          <p v-for='b in bullets' v-html='`- ${b}`' :class='$style.bullet'></p>
        </div>
        <div :id='$style.bottom'>
          <a href='javascript:void(0)' v-if='keymetrics' :id='$style.showmetrics' :class='shownMetrics ? $style.shown : ""' @click='showMetrics'>
            <span>{{ shownMetrics ? "HIDE KEY METRICS" : "SHOW KEY METRICS" }}</span>
            <div :id='$style.metricsarrow'></div>
          </a>
          <div :id='$style.pricecontainer'>
            <div :id='$style.price'>
              <h1>${{ price }}</h1>
              <div :id='$style.redbar'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :id='$style.keymetricscontainer' :style='{"height": shownMetrics ? `${keymetricsHeight}px` : "0px"}'>
      <div v-if='keymetrics' ref='keymetrics' :id='$style.keymetrics'>
        <KeyMetrics v-bind='keymetrics' />
      </div>
    </div>
    <div v-if='!last' :id='$style.separator'></div>
  </section>
</template>

<script>
import KeyMetrics from '~/components/bundle-keymetrics.vue'

export default {
  components: {KeyMetrics,},
  props: ['n', 'slug', 'name', 'price', 'icon', 'icons', 'color', 'bullets', 'keymetrics', 'last', ],
  data() {
    return {
      shownMetrics: false,
      keymetricsHeight: 0,
    }
  },
  computed: {
    iconcomp() {
      const { icon, icons } = this.$props
      return icon ? icon : icons['black']
    },
  },
  methods: {
    showMetrics() {
      this.$data.keymetricsHeight = this.$refs.keymetrics.clientHeight
      this.$data.shownMetrics = !this.$data.shownMetrics
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column

#product
  display: flex
  margin: 20pt
  @media only screen and (max-width: 600px)
    flex-direction: column

#iconcontainer
  flex: 0.3
  display: flex
  align-items: center
  justify-content: center
  @media only screen and (max-width: 600px)
    flex: auto
    height: 100pt
    margin-bottom: 20pt
  
#icon
  width: 100%
  max-width: 140pt
  height: 100%
  max-height: 140pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat

#description
  flex: 0.7

#header
  display: flex
  align-items: center
  justify-content: space-between
  border-bottom: 2pt solid #BEBEBE
  margin-bottom: 20pt

#header > h3
  color: #6F6F6F

#n
  font-size: 2em
  color: #3BB30B

#bullets
  display: flex
  flex-direction: column
  justify-content: center

#bottom
  display: flex
  align-items: center
  margin-top: 20pt

#pricecontainer
  display: flex
  flex: 1
  flex-direction: row-reverse
  @media only screen and (max-width: 600px)
    margin-left: 10pt

#price
  position: relative

#price > h1
  color: #3BB30B

#redbar
  width: 110%
  height: 2pt
  top: 50%
  left: 0
  transform: rotate(-30deg)
  position: absolute
  background-color: #FF0000

#separator
  height: 2pt
  background-image: url('~assets/img/separator.svg')
  background-repeat: repeat-x
  background-position: center

#showmetrics
  display: flex
  justify-content: space-between
  align-items: center
  box-sizing: border-box
  padding: 5pt 30pt
  border: 1pt solid #3BB30B
  border-radius: 2pt
  text-decoration: none
  color: #707070
  width: 180pt
  transition: background-color 0.2s, border 0.2s
  white-space: nowrap
  @media only screen and (max-width: 600px)
    justify-content: center
    padding: 5pt 10pt

#metricsarrow
  width: 10pt
  height: 10pt
  background-image: url('~assets/img/metricsarrow.svg')
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  transition: transform 0.2s
  @media only screen and (max-width: 600px)
    margin-left: 5pt

.shown
  border: 2pt solid #3BB30B !important
  background-color: #EAEAEA

.shown > #metricsarrow
  transform: rotate(-180deg)

#keymetricscontainer
  transition: height 0.5s
  overflow: hidden

</style>
