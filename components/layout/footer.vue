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
    <div :id='$style.nav'>
      <div :class='$style.links'>
        <h3><strong>Products</strong></h3>
        <nuxt-link to="/bundle/micro-box-bundle">Ninja Bundle</nuxt-link>
      </div>

      <div :class='$style.links'>
        <h3><strong>Help</strong></h3>
        <nuxt-link to="/privacy">Privacy Policy</nuxt-link>
        <nuxt-link to="/faq">FAQ</nuxt-link>
        <nuxt-link to="/discord">Discord Support</nuxt-link>
        <nuxt-link to="/terms">Terms</nuxt-link>
      </div>

      <div :class='$style.links'>
        <h3><strong>About Us</strong></h3>
        <p><font size="3" style="font-weight: 300;" >We sell LED growlights while providing open-source software for stealthy cannabis growing systems.</font></p>
      </div>

      <div>
        <h3><strong>Follow Us</strong></h3>
        <a href="https://www.facebook.com/supergreenlab"><i class="fa fa-facebook-square"></i></a>
        <a href="https://twitter.com/SuperGreenLab"><i class="fa fa-twitter"></i></a>
        <a href="https://www.instagram.com/sgreenlab/"><i class="fa fa-instagram"></i></a>
        <a href="https://supergreenlab.tumblr.com/"><i class="fa fa-tumblr-square"></i></a>
        <a href="https://www.reddit.com/r/SuperGreenLab/"><i class="fa fa-reddit"></i></a>
        <a href="https://www.youtube.com/c/supergreenlab"><i class="fa fa-youtube"></i></a>
        <a href="https://github.com/supergreenlab"><i class="fa fa-github"></i></a>
      </div>
    </div>

    <div>
      <font size="3" style="font-weight: 500;" >© 2021 SuperGreenLab. All Rights Reserved</font>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style module lang=stylus>

#container
  display: flex
  align-items: center
  justify-content: space-around
  width: 100%
  margin-top: 20pt
  padding: 25pt 0 25pt 0
  border-top: 2pt solid #efefef
  flex-direction: column
  color: #343434
  background-color: white
  z-index: 2000

#container a
  color: #343434

#nav
  display: flex
  justify-content: center
  margin-top: 20pt
  padding: 25pt 0 25pt 0
  border-top: 2pt solid #efefef
  @media only screen and (max-width: 600px)
    flex-direction: column

#nav > div
  flex: 1
  max-width: 33%
  margin: 10pt 10pt
  @media only screen and (max-width: 600px)
    max-width: initial

.links
  display: flex
  flex-direction: column

</style>
