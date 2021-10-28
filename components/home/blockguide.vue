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
        <nuxt-link to="/guide/everything-you-need-to-grow-your-own-weed" :id='$style.picture' :style='{"background-image": `url(${require(`~/assets/img/guides/attUb0goXqrpPZ7Ev.jpg`)})`}'>
          <!-- <div :id="$style.logo" >
            <img src="~assets/img/logo_white.svg" alt="logo-supergreenlab">
          </div> -->
        </nuxt-link>
      </div>
      <div :id='$style.description'>
        <div :id='$style.pretitle'>The SGL 12 step guide to:</div>
        <div :id='$style.title'>Everything you need <br/><strong>to grow your own weed</strong></div>
        <div :id='$style.bullets'>
          <div>By the end of this quick & simple guide you will have all the basics to start growing your own discreetly from the comfort of your home </div>
          <div>+ a checklist of everything you’ll need along the way</div>
          <nuxt-link @click.native='onClick' to="/guide/everything-you-need-to-grow-your-own-weed" :id="$style.btnguide">Click here to <br/>read the guide</nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'


export default {
  components: { SectionTitle },
  props: ['location',],
  data() {
    return {

    }
  },
  methods: {
    onClick() {
      this.$matomo.trackEvent(this.$props.location || 'front-page', 'click', 'guide-101')
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  max-width: 800pt
  flex-direction: column
  align-items: center
  color: #323232

.title
  font-family: Roboto
  width: 100%
  margin: 30pt 0 30pt 0
  @media only screen and (max-width: 600px)
    margin: 0

#pretitle
  font-family: Roboto
  font-size: 1.1em

#title
  font-size: 1.5em
  color: #323232
  font-weight: bold
  font-family: 'PlumeAd'
  text-transform: uppercase
  color: #323232
  margin-bottom: 15pt
  @media only screen and (max-width: 600px)
    font-size: 1.4em
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
  margin: 0 10pt
  @media only screen and (max-width: 600px)
    margin-bottom: 20pt

#description
  display: flex
  flex: 1
  flex-direction: column
  justify-content: flex-start
  margin: 0pt 20pt 0 10pt
  @media only screen and (max-width: 600px)
    margin: 0pt 10pt 0 10pt

#bullets
  font-size: 1.1em
  height: 100%
  display: flex
  flex-direction: column
  justify-content: space-around

#bullets > div
  margin: 0 0 10pt 0

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

#btnguide
  width: 250pt
  background-color: #3BB30B
  text-align: center
  font-family: "Roboto"
  font-weight: 800
  font-size: 1.3em
  display: flex
  justify-content:center
  align-items:center
  padding: 10pt
  color: white
  border-radius: 5pt
  align-self: center
  text-transform: uppercase
  cursor: pointer
  text-decoration: none
  @media only screen and (max-width: 600px)
    margin-top: 25pt

#btnguide:hover
  background-color: #2F880B

</style>
