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
    <div :id='$style.subscribe'>
      <div :class='$style.title'>
        <h2>Subscribe</h2>
      </div>
      <div :class='$style.text'>
        Stay tuned with our <b>newsletter</b> and get <b>exclusive promotions</b>.
      </div>
      <div :class='$style.title' :id="$style.email">
          <label for="email"> Email :</label>
          <input type="email" name="email" id="email" v-model='email'>
      </div>
      <div :class='$style.buttons' :id='$style.btnSubscribe' @click='newsletterForm'>Subscribe</div>
    </div>
  </section>
</template>

<script>
import { open, screenX, availWidth } from '~/lib/client-side.js'

export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    newsletterForm() {
      const width = 800
      open(`https://airtable.com/shrge8dNrpLul19IR?prefill_email=${this.$data.email}`, '_blank', `width=${width},height=600,top=100,left=${screenX() + availWidth()/2 - width/2}`)
      this.$matomo && this.$matomo.trackEvent('guide', 'newsletter')
    }
  },
}
</script>

<style module lang=stylus>
#container
  background-color: #dedede
  width: 100%
  height: auto
  display: flex
  align-items: center
  flex-direction: column
  padding: 10pt 0

#subscribe
  width: 100%
  margin: 5px
  display: flex
  flex-direction: column
  align-items: center

#btnSubscribe
  cursor: pointer
  width: 170px

.text
  margin: 10pt
  font-size: 1.2em
  text-align: center

.text > b
  color: #3bb30b


#buttons
  width: 100%
  display: flex
  justify-content: space-between
  margin: 10pt

.buttons
  background-color: #3BB30B
  text-align: center
  padding: 10pt 15pt
  border-radius: 3pt
  color: white
  text-transform: uppercase
  text-decoration: none
  font-size: 1em
  margin: 10pt
  white-space: nowrap
  font-weight: bold

#email
  background-color: #3BB30B
  border-radius: 3pt

input
  border: none
  padding: 5pt
  border-radius: 0pt 3pt 3pt 0pt

#guidelogo
  position: absolute
  right: 50px
  margin-top: 100px
  @media only screen and (max-width: 600pt)
    position: static
    margin-top: 8px

label
  text-align: center
  padding: 5pt 0pt 5pt 0pt
  color: white
  text-transform: uppercase
  font-size: 1em
  margin: 10pt
  font-weight: bold

</style>
