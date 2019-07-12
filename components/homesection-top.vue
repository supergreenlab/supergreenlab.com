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
    <!--<div :id='$style.ad'>Head over to our shop to design your home grow bundle!</div>-->
    <div :id='$style.logo'>
      <Logo />
    </div>
    <div>
      <SectionTitle title='Transform any furniture into a'
        green='connected growbox'/>
    </div>
    <div :id='$style.body'>
      <div :id='$style.productbg'></div>
      <div :id='$style.carousel'>
        {{ n }}
        <div :class='$style.product + " " + (n == 0 ? $style.shown : "")' :id='$style.tvstand'></div>
        <div :class='$style.product + " " + (n == 1 ? $style.shown : "")' :id='$style.office'></div>
        <div :class='$style.product + " " + (n == 2 ? $style.shown : "")' :id='$style.dombas'></div>
        <div :class='$style.product + " " + (n == 3 ? $style.shown : "")' :id='$style.all'></div>
        <div :id='$style.mobile'></div>
      </div>
    </div>
    <small :id='$style.trustmeimalawyer'>
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
      this.n = (this.n + 1) % 4
    }, 4000)
  },
  destroyed() {
    clearInterval(this.interval)
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

#logo
  margin: 80pt 0 0
  font-size: 3.5em
  z-index: 100

#body
  flex: 1
  display: flex
  position: relative
  height: 100%
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center
  margin: 0pt 0 40pt

.product
  width: 80%
  height: 80%
  position: absolute
  top: 10%
  left: 10%
  opacity: 0
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  transition: opacity 2s

.shown
  opacity: 1

#tvstand
  background-image: url('~assets/img/tvstand.png')

#office
  background-image: url('~assets/img/office.png')
  top: 20%

#dombas
  background-image: url('~assets/img/dombas.png')
  top: 10%
  height: 90%

#all
  background-image: url('~assets/img/all-sgl.png')
  top: 5%
  height: 90%

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
  height: 300pt
  position: absolute
  bottom: 0
  left: calc(50% + 80pt)
  background-image: url("~assets/img/mobile.png")
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  transform: translate(0, 25%)

#cta
  display: flex
  flex-direction: column
  text-transform: uppercase
  color: white
  background-color: #3BB30B
  padding: 5pt 25pt
  border-radius: 5pt
  text-decoration: none
  text-align: center
  font-size: 0.9em
  z-index: 100

#cta > small
  padding-top: 5pt
  font-weight: 300
  font-size: 1.1em

#cta > b
  font-weight: 600

#trustmeimalawyer
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

</style>
