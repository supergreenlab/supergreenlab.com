<!--
      Copyright (C) 2023  SuperGreenLab <towelie@supergreenlab.com>
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
  <div :id='$style.container'>
    <video width='97%' height='97%' autoplay loop>
      <source :src='video' type='video/mp4'>
    </video>
    <img src='~/assets/img/app/mobile-frame.png' />
  </div>
</template>

<script>

export default {
  props: ['video',],
}

</script>

<style module lang=stylus>

#container
  display: flex
  position: relative
  width: 200px
  height: 400px

#container video
  margin-top: 1.5%
  margin-left: 1.5%
  border-radius: 15px

#container img
  position: absolute
  top: 0
  left:0
  width: 100%
  height: 100%

</style>
