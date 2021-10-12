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
      <SectionTitle title='Turn **any furniture** into a **connected growbox**'
                      subtitle='That will **blend in** with the rest of your home'
                      center='true'
                      border='true'/>
    </div>
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
          <div><b>Super</b><strong>Green</strong><b>Lab</b> is a <strong>community</strong> dedicated to <strong>personal home growing in small and discreet spaces</strong>.</div>
          <div>If there’s one plant that should be <strong>home grown</strong>, it’s <strong>cannabis</strong>. Even a single plant can give you the <strong>quantity and quality to become self sufficient</strong>.</div>
          <div>And <strong>no need for a big and ugly setup anymore</strong>!</div>
          <div>Pick any furniture that fits your taste and <strong>grow weed out of it</strong>!</div>
          <div><b>Super</b><strong>Green</strong><b>Lab</b> brings you all the technology and knowledge to <strong>start growing your own</strong>.</div>
        </div>
      </div>
    </div>
    <div :id='$style.steps'>
      <UseSteps ref='use-steps' />
    </div>
  </section>
</template>


<script>
import UseSteps from '~/components/home/use-steps.vue'
import SectionTitle from '~/components/widgets/sectiontitle.vue'


export default {
  components: { UseSteps, SectionTitle},
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
  max-width: 800pt
  flex-direction: column
  align-items: center
  color: #323232

.title
  font-size: Roboto
  width: 100%
  margin: 30pt 0 30pt 0
  @media only screen and (max-width: 600px)
    margin: 0

#title
  font-family: Roboto
  font-size: 2em
  color: #323232
  font-weight: bold
  margin-bottom: 15pt
  @media only screen and (max-width: 600px)
    font-size: 1.4em
    margin: 5pt

#title strong
  color: #3BB30B
  font-weight: bold

#body
  display: flex
  width: 100%
  margin: 0pt 0pt 50pt 0pt
  @media only screen and (max-width: 600px)
    flex-direction: column !important
    margin: 0pt 0pt 20pt 0pt

#iconcontainer
  display: flex
  justify-content: center
  align-items: center
  width: 40%
  cursor: pointer
  margin: 0 10pt
  @media only screen and (max-width: 600px)
    margin-bottom: 20pt
    width: 90%
    align-self: center

#description
  display: flex
  flex: 1
  flex-direction: column
  justify-content: flex-start
  text-align: justify
  margin: 0pt 20pt 0 10pt

#bullets
  font-size: 1.1em
  height: 100%
  display: flex
  flex-direction: column
  @media only screen and (max-width: 600px)
    margin: 5pt

#bullets > div
  margin: 5pt 0

#bullets strong
  color: #3BB30B
  font-weight: bold

#video
  width: 100%
  /* height: 300pt */
  object-fit: contain
  object-position: center
  @media only screen and (max-width: 600px)
    height: 100%

#steps
  margin: 10pt 0

</style>
