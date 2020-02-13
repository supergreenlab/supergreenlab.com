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
      <SectionTitle title='How it works'
                    green='In just 3 steps'
                    smalltitle='(like.. around 3 steps)'
                    separator='true'/>
    </div>
    <!--<video :id='$style.video' autoplay loop playsinline muted defaultMuted>
      <source src="/intro.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video> -->
    <div :id='$style.steps'>
      <div :class='$style.step'>
        <Step n=1
              title='Get any furniture'
              text='<b>Any size and shape</b>, our bundles are designed to adapt to <b>all types furniture.</b>'
              icon='furniture.svg'
              :vertical=true />
      </div>
      <div :class='$style.step'>
        <Step n=2
              title='Install your bundle'
              text='Easy to install and configure. Just a few steps and your <b>LED lights</b> are ready!'
              icon='screw.svg'
              :vertical=true />
      </div>
      <div :class='$style.step'>
        <Step n=3
              title='Start growing'
              text='24/7 support, join the evergrowing community!</b>'
              icon='plant.svg'
              :vertical=true />
      </div>
    </div>
    <nuxt-link  :id='$style.cta' @click.native='ctaClicked' :to='{path: "/", hash: "#micro-grow-bundle"}'>
      <b class="hvr-grow">Buy now</b>
    </nuxt-link>
  </section>
</template>

<script>
import SectionTitle from '~/components/sectiontitle.vue'
import Step from '~/components/homesection-step.vue'

export default {
  components: { SectionTitle, Step, },
  methods: {
    ctaClicked() {
      this.$matomo && this.$matomo.trackEvent('front-page', 'cta', 'buy-now')
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
  margin: 0pt 0 50pt 0

#video
  display: block
  margin: 0 0 40pt 0
  height: 100%
  max-height: 600px
  max-width: 800px
  @media only screen and (max-width: 600pt)
    width: 100%
  @media only screen and (min-width: 600pt)
    box-shadow: -1px 1px 5px #888

#steps
  display: flex
  align-items: center
  justify-content: space-around
  margin: 0 40pt 20pt 40pt
  max-width: 900pt
  @media only screen and (max-width: 600px)
    flex-direction: column

.step
  flex-basis: 25%
  @media only screen and (max-width: 600px)
    margin-bottom: 20pt

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
