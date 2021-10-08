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
      <SectionTitle title='You won’t be alone in your quest to **infinite weed**'
                    center='true'
                    border='true'/>
    </div>
     <div :id='$style.body'>
      <div :id='$style.iconcontainer'>
        <div :id='$style.picture' :style='{"background-image": `url(${require(`~/assets/img/discord.jpg`)})`}'>
          <div :id="$style.logo" >
            <img src="~assets/img/logo.svg" alt="logo-supergreenlab">
          </div>
        </div>
      </div>
      <div :id='$style.description'>
        <div :id='$style.bullets'>
          <div><strong>Buying a bundle gets you free access</strong> to the private <span :class="$style.bolder">Super</span><strong>Green</strong><span :class="$style.bolder">Lab</span> community support chat.</div>
          <div><strong>24/7 technical and plant support</strong> from us and the community.</div>
          <div>Hundreds of people willing to share their <strong>passion for growing and building grow boxes</strong>.</div>
          <div>Wether you’re an experienced grower or total noob, <strong>there’s always something to learn and share</strong>.</div>
          <div>The <span :class="$style.bolder">Super</span><strong>Green</strong><span :class="$style.bolder">Lab</span> private discord server is home to throusands of continuous discussions about <strong>people’s experiences</strong>.</div>
          <div>Using the search feature will allow you to dig old discussions about <strong>subjects that matter to your case</strong>.</div>
        </div>
        <nuxt-link to="/discord" :id="$style.btn"><img src='~/assets/img/discord-logo.jpg' />ACCESS DISCORD<br/>SERVER HERE</nuxt-link>
      </div>
    </div>
    <div :class='$style.title'>
      <SectionTitle title='Discussion **forums**'
                    brackets='(non exhaustive)'
                    subtitle='Here are some discussion topics you’ll find in the private section.'/>
    </div>
    <Discord />
  </section>
</template>


<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import Discord from '~/components/home/discord.vue'


export default {
  components: { SectionTitle, Discord },
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
    margin: 20pt 15pt 0

#bullets
  font-size: 1.1em
  height: 100%
  display: flex
  flex-direction: column
  justify-content: space-around
  text-align: justify

#bullets strong
  color: #3BB30B
  font-weight: bold

#bullets div
  @media only screen and (max-width: 600px)
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

.bolder
  font-weight: bold
  color: #323232

#btn
  font-family: 'Roboto'
  font-weight: 800
  width: 230pt
  background-color: #ffffff
  border: 4px solid #3bb30b
  text-align: center
  font-size: 1.3em
  display: flex
  justify-content:center
  align-items:center
  padding: 10pt
  margin: 10pt
  color: #515151
  border-radius: 5pt
  align-self: center
  text-transform: uppercase
  cursor: pointer
  text-decoration: none
  @media only screen and (max-width: 600px)
    margin-top: 25pt

#btn > img
  float: left
  max-width: 50pt
  max-height: 50pt
  margin-right: 10pt

</style>
