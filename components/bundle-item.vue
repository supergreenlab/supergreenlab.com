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
          <div v-else :id='$style.spacer'></div>
          <div :id='$style.pricecontainer'>
            <div :class='$style.price'>
              <h1>${{ (Math.floor((price - price * discount / 100) * 100) / 100).toFixed(2) }}</h1>
            </div>
            <div :class='$style.price + " " + $style.smallprice'>
              <h1>
                ${{ price.toFixed(2) }}
                <div :id='$style.redbar'></div>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :id='$style.keymetricscontainer' :style='{"height": shownMetrics ? `${keymetricsHeight}px` : "0px"}'>
      <div v-if='keymetrics' ref='keymetrics' :id='$style.keymetrics'>
        <KeyMetrics :showHarvest='showHarvest' :name='name' :n='n' v-bind='keymetrics' />
      </div>
    </div>
    <div v-if='!last' :id='$style.separator'></div>
  </section>
</template>

<script>
import KeyMetrics from '~/components/bundle-keymetrics.vue'

export default {
  components: {KeyMetrics,},
  props: ['n', 'slug', 'name', 'price', 'discount', 'icon', 'icons', 'color', 'bullets', 'keymetrics', 'last', 'showHarvest',],
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
      this.$matomo && this.$matomo.trackEvent('bundle', 'show-keymetrics', this.$props.name)
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
    margin: 5pt

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
  justify-content: space-between
  margin-top: 20pt

#pricecontainer
  display: flex
  flex: 1
  align-self: flex-end
  font-size: 0.8em
  flex-direction: row-reverse
  @media only screen and (max-width: 600px)
    flex: none

.price
  position: relative
  display: flex
  align-items: center
  justify-content: center

.smallprice
  margin: 0 10pt
  font-size: 0.8em
  @media only screen and (max-width: 600px)
    margin: 0 4pt

.price > h1
  position: relative
  color: #565656
  @media only screen and (max-width: 600px)
    margin-top: 4pt

.smallprice > h1
  color: #898989

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

#spacer
  flex: 1

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
  transition: background-color 0.2s, border 0.2s
  white-space: nowrap
  width: 180pt
  @media only screen and (max-width: 600px)
    width: 130pt
    justify-content: center
    padding: 5pt 10pt

#metricsarrow
  width: 10pt
  height: 10pt
  background-image: url('~assets/img/metricsarrow.svg')
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  margin-left: 4pt
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
