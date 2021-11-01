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
        <div :class="$style.subtitle">All good, <strong> I got this</strong></div>
        <nuxt-link @click.native='onClick' to='/shop' :id='$style.picture' :style='{"background-image": `url(${require(`~/assets/img/shopicon.png`)})`}'></nuxt-link>
        <div :class="$style.subtitle">Go to <strong><nuxt-link to="/shop">the shop ></nuxt-link></strong></div>
      </div>
      <div :id='$style.description'>
        <div :id='$style.bullets'>
          <div><strong>Growing your own is simple</strong> but it’s easy to get overwhelmed by all the info and different products available online.</div>

          <div>Our goal is to make growing as simple as possible for you to enjoy!</div>

          <div>So, we made <strong>complete shopping lists</strong> to get you <strong>from seed to weed</strong> 🌱</div>

          <div>Order everything you need to grow your own weed in our new <b>Super</b><strong>Green</strong><b>Lab</b> Growshop 💚</div>

          <nuxt-link @click.native='onClick' to='/shop' :id='$style.btnshop'>Want more ?<br/>Visit our shop</nuxt-link>
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
    onClick() {
      this.$analytics.trackEvent('front-page', 'click', 'gotoshop')
    },
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
    margin-bottom: 20pt

#description
  display: flex
  flex: 1
  flex-direction: column
  justify-content: flex-start
  margin: 0pt 20pt 0 10pt

#bullets
  font-size: 1.1em
  height: 100%
  display: flex
  flex-direction: column
  justify-content: space-around

#bullets strong
  color: #3BB30B
  font-weight: bold

#bullets > div
  margin: 0 0 10pt 0

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

#btnshop
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

#btnshop:hover
  background-color: #2F880B

.subtitle strong a
  text-decoration: none
  color: #3BB30B

</style>
