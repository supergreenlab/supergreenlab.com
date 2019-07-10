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
    <div :id='$style.logo'>
      <Logo subtitle='Growshop.' />
    </div>
    <div :id='$style.menu'>
      <div :class='$style.selected'>Home</div>
      <div>Mono box kit</div>
      <div>Multi box kit</div>
      <div>Closet kit</div>
      <div>Microgrow kit</div>
    </div>
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
  width: 100%
  background-color: #EFEFEF
  align-items: center
  justify-content: space-between
  padding: 0 0 0 10pt

#menu
  display: flex

#menu > div
  color: #5D5D5D
  font-weight: 600
  padding: 15pt 15pt
  cursor: pointer
  text-decoration: underline
  text-transform: uppercase

#menu > div:hover
  background-color: #DEDEDE

#menu > div.selected
  color: white
  background-color: #3BB30B

#logo
  font-size: 1.5em

</style>
