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
      <SectionTitle title='Our bundles are **all-included:**'
                    subtitle='**Light**, environment **control** and **automation**' />
    </div>
    <div :class="$style.body">

      <div :class="$style.iconcontainer">
        <div :class="$style.picture" :style='{"background-image": `url(${require(`~/assets/img/ledpanel.png`)})`}'>
          <div :class="$style.logo" >
            <img src="~assets/img/logo.svg" alt="logo-supergreenlab">
          </div>
          <div :class="$style.todo">
            <div :class="$style.smalltitle">Simulate the sun with</div>
            <div :class="$style.subtitle">Up to <strong>6 LED panels*</strong></div>
          </div>
        </div>

      </div>
      <div :class="$style.description">
        <div :class="$style.titleCard">LED PANELS</div>
        <div :class="$style.bullets">
          <div><strong>Up to 6 LED panels*</strong>for a perfect coverage of your plant, even in the tightest space</div>
          <div><strong>LED technologies</strong> have revolutionized the way we can grow <strong>cannabis</strong>; more light and less heat means we’re able to <strong>grow in the tightest space</strong></div>
          <div :class="$style.asterisk"><strong>* Coming soon</strong>: more than 6 panels on a controller, bigger SGL panels, and compatibility with other products on the market!</div>
        </div>
      </div>
    </div>

    <div :class="$style.body">
      <div :class="$style.iconcontainer">
        <div :class="$style.picture" :style='{"background-image": `url(${require(`~/assets/img/blower_sensor.png`)})`}'>
          <div :class="$style.logo" >
            <img src="~assets/img/logo.svg" alt="logo-supergreenlab">
          </div>
          <div :class="$style.todo">
            <div :class="$style.smalltitle">Control your grow environment with</div>
            <div :class="$style.subtitle"><strong>Temperature </strong> and <strong>humidity </strong>sensor & <strong>Automatic</strong> ventilation</div>
          </div>
        </div>
      </div>
      <div :class="$style.description">
        <div :class="$style.titleCard">ENVIRONMENT CONTROL</div>
        <div :class="$style.bullets">
          <div><strong>Temperature and humidity sensor </strong>to make sure the plant is comfortable</div>
          <div><strong>Automatically controlled ventilation </strong>based on temperature or humidity</div>
          <div><strong>Configure alerts and receive a notification </strong>when the temperature or humidity gets out of range.</div>
        </div>
      </div>
    </div>

    <div :class="$style.body">
      <div :class="$style.iconcontainer">
        <div :class="$style.picture" :style='{"background-image": `url(${require(`~/assets/img/app_controller.png`)})`}'>
          <div :class="$style.logo" >
            <img src="~assets/img/logo.svg" alt="logo-supergreenlab">
          </div>
          <div :class="$style.todo">
            <div :class="$style.smalltitle">Keep everything under control with</div>
            <div :class="$style.subtitle">Super<strong>Green</strong>Controller</div>
          </div>
        </div>
      </div>
      <div :class="$style.description">
        <div :class="$style.titleCard">SMART CONTROLLER & MONITORING APP</div>
        <div :class="$style.bullets">
          <div><strong>Controlled</strong>from a mobile app, <strong>from anywhere </strong> with internet access.</div>
          <div><strong>Can control up to three independant spaces</strong> at the same time.</div>
          <div><strong>And much more</strong>: auto-watering, VPD, CO2 control, UVa schedules, emerson effect etc...</div>
        </div>
      </div>
    </div>

    <div :class="$style.body">
      <div :class="$style.iconcontainer">
        <div :class="$style.picture" :style='{"background-image": `url(${require(`~/assets/img/towelieG.png`)})`}'>
          <div :class="$style.logo" >
            <img src="~assets/img/logo.svg" alt="logo-supergreenlab">
          </div>
          <div :class="$style.todo">
            <div :class="$style.smalltitle">Ask us anything</div>
            <div :class="$style.subtitle">We're here to<strong> help</strong>!</div>
          </div>
        </div>
      </div>
      <div :class="$style.description">
        <div :class="$style.titleCard">24/7 TECHNICAL AND PLANT GROWING SUPPORT</div>
        <div :class="$style.bullets">
          <div>When you’re buying a bundle <strong>you’re not only buying an electronic gadget.</strong></div>
          <div>You also get access to our <strong>private 24/7 support</strong>.</div>
          <div>Whether you need <strong>technical or plant growing</strong> help, <strong>there will be someone to answer you questions</strong>.</div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import Examples from '~/components/home/examples.vue'
import SectionTitle from '~/components/widgets/sectiontitle.vue'

export default {
  components: { Examples, SectionTitle },
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
  color: #323232
  margin-bottom: 20pt

.title
  width: 100%
  margin: 30pt 0 30pt 0
  @media only screen and (max-width: 600px)
    margin: 5pt


.titleCard
  font-family: Roboto
  font-size: 1.7em
  color: #323232
  font-weight: bold
  margin-bottom: 15pt
  @media only screen and (max-width: 600px)
    font-size: 1.7em

#title strong
  color: #3BB30B
  font-weight: bold

.body
  max-width: 700pt
  display: flex
  margin: 0pt 0pt 50pt 0pt
  @media only screen and (max-width: 600px)
    flex-direction: column-reverse !important
    margin: 0pt 0pt 20pt 0pt
    align-items: center

.iconcontainer
  display: flex
  flex-direction: column
  margin: 5pt 30pt 5pt 5pt
  @media only screen and (max-width: 600px)
    margin: 0 5pt


.description
  display: flex
  flex: 1
  flex-direction: column
  justify-content: flex-start
  text-align: justify
  @media only screen and (max-width: 600px)
    margin: 20pt 10pt 10pt 10pt

.bullets
  height: 100%
  display: flex
  flex-direction: column
  justify-content: space-around
  font-size: 1.2em

.bullets div
  @media only screen and (max-width: 600px)
    margin: 5pt 0

.bullets strong
  color: #3BB30B
  font-weight: bold


.picture
  display: block
  width: 200pt
  height: 180pt
  background-repeat: no-repeat
  background-size: contain
  display: flex
  justify-content: space-between
  flex-direction: column
  /* @media only screen and (max-width: 600pt)
    background-size: 100% */

.logo
  margin: 5pt

.logo img
  float: right
  width: 35pt

.asterisk
  font-size: 0.9em

.asterisk strong
  color: #323232

.todo
  font-weight: bold

.todo strong
  color: #3BB30B

.smalltitle
  font-size: 0.75em

.subtitle
  font-size: 1.1em

</style>
