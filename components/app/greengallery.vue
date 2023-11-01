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
  <section :id='$style.container' :style='circle ? {"background-image": `url(${require("~/assets/img/app/background-gallery.svg")})`} : {}'>
    <div v-for='item in items' :class='{ [$style.item]: true, [$style.circle]: !!circle }'>
      <img :class='$style.pic' :src='item.pic' />
      <div :class='$style.title' v-html='$md.render(item.title)'></div>
      <div :class='$style.subtitle' v-html='$md.render(item.subtitle)'></div>
    </div>
  </section>
</template>

<script>

export default {
  props: ['items', 'circle',],
}

</script>

<style module lang=stylus>

#container
  display: flex
  justify-content: center
  margin: 30px 0
  background-repeat: norepeat
  background-size: contain
  width: 100vw

.item
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  width: 400px

.circle
  background-color: white
  border-radius: 50%
  margin: 60px 30px
  height: 350px
  width: 350px

.pic
  width: 68%

.circle .title
  margin-top: -5px

.title
  font-weight: bold
  margin-bottom: 10px

.title strong
  color: #3bb30b
  
.subtitle
  font-style: italic
  max-width: 50%
  text-align: center

</style>
