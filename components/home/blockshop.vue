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
      <SectionTitle title='Ready to **grow**?'
                      subtitle='Order your kit and start your journey!'
                      center='true'
                      border='true'/>
    </div>
    <div :id='$style.body'>
      <div :id='$style.iconcontainer'>
        <div :class="$style.subtitle">All good, <strong>I got this</strong></div>
        <div :id='$style.picture' :style='{"background-image": `url(${require(`~/assets/img/shopicon.png`)})`}'>
        </div>
        <div :class="$style.subtitle">Go to <strong>the shop ></strong></div>
      </div>
      <div :id='$style.description'>
        <div :id='$style.bullets'>
          <div><strong>Head to our shop page</strong> to discover all our offers and upcoming products.you will also need to provide sunlight and fresh air.</div>
          <div>Make sure to <strong>subscribe to our newsletter</strong> to get special deals and promotions!.</div>
        </div>
      </div>
    </div>
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
  margin-bottom: 20pt

.title
  width: 100%
  margin: 60pt 0 60pt 0
  @media only screen and (max-width: 600px)
    margin: 0

#title
  font-size: 2.3em
  color: black
  font-weight: bold
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
  flex-direction: column
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
  height: 150pt
  background-position: center
  background-repeat: no-repeat
  background-size: contain
  display: flex
  justify-content: flex-start
  align-items: flex-end
  /* @media only screen and (max-width: 600pt)
    background-size: 100% */


.subtitle
  font-weight: bold
  font-size: 1.1em
  margin: 3pt

.subtitle strong
  color: #3BB30B

</style>
