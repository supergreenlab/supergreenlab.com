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
  <section :id='$style.container'>
    <div :id='$style.left'>
      <img v-if='!video' :src='icon' :class='iconClass' />
      <video v-else :class='iconClass' autoplay loop>
        <source :src='video' type='video/mp4'>
      </video>
      <h2 v-html='$md.render(title)'></h2>
      <p v-html='$md.render(subtitle)'></p>
      <slot></slot>
    </div>
    <div :id='$style.right' v-html='$md.render(description)'></div>
  </section>
</template>

<script>

export default {
  props: ['icon', 'video', 'iconClass', 'title', 'subtitle', 'description'],
}

</script>

<style module lang=stylus>

#container
  display: flex
  margin: 30px 0
  @media only screen and (max-width: 600px)
    align-items: center
    flex-direction: column
    margin: 30px 30px

#left
  display: flex
  flex-direction: column
  margin-right: 40px
  max-width: 200px
  text-align: center
  @media only screen and (max-width: 600px)
    max-width: 100%
    margin: 30px 0 20px 0

#left img:first-child
  align-self: center
  width: 100px
  height: 100px
  margin-bottom: 10px

#left h2
  margin: 15px 0
  text-transform: uppercase

#left h2 strong
  color: #3bb30b

#left > p
  font-style: italic

#right
  display: flex
  align-items: center
  margin-left: 20px
  max-width: 500px
  @media only screen and (max-width: 600px)
    margin-left: 0px
    max-width: 100%

</style>
