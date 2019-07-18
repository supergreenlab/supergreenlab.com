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
      <div :id='$style.title'>
        <h1>{{ title }}</h1>
        <h2>{{ subtitle }}</h2>
      </div>
      <h1>${{ price }}</h1>
    </div>
    <div :id='$style.body' :style='{"flex-direction": right ? "row-reverse" : ""}'>
      <div :id='$style.icon' :style='{"background-image": `url(${require(`~/assets/img/${icon}`)})`}'></div>
      <div :id='$style.description'>
        <p v-for='b in bullets' v-html='`- ${b}`' :class='$style.bullet'></p>
      </div>
    </div>
    <div :id='$style.bottom' v-if='!nobottom'>
      <div :id='$style.items'>
        <b>Includes:</b>
        <Items :bigleds='bigleds' :smallleds='smallleds' :tinyleds='tinyleds' :ventilation='ventilation' :sensor='sensor' />
      </div>
      <div :id='$style.buy'>
        <nuxt-link @click.native='bundleClicked' :to='`/bundle/${slug}`'>BUY NOW <b>${{ price }}</b></nuxt-link><br />
        Free shipping
      </div>
    </div>
  </section>
</template>

<script>
import Items from '~/components/homesection-bundle-items.vue'

export default {
  components: {Items,},
  props: ['slug', 'title', 'subtitle', 'icon', 'bullets', 'price', 'right', 'bigleds', 'smallleds', 'tinyleds', 'ventilation', 'sensor', 'url', 'nobottom'],
  methods: {
    bundleClicked() {
      this.$matomo && this.$matomo.trackEvent('front-page', 'bundleclicked', this.$props.slug)
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column

#header
  display: flex
  align-items: center
  justify-content: space-between
  background-color: #EEEEEE
  padding: 10pt 10pt

#header > h1
  color: #3BB30B
  margin: 0
  @media only screen and (max-width: 600px)
    font-size: 1.8em

#title
  color: #5D5D5D
  @media only screen and (max-width: 600px)
    font-size: 0.85em

#title > h1
  margin: 0

#title > h2
  font-weight: 200
  font-size: 1.3em

#body
  display: flex
  margin: 30pt 30pt
  @media only screen and (max-width: 600px)
    flex-direction: column !important

#icon
  width: 40%
  height: 200pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  margin: 0 20pt 0 20pt
  @media only screen and (max-width: 600px)
    width: 100%
    margin: 0 0pt 0 0pt

#description
  display: flex
  flex: 1
  flex-direction: column
  justify-content: center

#description > p
  margin: 5pt 0
  font-size: 1.1em

#buy
  display: flex
  flex-direction: column
  justify-content: flex-end
  text-align: right
  @media only screen and (max-width: 600px)
    margin: 30pt 10pt 0 0
    align-self: flex-end

#buy > a
  display: block
  align-self: flex-end
  background-color: #3BB30B
  padding: 8pt 25pt
  border-radius: 5pt
  color: white
  text-decoration: none

#buy > a:hover
  background-color: #2F880B

#buy > a > b
  font-weight: 600

.bullet > b
  color: #3BB30B
  font-weight: 600

#bottom 
  display: flex
  padding: 0 20pt
  @media only screen and (max-width: 600px)
    flex-direction: column
    justify-content: center
    align-items: center
    padding: 0

#items
  flex: 1
  display: flex
  flex-direction: column
  font-weight: 400
  color: #5d5d5d

#items > b
  font-size: 1.2em
  margin-bottom: 30pt

</style>
