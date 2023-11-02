<!--
      Copyright (C) 2023  SuperGreenLab <towelie@supergreenlab.com>
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

      <div :id='$style.logocontainer'>
        <div :id='$style.logo'>
          <span>S<span :class='$style.supersmall'>upe</span>r</span>
          <span :class='$style.supergreen'>G<span :class='$style.supersmall'>ree</span>n</span>
          <span>A<span :class='$style.supersmall'>a</span>p</span>
        </div>
      </div>

      <div :id='$style.intro'>
        <img :id='$style.topappview' src='~/assets/img/app/main-app-view.png' />
        <div :id='$style.introtext'>
          <h1>THE BEST <span :class='$style.green'>GROWING</span> APP</h1>
          <b>Whether you’re new to growing</b> and need help, <b>or are an advance grower</b> that want to experiment with advanced technics, the <b>SuperGreenLab</b> app can help.<br /><br />

          On top of it’s remote control and monitoring features, the SuperGreenLab app also features an <b>advanced checklist/reminder system</b>.<br /><br />

          <b>By monitoring your diary and environment the app</b> will give your notifications to never mess up your grow.<br /><br />

          <Install />
        </div>
      </div>

  </section>
</template>

<script>

import SectionTitle from '~/components/widgets/sectiontitle.vue'
import Install from '~/components/app/install.vue'

export default {
  components: {SectionTitle, Install, },
}

</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  align-items: center
  margin-top: 60px
  @media only screen and (max-width: 600px)
    margin-top: 0px

#logocontainer
  display: flex
  white-space: nowrap
  font-size: 4em
  margin-top: 40px
  margin-bottom: 80px
  @media only screen and (max-width: 600px)
    margin-top: 20px
    margin-bottom: 40px

#logo
  display: flex
  font-family: 'PlumeAd'
  text-transform: uppercase
  letter-spacing: 1pt
  word-spacing: -15pt
  @media only screen and (max-width: 600px)
    flex-direction: column
    align-items: center

#logo > span
  line-height: 50px

.supergreen
  color: #3BB30B
  @media only screen and (max-width: 600px)
    font-size: 1.3em

.supersmall
  font-size: 0.8em

#intro
  display: flex
  align-items: center
  @media only screen and (max-width: 600px)
    padding: 0 25px
    flex-direction: column

.green
  color: #3bb30b

#topappview
  max-height: 50vh

#introtext
  font-size: 1
  max-width: 400px

#introtext h1
  margin-bottom: 40px

</style>
