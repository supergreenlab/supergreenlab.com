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
    <div :id='$style.content'>
      <div :id='$style.title'>{{ config.title }}</div>
      <div :id='$style.description'>{{ config.description }}</div>
      <div :id='$style.btnSubscribe'  @click='proposeSellingPoint'>{{ config.link }}</div>
    </div>
  </section>
</template>

<script>

import { open, screenX, availWidth } from '~/lib/client-side.js'

export default {
  props: ['config',],
  methods: {
    proposeSellingPoint() {
      const width = 800
      open('https://airtable.com/shrVYGaBGhAUFSJvm', '_blank', `width=${width},height=600,top=100,left=${screenX() + availWidth()/2 - width/2}`)
      this.$matomo && this.$matomo.trackEvent('productlist', 'propose')
    }
  }
}
</script>

<style module lang=stylus>
/* #container
  margin: 5pt */

#content
  background-color: #3bb30b
  height: 160pt
  width: 100%
  justify-content: center
  display: flex
  flex-direction: column
  align-items: center

#title
  font-family: plumeAd
  color: white
  -webkit-text-stroke: 0.5px black
  font-size: 1.8em
  margin-bottom: 10pt
  text-align: center

#description
  margin-bottom: 5pt

#btnSubscribe
  border: solid 1px
  cursor: pointer
  width: 100pt
  margin: 10pt
  background-color: #3BB30B
  text-align: center
  padding: 3pt 15pt
  border-radius: 3pt
  color: white
  text-transform: uppercase
  text-decoration: none
  font-size: 1em
  white-space: nowrap
  font-weight: bold

#btnSubscribe:hover
  background-color: #ffffff
  color: #5E5E5E

</style>
