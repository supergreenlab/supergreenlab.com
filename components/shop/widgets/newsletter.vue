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
      <h1>Newsletter</h1>
      <h2 :id='$style.title'>{{ config.title }}</h2>
      <div :id='$style.description' v-html='$md.render(config.description)'></div>
      <div :class='$style.title' :id="$style.emailcontainer">
          <input placeholder='ex: tommy@high.af' type="email" name="email" id="email" v-model='email' :class="$style.email">
      </div>
      <div :id='$style.btnSubscribe' @click='newsletterForm'>{{ config.linktext }}</div>
    </div>
  </section>
</template>

<script>

import { open, screenX, availWidth } from '~/lib/client-side.js'

export default {
  props: ['config', 'container',],
  data() {
    return {
      email: ''
    }
  },
  methods: {
    newsletterForm() {
      const { config: { slug } } = this.$props
      const { container: { slug: containerSlug } } = this.$props
      const width = 800
      open(`https://airtable.com/shrge8dNrpLul19IR?prefill_email=${this.$data.email}`, '_blank', `width=${width},height=600,top=100,left=${screenX() + availWidth()/2 - width/2}`)
      this.$matomo.trackEvent('widgets', 'newsletter', `${containerSlug}_${slug}`)
    }
  }
}
</script>

<style module lang=stylus>

#container
  background-color: white
  width: 100%
  padding: 20pt 10pt
  color: #5e5e5e

#content
  justify-content: center
  display: flex
  flex-direction: column
  align-items: center

#content > h1
  color: #3bb30b

#title
  font-family: Roboto
  font-weight: bold
  font-size: 1.5em
  margin-bottom: 10pt
  text-align: center

#description
  margin-bottom: 5pt
  text-align: center

#btnSubscribe
  display: block
  background-color: #3bb30b
  text-align: center
  padding: 5pt 15pt
  border-radius: 3pt
  color: #ffffff
  text-decoration: none
  font-size: 0.9em
  margin: 5pt 0
  white-space: nowrap
  text-transform: uppercase
  cursor: pointer

#btnSubscribe:hover
  background-color: #2F880B

#emailcontainer
  background-color: #3BB30B
  border-radius: 3pt
  display: flex
  margin-bottom: 5pt

.email
  border: 1pt solid #dedede
  border-radius: 0pt 3pt 3pt 0pt
  padding: 5pt 10pt

#label
  text-align: center
  color: white
  text-transform: uppercase
  font-weight: bold
  padding: 3pt
  font-size: 0.8em

</style>
