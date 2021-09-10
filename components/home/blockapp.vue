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
      <SectionTitle title='The **grow assistant app** that has your back'
                      center='true'
                      border='true'/>
    </div>
    <div :class="$style.body">
      <div :class='$style.iconcontainer'>
        <div :id='$style.picture' :style='{"background-image": `url(${require(`~/assets/img/app.jpg`)})`}'>
          <div :id="$style.logo" >
            <img src="~assets/img/logo_white.svg" alt="logo-supergreenlab">
            <img :class="$style.scale" src="~assets/img/appstore2.png" alt="logo-appstore">
            <img :class="$style.scale" src="~assets/img/playstore2.png" alt="logo-playstore">
          </div>
        </div>
      </div>
      <div :class="$style.description">
        <!-- <div :id='$style.title'>Like a tiny <strong>ecosystem</strong>, in a cupboard </div> -->
        <div :class="$style.bullets">
          <div>There’s no secret to growing nice plants, <strong>you have to become a better grower yourself</strong>.</div>
          <div>The <span :class="$style.bolder">Super</span><strong>Green</strong><span :class="$style.bolder">Lab</span> app does not only control the box parameters, it’s also your <strong>private grow diary & assistant</strong>.</div>
          <div><strong>This app will help you grow green thumbs</strong>, by allowing you to keep track of all actions you perform on your plant and its environment.</div>
          <div>Setup reminders and alerts, take notes and pics of your plant trainings and <strong>boost your growing skills</strong>.</div>
          <div>And because we’re a community before all, you can also <strong>check other people’s public diaries for help and inspiration</strong>!</div>
        </div>
      </div>
    </div>

    <div :class='$style.title'>
        <SectionTitle title='App **features**'
                        brackets='(non exhaustive)'
                        subtitle='Community driven development, don’t forget to cast your vote!'
                       />
    </div>
    <AppFeature />
    <div :class="$style.body">
      <div :class='$style.iconcontainer'>
        <div :id='$style.picture2' :style='{"background-image": `url(${require(`~/assets/img/app2.png`)})`}'>
          <div :id="$style.logo2" >
            <img src="~assets/img/logo.svg" alt="logo-supergreenlab">
            <img :class="$style.scale" src="~assets/img/appstore2.png" alt="logo-appstore">
            <img :class="$style.scale" src="~assets/img/playstore2.png" alt="logo-playstore">
          </div>
        </div>
      </div>
      <div :class="$style.description">
        <div :class="$style.bullets">
          <div>Keep an eye on your plant environement <strong>from anywhere</strong>.</div>
          <div><strong>Configure your alerts</strong>, the app will tell you when the temperature or humidity is out of range</div>
          <div>Keep track of your waterings to make sure your don’t over or under water,<strong> setup reminders</strong>!</div>
          <div><strong>Measure the progression</strong> of your plant over time</div>
          <div><strong>Add a remote camera</strong> to your grow box and get <strong>daily/weekly timelapses</strong></div>
          <div><strong>Take notes and pics of your plant training</strong> and boost your growing skills</div>
          <div>Consult other people’s public diaries for <strong>help and inspiration</strong></div>
          <div>And<strong> many more</strong>..</div>
        </div>
      </div>
    </div>

  </section>
</template>


<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import AppFeature from '~/components/home/appfeature.vue'


export default {
  components: { SectionTitle, AppFeature },
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
  max-width: 800pt
  flex-direction: column
  align-items: center
  color: #323232
  margin-bottom: 20pt

.title
  font-family: Roboto
  width: 100%
  margin: 30pt 0 30pt 0
  @media only screen and (max-width: 600px)
    margin: 0

#title
  font-size: 2.3em
  color: #323232
  font-weight: bold
  margin-bottom: 15pt
  @media only screen and (max-width: 600px)
    font-size: 1.7em
    margin: 5pt

#title strong
  color: #3BB30B
  font-weight: bold

.body
  display: flex
  margin: 0pt 0pt 50pt 0pt
  width: 100%
  @media only screen and (max-width: 600px)
    flex-direction: column !important
    margin: 0pt 0pt 20pt 0pt

.iconcontainer
  display: flex
  justify-content: center
  align-items: center
  margin: 5pt 20pt 5pt 5pt
  @media only screen and (max-width: 600px)
    margin: 0 5pt


.description
  display: flex
  flex: 1
  flex-direction: column
  justify-content: flex-start
  @media only screen and (max-width: 600px)
    margin: 20pt 15pt 0

.bullets
  font-size: 1.1em
  height: 100%
  display: flex
  flex-direction: column
  justify-content: space-around
  text-align: justify

.bullets div
  @media only screen and (max-width: 600px)
    margin: 5pt 0

.bullets strong
  color: #3BB30B
  font-weight: bold


#picture
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

#picture2
  width: 250pt
  height: 250pt
  background-position: center
  background-repeat: no-repeat
  background-size: contain
  display: flex
  align-items: center

#logo2
  margin: 5pt
  display: flex;
  flex-direction: column
  width: 35pt

#logo
  margin: 5pt
  display: flex;
  height: 35pt;

.scale
  cursor: pointer

.scale:hover
  transform: scale(1.05)
</style>
