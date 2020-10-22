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
    <div :id='$style.title'>
      <SectionTitle title='SuperGreenOS feature highlight'
                    green='Progressive sunrise/sunset'
                    title2="Just like the sun, in a box"
                    smalltitle="The sun doesn't switch to midday position in a second, why would your lamp?"
                    separator='true'/>
    </div>
    <video :id='$style.video' autoplay loop playsinline muted defaultMuted>
      <source src="/progressive_sunrise_sunset.mp4" type="video/mp4">
      <source src="/progressive_sunrise_sunset.webm" type="video/webm">
      Your browser does not support the video tag.
    </video>
    <div :id='$style.text'>
      The <b>SuperGreenController</b> gives you total control of your lights,<br />
      it allows to switch from veg to bloom at a press of a button,<br />
      it <b>simulates sunrise and sunsets</b>, and allows to choose <b>independent dimming</b> for each led channels,<br />
      smart schedules for <b>UV</b> and <b>IR</b> panels are coming soon.
    </div>
    <nuxt-link  :id='$style.cta' @click.native='ctaClicked' :to='{path: "/", hash: "#micro-grow-bundle"}'>
      <b class="hvr-grow">Buy now</b>
    </nuxt-link>
  </section>
</template>

<script>
import SectionTitle from '~/components/sectiontitle.vue'

export default {
  components: { SectionTitle, },
  methods: {
    ctaClicked() {
      this.$matomo && this.$matomo.trackEvent('front-page', 'cta-continuous', 'buy-now')
    }
  },
}

</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center

#title
  width: 100%

#video
  display: block
  margin: 20pt 0 40pt 0
  height: 100%
  max-width: 800px
  max-height: 600px
  @media only screen and (max-width: 600pt)
    width: 100%
  @media only screen and (min-width: 600pt)
    box-shadow: -1px 1px 5px #888

#text
  color: #515151
  text-align: center

#text > b
  color: #3bb30b

#cta
  display: flex
  flex-direction: column
  text-transform: uppercase
  color: white
  background-color: #3BB30B
  padding: 10pt 35pt
  border-radius: 3pt
  text-decoration: none
  text-align: center
  z-index: 100
  margin-top: 20pt
  margin-bottom: 20pt
  font-size: 1.5em
  @media only screen and (max-width: 600px)
    font-size: 1.1em

#cta > small
  padding-top: 5pt
  font-weight: 300
  font-size: 1.1em

#cta > b
  font-weight: 600

</style>
