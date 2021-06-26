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
    <div :id='$style.buttons'>
      <div><nuxt-link to='#' :class='$style.buttons'> Previous Guide </nuxt-link></div>
      <div><nuxt-link to='/guides' :class='$style.buttons'>Back to SuperGreenPedia</nuxt-link></div>
      <div><nuxt-link to='#' :class='$style.buttons'>Next Guide</nuxt-link></div>
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

</style>
