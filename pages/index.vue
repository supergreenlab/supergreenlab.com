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
    <!--<div :id='$style.ad'>Head over to our shop to design your home grow kit!</div>-->
    <a href='https://shop.supergreenlab.com' :id='$style.shop'>Direct access to shop</a>
    <div :id='$style.logo'>
      <Logo overtitle='Welcome to' subtitle='Growhop.' />
    </div>
    <div :id='$style.body'>
      <div :id='$style.products'></div>
      <nuxt-link to='/designer' :id='$style.cta'>
        <b>build your automated<br />growbox</b>
        <small>From $219</small>
      </nuxt-link>
    </div>
    <small :id='$style.trustmeimalawyer'>
      By proceeding, you explicitly agree that you are acting in coordinance with<br />
      local, state, and federal laws. SuperGreenLabs will not be liable for<br />
      consequences surrounding the legality of how the lights or grow kit are used. 
    </small>
  </section>
</template>

<script>
import Logo from '~/components/logo.vue'

export default {
  components: { Logo, },
}
</script>

<style module lang=stylus>

#container
  display: flex
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
  margin: 50pt 0 0
  font-size: 3em
  z-index: 100

#body
  flex: 1
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  margin: 0pt 0 40pt

#products
  flex: 1
  width: 100vw
  max-width: 400pt
  background-image: url("../assets/img/products.png")
  background-position: center
  background-repeat: no-repeat
  background-size: contain
  transform: scale(1.7)
  @media only screen and (max-width: 500px)
    transform: scale(1.0)
  @media only screen and (min-width: 500px) and (max-width: 800px)
    transform: scale(1.2)

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
