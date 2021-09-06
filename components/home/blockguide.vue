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
  <section :id="$style.container">
    <div :class='$style.title'>
      <SectionTitle title='Not sure **where to get started**?'
                      subtitle='No worries, we have something for you!'
                      center='true'
                      border='true'/>
    </div>
    <div :id='$style.body'>
      <div :id='$style.iconcontainer'>
        <div :id='$style.picture' :style='{"background-image": `url(${require(`~/assets/img/bg-plant.jpg`)})`}'>
          <div :id="$style.logo" >
            <img src="~assets/img/logo_white.svg" alt="logo-supergreenlab">
          </div>
        </div>
      </div>
      <div :id='$style.description'>
        <div :id='$style.pretitle'>The SGL 12 step guide to:</div>
        <div :id='$style.title'>Everything you need <br/><strong>to grow your own weed</strong></div>
        <div :id='$style.bullets'>
          <div>By the end of this quick & simple guide you will have all the basics to start growing your own discreetly from the comfort of your home </div>
          <div>+ a checklist of everything you’ll need along the way</div>
        </div>
      </div>
    </div>
    <!-- <portal v-if='showZoom' to='root'>
      <div :id='$style.fullscreen' @click='toggleZoom'>
          <div :id='$style.mediafullscreen' :style='{"background-image": `url(${require(`~/assets/img/bg-plant.jpg`)})`}' @click='toggleZoom'></div>
      </div>
    </portal> -->
  </section>
</template>


<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'


export default {
  components: { SectionTitle },
  props: [],
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  max-width: 900pt
  flex-direction: column
  align-items: center
  color: black

.title
  width: 100%
  margin: 60pt 0 60pt 0
  @media only screen and (max-width: 600px)
    margin: 0

#pretitle
  font-size: 1.2em

#title
  font-size: 2.3em
  color: black
  font-weight: bold
  font-family: 'PlumeAd'
  text-transform: uppercase
  color: #323232
  margin-bottom: 15pt
  @media only screen and (max-width: 600px)
    font-size: 1.7em
    margin: 5pt

#title strong
  color: #3BB30B
  font-weight: bold

#body
  display: flex
  margin: 0pt 0pt 50pt 0pt
  @media only screen and (max-width: 600px)
    flex-direction: column !important
    margin: 0pt 0pt 20pt 0pt

#iconcontainer
  display: flex
  justify-content: center
  align-items: center
  margin: 5pt 20pt 5pt 5pt
  @media only screen and (max-width: 600px)
    margin: 0 5pt


#description
  display: flex
  flex: 1
  flex-direction: column
  justify-content: flex-start
  @media only screen and (max-width: 600px)
    margin: 0pt 10pt

#bullets
  font-size: 1.2em
  height: 100%
  display: flex
  flex-direction: column
  justify-content: space-around

#bullets strong
  color: #3BB30B
  font-weight: bold


#picture
  display: block
  width: 250pt
  height: 250pt
  background-position: center
  background-repeat: no-repeat
  background-size: cover
  display: flex
  justify-content: flex-start
  align-items: flex-end
  /* @media only screen and (max-width: 600pt)
    background-size: 100% */

#logo
  margin: 5pt

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


#mediafullscreen
  height: 90%
  width: 90%
  margin: 0 15pt 0 0
  background-position: center
  background-size: contain
  background-repeat: no-repeat

</style>
