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
    <!-- <div :class='$style.bannerPic' :style='{"background-image": `url(${require(`~/assets/img/${config.picture[0].fileLarge}`)})`}'></div> -->
    <div :id="$style.test">{{ config.title }}</div>
    <div>{{ config.description }}</div>
    <div>{{ config.products }}</div>
  </section>
</template>

<script>
export default {
  props: ['config']
}
</script>

<style module lang=stylus>

#container
  width: 100%
  height: 165pt
  text-align: center
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

#bannerPic
  width: 100%
  height: 100%
  background-position: center
  background-size: contain
  background-repeat: no-repeat



</style>
