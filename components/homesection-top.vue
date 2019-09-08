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
    <div :id='$style.background'></div>
    <!--<div :id='$style.ad'>Head over to our shop to design your home grow bundle!</div>-->
		<svg :class="$style.waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
										 viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
			<defs>
			<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
			</defs>
			<g :class="$style.parallax">
        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(59, 179, 11, 0.3)" />
        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(59, 179, 11, 0.2)" />
        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(59, 179, 11, 0.1)" />
        <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(59, 179, 11, 0.3)" />
			</g>
		</svg>
		</div>
    <div :id='$style.body'>
        <div :class='$style.product + " " + (n == 0 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        green='TV Stand'
                        title2='can grow weed'
                        smalltitle="you just didn't know it (yet)"/>
        </div>
        <div :class='$style.product + " " + (n == 1 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        green='wardrobe'
                        title2='can grow weed'
                        smalltitle="you just didn't know it (yet)"/>
        </div>
        <div :class='$style.product + " " + (n == 2 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        green='closet'
                        title2='can grow weed'
                        smalltitle="you just didn't know it (yet)"/>
        </div>
        <div :class='$style.product + " " + (n == 3 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        green='office storage'
                        title2='can grow weed'
                        smalltitle="you just didn't know it (yet)"/>
        </div>
        <div :class='$style.product + " " + (n == 4 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        green='cabinet'
                        title2='can grow weed'
                        smalltitle="you just didn't know it (yet)"/>
        </div>
        <div :class='$style.product + " " + (n == 5 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        green='old fridge'
                        title2='can grow weed'
                        smalltitle="you just didn't know it (yet)"/>
        </div>
        <div :class='$style.product + " " + (n == 6 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        green='cupboard'
                        title2='can grow weed'
                        smalltitle="you just didn't know it (yet)"/>
        </div>
        <div :class='$style.product + " " + (n == 7 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        green='coffee table'
                        title2='can grow weed'
                        smalltitle="you just didn't know it (yet)"/>
        </div>
        <div :class='$style.product + " " + (n == 8 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        green='Carboard box'
                        title2='can grow weed'
                        smalltitle="you just didn't know it (yet)"/>
        </div>
        <div :class='$style.product + " " + (n == 9 ? $style.shown : "")'>
          <SectionTitle title='Your'
                        green='plumbus'
                        title2='can grow weed'
                        smalltitle="you just didn't know it (yet)"/>
        </div>
    </div>
    <nuxt-link  :id='$style.cta' @click.native='ctaClicked' :to='{path: "/", hash: "#use-steps"}'>
      <b class="hvr-grow">Learn how</b>
    </nuxt-link>
    <small :id='$style.legal'>
      By proceeding, you explicitly agree that you are acting in coordinance with<br />
      local, state, and federal laws. SuperGreenLabs will not be liable for<br />
      consequences surrounding the legality of how the lights or grow bundle are used. 
    </small>
  </section>
</template>

<script>
import Logo from '~/components/logo.vue'
import SectionTitle from '~/components/sectiontitle.vue'

export default {
  components: { Logo, SectionTitle, },
  data() {
    return {n: 0}
  },
  created() {
    this.interval = setInterval(() => {
      this.n = (this.n + 1) % 10
    }, 2000)
  },
  destroyed() {
    clearInterval(this.interval)
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
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center
  min-height: 100vh

#background
  position: absolute
  width: 100vw
  height: 100vh
  background: linear-gradient(0deg, rgba(59, 179, 11,0.5) 0%, rgba(255, 255, 255, 0.5) 45%)

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

#tvstand
  background-image: url('~assets/img/tvstand.png')
  @media only screen and (max-width: 600px)
    top: 10%
    height: 80%

#office
  background-image: url('~assets/img/office.png')
  top: 20%
  @media only screen and (max-width: 600px)
    height: 70%

#dombas
  background-image: url('~assets/img/dombas.png')
  top: 10%
  height: 90%

#all
  background-image: url('~assets/img/all-sgl.png')
  top: 5%
  height: 90%
  @media only screen and (max-width: 600px)
    height: 70%
    top: 15%

#productbg
  position: absolute
  top: 10%
  left: 10%
  width: 80%
  height: 80%
  background-image: url("~assets/img/bg-front.svg")
  background-position: center
  background-repeat: no-repeat
  background-size: contain

#mobile
  width: 100pt
  height: 80%
  position: absolute
  bottom: 0
  left: calc(50% + 80pt)
  background-image: url("~assets/img/mobile.png")
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  transform: translate(0, 25%)
  @media only screen and (max-width: 600px)
    left: calc(50% + 10pt)

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
  margin-bottom: 20pt
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
  z-index: 100
  font-weight: 300
  text-align: center
  margin-bottom: 5pt

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
  margin-bottom:-7px
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

</style>
