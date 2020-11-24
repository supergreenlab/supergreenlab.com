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
      <SectionTitle title='Our hardware is'
                    green="The first continuous supply setup"
                    title2='Harvest twice as fast'
                    smalltitle="Don't wait until harvest to start the next plant!"
                    separator='true'/>
    </div>
    <video :id='$style.video' autoplay loop playsinline muted defaultMuted>
      <source src="/continuous_supply.mp4" type="video/mp4">
      <source src="/continuous_supply.webm" type="video/webm">
      Your browser does not support the video tag.
    </video>
    <div :id='$style.text'>
      <b>You don't have to wait until harvest</b> to start the next plant! <b>Harvest twice as fast</b> with continuous supply.<br />
      The Controller can control <b>up to 3 spaces</b> with different schedules to do <b>vegging and blooming at the same time</b>.
    </div>
    <nuxt-link  :id='$style.cta' @click.native='ctaClicked' :to='{path: "/", hash: "#micro-grow-bundle"}'>
      <b class="hvr-grow">Buy now</b>
    </nuxt-link>
  </section>
</template>

<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'

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
