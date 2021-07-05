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
      <h2 :id='$style.title'>{{ config.title }}</h2>
      <div :id='$style.description'>{{ config.description }}</div>
      <div :class='$style.title' :id="$style.email">
          <label for="email"> Email :</label>
          <input type="email" name="email" id="email" v-model='email'>
      </div>
      <div :id='$style.btnSubscribe'  @click='newsletterForm'>{{ config.link }}</div>
    </div>
  </section>
</template>

<script>

import { open, screenX, availWidth } from '~/lib/client-side.js'

export default {
  props: ['config',],
  methods: {
    newsletterForm() {
      const width = 800
      open(`https://airtable.com/shrge8dNrpLul19IR?prefill_email=${this.$data.email}`, '_blank', `width=${width},height=600,top=100,left=${screenX() + availWidth()/2 - width/2}`)
      this.$matomo && this.$matomo.trackEvent('guide', 'newsletter')
    }
  }
}
</script>

<style module lang=stylus>
#container
  background-color: #d6d6d6
  width: 100%

#content
  height: 160pt
  justify-content: center
  display: flex
  flex-direction: column
  align-items: center

#title
  font-weight: bold
  font-size: 2em
  margin-bottom: 10pt
  color: #5E5E5E
  text-align: center

#description
  margin-bottom: 5pt

#btnSubscribe
  display: block
  background-color: #3bb30b
  text-align: center
  padding: 8pt 25pt
  border-radius: 5pt
  color: #ffffff
  text-decoration: none
  font-size: 1.2em
  margin: 4pt 0
  white-space: nowrap
  text-transform: uppercase
  font-weight: bold
  cursor: pointer

#btnSubscribe:hover
  background-color: #2F880B

#email
  background-color: #3BB30B
  border-radius: 3pt

input
  border: none
  padding: 5pt
  border-radius: 0pt 3pt 3pt 0pt


label
  text-align: center
  padding: 5pt 0pt 5pt 0pt
  color: white
  text-transform: uppercase
  font-size: 1em
  margin: 10pt
  font-weight: bold

</style>
