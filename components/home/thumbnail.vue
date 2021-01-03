<!--
      Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
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
  <div
    @mouseover='$emit("mouseover")'
    :id='$style.thumbnail'
    :style='{"background-image": `url(${require(`~/assets/img/${asset}`)})`}'>
    <img src='~assets/img/youtube-play.png' />
    <a @click='$emit("click")' :href='url' target='_blank'></a>
  </div>
</template>

<script>
export default {
  props: ['asset', 'url',],
}
</script>

<style module lang=stylus>

#thumbnail
  width: 100%
  height: 100%
  position: relative
  display: flex
  align-items: center
  justify-content: center
  background-position: center
  background-size: contain
  background-repeat: no-repeat

#thumbnail > img
  transition: opacity 0.2s
  @media only screen and (max-width: 600px)
    max-width: 25%

#thumbnail:hover > img
  opacity: 90%

#thumbnail > a
  display: block
  position: absolute
  width: 100%
  height: 100%

</style>
