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
    <div :class='$style.title'>
      <SectionTitle title='ALL-IN-ONE **FEATURE** SET'
                      center='true'
                      :border='false'/>
    </div>

    <div :id='$style.menu'>
      <nuxt-link :class='$style.item' :to='{path: "/app", hash: "#remote"}'>
        <img src='~/assets/img/app/icon-remote-control.svg' />
        <p>REMOTE CONTROL & <span :class='$style.green'>MONITORING</span></p>
      </nuxt-link>
      <nuxt-link :class='$style.item' :to='{path: "/app", hash: "#timelapse"}'>
        <img src='~/assets/img/app/icon-timelapse.svg' />
        <p>TIMELAPSE <span :class='$style.green'>CAMERA</span></p>
      </nuxt-link>
      <nuxt-link :class='$style.item' :to='{path: "/app", hash: "#checklists"}'>
        <img src='~/assets/img/app/icon-checklists.svg' />
        <p>CHECKLISTS & <span :class='$style.green'>LESSONS</span></p>
      </nuxt-link>
      <nuxt-link :class='$style.item' :to='{path: "/app", hash: "#diary"}'>
        <img src='~/assets/img/app/icon-diary.svg' />
        <p>PINLOCKED <span :class='$style.green'>DIARY</span></p>
      </nuxt-link>
    </div>
  </section>
</template>

<script>

import SectionTitle from '~/components/widgets/sectiontitle.vue'

export default {
  components: {SectionTitle, },
}

</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  height: 50vh
  @media only screen and (max-width: 600px)
    height: 70vh

.title
  font-family: Roboto
  width: 100%
  margin: 30pt 0 30pt 0
  @media only screen and (max-width: 600px)
    margin: 0

#menu
  display: flex
  justify-content: center

.item
  display: flex
  flex-direction: column
  align-items: center
  max-width: 150px
  text-decoration: none
  color: black
  margin: 0 20px
  color: #454545
  @media only screen and (max-width: 600px)
    max-width: 100px
    margin: 0px

.item:hover
  text-decoration: underline

.item > img
  margin-bottom: 15px
  height: 60px

.item > p
  text-align: center
  font-weight: bold
  font-size: 0.92em

.green
  color: #3bb30b

</style>
