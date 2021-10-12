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
        <SectionTitle title='Perfect bundles for **home growing**'
                        subtitle='For those that want to keep it **discreet and stealthy**, or **just fancy...**'
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
        <div :id='$style.title'>Like a tiny <strong>ecosystem</strong>, in a cupboard </div>
        <div :id='$style.bullets'>
          <div>Growing plants indoor means that apart from the usual soil, nutrient and water you will also need to provide <strong>sunlight and fresh air</strong>.</div>
          <div>While there are already a lot of solutions when it comes to soil and nutrient, <strong>there were no lighting solution that could fit tight spaces</strong>.</div>
          <div><b>Super</b><strong>Green</strong><b>Lab</b> designed the <strong>first grow bundle</strong> dedicated to creating the perfect growing environment in virtually <strong>any kind of furniture</strong>.</div>
        </div>
      </div>
    </div>
    <Examples ref='examples' />
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
  max-width: 800pt
  flex-direction: column
  align-items: center
  color: #323232
  margin-bottom: 20pt

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
    margin: 10pt 5pt

#title strong
  color: #3BB30B
  font-weight: bold

#body
  display: flex
  margin: 0pt 0pt 50pt 0pt
  @media only screen and (max-width: 600px)
    flex-direction: column !important
    margin: 0

#iconcontainer
  display: flex
  justify-content: center
  align-items: center
  margin: 0 10pt

#description
  display: flex
  flex: 1
  flex-direction: column
  text-align: justify
  justify-content: flex-start
  margin: 0pt 20pt 0 10pt

#bullets
  height: 100%
  display: flex
  flex-direction: column
  font-size: 1.1em
  @media only screen and (max-width: 600px)
    margin: 5pt

#bullets strong
  color: #3BB30B
  font-weight: bold

#bullets > div
  margin: 5pt 0

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
