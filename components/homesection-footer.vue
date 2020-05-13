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
<footer :id='$style.container' class="fdb-block footer-large fp-active" data-block-type="footers" data-id="1">
  <div class="container">
    <div class="row align-items-top text-center">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 text-sm-left">
        <h3><strong>Products</strong></h3>
        <nav class="nav flex-column">
          <nuxt-link class="nav-link" to="/bundle/micro-box-bundle">Ninja Bundle</nuxt-link>
        </nav>
      </div>

      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mt-5 mt-sm-0 text-sm-left">
        <h3><strong>Help</strong></h3>
        <nav class="nav flex-column">
          <nuxt-link class="nav-link active" :to="{path: '/privacy'}">Privacy Policy</nuxt-link>
          <nuxt-link class="nav-link" to="/terms">Terms</nuxt-link>
          <nuxt-link class="nav-link" to="/faq">FAQ</nuxt-link>
          <a class="nav-link" href="https://www.supergreenlab.com/discord">Discord Support</a>
        </nav>
      </div>

      <div class="col-12 col-md-4 col-lg-3 text-md-left mt-5 mt-md-0">
        <h3><strong>About Us</strong></h3>
        <p><font size="3" style=" font-weight: 300;" >We sell LED growlights while providing open-source hardware and software for stealthy cannabis growing systems.</font></p>
      </div>

      <div class="col-12 col-lg-2 ml-auto text-lg-left mt-4 mt-lg-0">
        <h3><strong>Follow Us</strong></h3>
        <p class="lead">
				<a href="https://www.facebook.com/supergreenlab"><i class="fa fa-facebook-square"></i></a>
				<a href="https://twitter.com/SuperGreenLab"><i class="fa fa-twitter"></i></a>
				<a href="https://www.instagram.com/sgreenlab/"><i class="fa fa-instagram"></i></a>
				<a href="https://supergreenlab.tumblr.com/"><i class="fa fa-tumblr-square"></i></a>
        <a href="https://www.reddit.com/r/SuperGreenLab/"><i class="fa fa-reddit"></i></a>
        <a href="https://www.youtube.com/c/supergreenlab"><i class="fa fa-youtube"></i></a>
        <a href="https://github.com/supergreenlab"><i class="fa fa-github"></i></a>
        </p>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col text-center">
        <font size="3" style=" font-weight: 500;" >© 2019 SuperGreenLab. All Rights Reserved</font>
      </div>
    </div>
  </div>
</footer>
</template>

<script>

export default {

}
</script>

<style module lang=stylus>

#container
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%
  margin-top: 20pt
  padding: 25pt 0 25pt 0
  border-top: 2pt solid #efefef
  @media only screen and (max-width: 600px)
    flex-direction: column

.block
  display: flex
  margin: 10pt

.blockicon
  width: 20pt
  height: 20pt
  margin: 5pt

a:hover 
  color: #19ab00
</style>
