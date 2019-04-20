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
    <!--<a href='https://shop.supergreenlab.com' :id='$style.shop'>Direct access to shop</a>-->
    <div :id='$style.logo'>
      <Logo overtitle='Welcome to' subtitle='Growhop.' />
    </div>
    <div :id='$style.body'>
      <div :id='$style.products'></div>
      <a href='https://shop.supergreenlab.com/' :id='$style.cta'>
        <b>build your automated<br />growbox</b>
        <small>starts $299</small>
      </a>
    </div>
    <small :id='$style.trustmeimalawyer'>
      Clicking any of these buttons confirms that you are major in<br />
      your state and are not violating any laws. Whatsoever. Not even a parking ticket.
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

#logo
  margin: 50pt 0 0
  font-size: 3em

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

#cta > small
  padding-top: 5pt
  font-weight: 300
  font-size: 1.1em

#trustmeimalawyer
  font-weight: 300
  text-align: center
  margin-bottom: 5pt

#shop
  position: absolute
  top: 0pt
  right: 0pt
  margin: 5pt
  color: #3BB30B
  font-size: 0.8em
  font-weight: 600

</style>
