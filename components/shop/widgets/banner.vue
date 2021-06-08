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
  <div :id='$style.pictureBanner' :style='{"background-image": `url(${require(`~/assets/img/${config.picture[0].fileLarge}`)})`}'>
    <div :id='$style.titleBanner'>title: {{ config.title }}</div>
    <div :id='$style.productsBanner'>products: {{ config.products }}</div>
    <div :id='$style.linkBanner'>link: {{ config.link }}</div>
  </div>
</template>

<script>

export default {
  props: ['config']
}
</script>

<style module lang=stylus>

#pictureBanner
  height: 200px
  margin: 5px
  background-position: center
  background-size: contain
  background-repeat: no-repeat

</style>
