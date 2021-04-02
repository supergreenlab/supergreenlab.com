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
    <div :id='$style.subscribe'>
      <div :class='$style.title'>
        <h2>Subscribe</h2>
      </div>
      <div :class='$style.title'>
        <h3>Stay tunned with our newsletter and get exclusive promotion</h3>
      </div>
      <div :class='$style.title' :id="$style.email">
          <label for="email"> Email :</label>
          <input type="email" name="email" id="email">
      </div>
      <div :class='$style.buttons' :id='$style.btnSubscribe'>Subscribe</div>
      <div :id="$style.guidelogo" >
        <img src="~assets/img/logo_white.svg" alt="logo-supergreenlab">
      </div>
    </div>

  </section>
</template>

<script>



</script>

<style module lang=stylus>
#container
  background-color: #dedede
  width: 100%
  height: auto
  display: flex
  align-items: center
  flex-direction: column

#subscribe
  width: 100%
  margin: 5px
  display: flex
  flex-direction: column
  align-items: center

#btnSubscribe
  width: 170px
  @media only screen and (max-width: 600pt)
    width: 100px

.title
  margin: 5pt

h3
 text-align: center

#buttons
  width: 100%
  display: flex
  justify-content: space-between
  margin: 10pt

.buttons
  background-color: #3BB30B
  text-align: center
  padding: 3pt 15pt
  border-radius: 3pt
  color: white
  text-transform: uppercase
  text-decoration: none
  font-size: 1em
  margin: 10pt
  white-space: nowrap
  font-weight: bold
  @media only screen and (max-width: 600pt)
    font-size: 0.7em
    padding: 5pt 3pt
    margin: 3pt

#email
  background-color: #3BB30B
  border-radius: 5pt

input
  border: none
  padding: 5pt
  border-radius: 0pt 5pt 5pt 0pt

#guidelogo
  position: absolute
  right: 50px
  margin-top: 100px
  @media only screen and (max-width: 600pt)
    position: static
    margin-top: 8px

label
  text-align: center
  padding: 5pt 0pt 5pt 0pt
  color: white
  text-transform: uppercase
  font-size: 1em
  margin: 10pt
  font-weight: bold


</style>
