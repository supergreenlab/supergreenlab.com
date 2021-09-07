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
  <section :id='$style.container'>
    <div :id='$style.background' v-if='startanimation' :style='{"background-image": `url(${require(`~/assets/img/top-bg${n % 9 + 1}.jpg`)})`}'></div>
    <div :id='$style.background' :style='{"background-image": `url(${require(`~/assets/img/top-bg0.jpg`)})`, opacity: n == -1 ? 1 : 0}'></div>
    <div :id='$style.background' v-if='startanimation' v-for='i in 12' :key='i' :style='{"background-image": `url(${require(`~/assets/img/top-bg${i}.jpg`)})`, opacity: i == (n % 9 + 1) ? 1 : 0}'></div>
    <div :id='$style.body'>
        <div :class='$style.product + " " + (parseInt(n / 3) % 10 == 0 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        :white='true'
                        green='TV Stand'
                        title2='can grow plants'
                        smalltitle="you just didn't know it (yet)"/>
        </div>
        <div :class='$style.product + " " + (parseInt(n / 3)  % 10 == 1 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        :white='true'
                        green='wardrobe'
                        title2='can grow plants'
                        smalltitle="it's actually quite easy you know?"/>
        </div>
        <div :class='$style.product + " " + (parseInt(n / 3)  % 10 == 2 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        :white='true'
                        green='closet'
                        title2='can grow plants'
                        smalltitle="we sell LED lights with climate control kits"/>
        </div>
        <div :class='$style.product + " " + (parseInt(n / 3)  % 10 == 3 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        :white='true'
                        green='office storage'
                        title2='can grow plants'
                        smalltitle="and it's all controlled by an app!"/>
        </div>
        <div :class='$style.product + " " + (parseInt(n / 3)  % 10 == 4 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        :white='true'
                        green='cabinet'
                        title2='can grow plants'
                        smalltitle="so you can turn any furniture"/>
        </div>
        <div :class='$style.product + " " + (parseInt(n / 3)  % 10 == 5 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        :white='true'
                        green='old fridge'
                        title2='can grow plants'
                        smalltitle="into a connected grow box"/>
        </div>
        <div :class='$style.product + " " + (parseInt(n / 3)  % 10 == 6 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        :white='true'
                        green='cupboard'
                        title2='can grow plants'
                        smalltitle="and that's amazing"/>
        </div>
        <div :class='$style.product + " " + (parseInt(n / 3)  % 10 == 7 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        :white='true'
                        green='coffee table'
                        title2='can grow plants'
                        smalltitle="just press the START GROWING button"/>
        </div>
        <div :class='$style.product + " " + (parseInt(n / 3)  % 10 == 8 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        :white='true'
                        green='Carboard box'
                        title2='can grow plants'
                        smalltitle="get yours now:)"/>
        </div>
        <div :class='$style.product + " " + (parseInt(n / 3)  % 10 == 9 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        :white='true'
                        green='plumbus'
                        title2='can grow plants'
                        smalltitle="and it's open-source btw"/>
        </div>
    </div>
    <nuxt-link  :id='$style.cta' @click.native='ctaClicked' :to='{path: "/", hash: "#use-steps"}'>
      <b class="hvr-grow">Start growing</b>
    </nuxt-link>
  </section>
</template>

<script>
import Logo from '~/components/widgets/logo.vue'
import SectionTitle from '~/components/widgets/sectiontitle.vue'

export default {
  components: { Logo, SectionTitle, },
  props: ['focus'],
  data() {
    return {
      n: -1,
      startanimation: false,
    }
  },
  created() {
    if (process.server) return
    setTimeout(() => {
      this.$data.startanimation = true
      this.interval = setInterval(() => {
        this.$data.n = this.$data.n + 1
      }, 1500)
    }, 1000)
  },
  destroyed() {
    if (this.interval) clearInterval(this.interval)
  },
  methods: {
    ctaClicked() {
      this.$matomo && this.$matomo.trackEvent('front-page', 'cta', 'top')
    }
  },
}
</script>

<style module lang=stylus>

#container
  font-family: Roboto
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center
  min-height: 100vh
  background-color: black

#background
  position: absolute
  width: 100vw
  height: 100vh
  background-size: cover
  background-position: bottom
  background-repeat: no-repeat
  background-blend-mode: overlay
  transition: opacity 0.75s
  @media only screen and (max-width: 600px)
    background-position: 15% 100%

#ad
  position: absolute
  width: 100%
  top: 0
  left: 0
  background-color: #3BB30B
  text-align: center
  color: white
  font-weight: 400
  padding: 5pt 0

#top
  margin: 80pt 0 0
  @media only screen and (max-width: 600px)
    margin: 50pt 0 0

#body
  flex: 1
  display: flex
  position: relative
  height: 100%
  width: 100%
  padding: 80pt 0 0
  flex-direction: column
  justify-content: center
  align-items: center
  margin: 0pt 0 40pt
  font-size: 3em
  @media only screen and (max-width: 600px)
    font-size: 1.5em

.product
  position: absolute
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  opacity: 0
  transition: opacity 1s

.shown
  opacity: 1

#cta
  display: flex
  flex-direction: column
  text-transform: uppercase
  color: white
  background-color: #3BB30B
  padding: 10pt 35pt
  border-radius: 3pt
  text-decoration: none
  text-align: center
  z-index: 100
  margin-bottom: 50pt
  font-size: 1.5em
  @media only screen and (max-width: 600px)
    font-size: 1.1em

#cta > small
  padding-top: 5pt
  font-weight: 300
  font-size: 1.1em

#cta > b
  font-weight: 600

#legal
  color: white
  z-index: 100
  font-weight: 300
  text-align: center
  margin-bottom: 5pt
  @media only screen and (min-width: 600px)
    font-size: 1.1em

#shop
  position: absolute
  top: 20pt
  right: 0pt
  margin: 5pt
  color: #3BB30B
  font-size: 0.8em
  font-weight: 600
  z-index: 1000

.waves 
  position:absolute
  bottom: 0
  left: 0
  width: 100%
  height:30vh
  min-height:100px
  max-height:200px

.content 
  position:relative
  height:20vh
  text-align:center
  background-color: #3bb30b

.parallax > use 
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite

.parallax > use:nth-child(1) 
  animation-delay: -2s
  animation-duration: 7s

.parallax > use:nth-child(2) 
  animation-delay: -3s
  animation-duration: 10s

.parallax > use:nth-child(3) 
  animation-delay: -4s
  animation-duration: 13s

.parallax > use:nth-child(4) 
  animation-delay: -5s
  animation-duration: 20s

@keyframes move-forever  {
  0% {
    transform: translate3d(-90px,0,0)
  }
  100% {
    transform: translate3d(85px,0,0)
  }
}

#transition
  position: absolute
  top: 100%
  left: 0
  background-color: #5CBF36
  width: 100vw
  height: 20pt

</style>
