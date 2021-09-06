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
        <div :id='$style.icon' :style='{"background-image": `url(${require(`~/assets/img/${item.pics[0].fileLarge}`)})`}' @click='toggleZoom'></div>
      </div>
      <div :id='$style.description'>
        <div :id='$style.header'>
          <h3><nuxt-link :to='`/product/${item.SellingPoints[0].slug}`'>{{ item.name }}</nuxt-link></h3>
          <h2 :id='$style.n'>x{{ n }}</h2>
        </div>
        <div :id='$style.bullets' v-html='$md.render(item.bulletpoints)'>
        </div>
        <div :id='$style.bottom'>
          <a href='javascript:void(0)' v-if='item.specs.keymetrics' :id='$style.showmetrics' :class='shownMetrics ? $style.shown : ""' @click='showMetrics'>
            <span>{{ shownMetrics ? "HIDE KEY METRICS" : "SHOW KEY METRICS" }}</span>
            <div :id='$style.metricsarrow'></div>
          </a>
          <div v-else :id='$style.spacer'></div>
        </div>
      </div>
    </div>
    <div :id='$style.keymetricscontainer' :style='{"height": shownMetrics ? `${keymetricsHeight}px` : "0px"}'>
      <div v-if='item.specs.keymetrics' ref='keymetrics' :id='$style.keymetrics'>
        <KeyMetrics :showHarvest='showHarvest' :name='item.name' :n='n' v-bind='item.specs.keymetrics' />
      </div>
    </div>
    <portal v-if='showZoom' to='root'>
      <div :id='$style.fullscreen' @click='toggleZoom'>
        <div :id='$style.iconfullscreen' :style='{"background-image": `url(${require(`~/assets/img/${item.pics[0].fileFull}`)})`}'></div>
      </div>
    </portal>
  </section>
</template>

<script>
import KeyMetrics from '~/components/bundle/keymetrics.vue'

export default {
  components: {KeyMetrics,},
  props: ['n', 'item', 'last', 'showHarvest',],
  data() {
    return {
      shownMetrics: false,
      keymetricsHeight: 0,
      showZoom: false,
    }
  },
  methods: {
    showMetrics() {
      this.$matomo && this.$matomo.trackEvent('bundle', 'show-keymetrics', this.$props.name)
      this.$data.keymetricsHeight = this.$refs.keymetrics.clientHeight
      this.$data.shownMetrics = !this.$data.shownMetrics
    },
    toggleZoom() {
      this.$data.showZoom = !this.$data.showZoom
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  background-color: #f5f5f5
  border-radius: 5pt
  margin: 10pt 5pt

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
  margin-right: 10pt
  @media only screen and (max-width: 600px)
    flex: auto
    margin-bottom: 20pt
    margin-right: 0
  
#icon
  width: 100%
  height: 100%
  min-height: 280pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  cursor: pointer
  @media only screen and (max-width: 400px)
    height: 220pt
  @media only screen and (min-width: 400px) and (max-width: 800px)
    max-width: 280pt
    height: 280pt

#description
  flex: 0.7
  background-color: white
  padding: 10pt

#header
  font-family: Roboto
  display: flex
  align-items: center
  justify-content: space-between
  border-bottom: 2pt solid #BEBEBE
  margin-bottom: 20pt

#header > h3 > a
  color: #6F6F6F

#n
  font-size: 2em
  color: #3BB30B

#bullets
  display: flex
  flex-direction: column
  justify-content: center
  color: #454545

#bullets strong
  color: #3BB30B
  font-weight: 600

#bullets ul
  padding: 0
  list-style-type: none

#bullets ul li
  margin-bottom:7pt

#bullets ul li::before
  content: '- '
  color: #3bb30b
  font-weight: bold

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
  background-position: center
  background-size: contain
  background-repeat: no-repeat

</style>
