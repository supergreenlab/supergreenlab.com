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
    <div :id='$style.body'>
      <div :id='$style.iconcontainer'>
        <video :id='$style.video' autoplay loop playsinline muted defaultMuted>
          <source src="/continuous_supply.mp4" type="video/mp4">
          <source src="/continuous_supply.webm" type="video/webm">
          Your browser does not support the video tag.
        </video>
      </div>
      <div :id='$style.description'>
        <div :id='$style.title'>Welcome to the <strong>best hobby</strong> in the world!</div>
        <div :id='$style.bullets'>
          <div>Super<strong>Green</strong>Lab is a <strong>community</strong> dedicated to <strong>personal home growing in small and discreet spaces</strong>.</div>
          <div>If there’s one plant that should be <strong>home grown</strong>, it’s <strong>cannabis</strong>. Even a single plant can give you the <strong>quantity and quadivty to become self sufficient</strong>.</div>
          <div>And <strong>no need for a big and ugly setup anymore</strong>!</div>
          <div>Pick any furniture that fits your taste and <strong>grow weed out of it</strong>!</div>
          <div>Super<strong>Green</strong>Lab brings you all the technology and knowledge to <strong>start growing your own</strong>.</div>
        </div>
      </div>
    </div>
    <UseSteps ref='use-steps' />
  </section>
</template>


<script>
import UseSteps from '~/components/home/use-steps.vue'


export default {
  components: { UseSteps, },
  props: [ 'bulletpoints', 'title'],
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {

  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  color: #454545

#title
  font-size: 2.3em
  color: #5D5D5D
  font-weight: bold
  @media only screen and (max-width: 600px)
    font-size: 1.7em
    margin: 5pt

#title strong
  color: #3BB30B
  font-weight: bold

#body
  display: flex
  margin: 0pt 30pt 50pt 30pt
  @media only screen and (max-width: 600px)
    flex-direction: column !important
    margin: 0pt 0pt

#iconcontainer
  display: flex
  justify-content: center
  align-items: center
  width: 40%
  cursor: pointer
  @media only screen and (max-width: 600px)
    width: 100%


#description
  display: flex
  flex: 1
  flex-direction: column
  justify-content: flex-start
  @media only screen and (max-width: 600px)
    margin: 0pt 10pt

#bullets
  height: 100%
  display: flex
  flex-direction: column
  justify-content: space-between


#bullets strong
  color: #3BB30B
  font-weight: bold

#video
  width: 300pt
  /* height: 300pt */
  object-fit: contain
  object-position: center
  @media only screen and (max-width: 600px)
    height: 100%

</style>
