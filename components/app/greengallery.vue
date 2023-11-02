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
  <section :id='$style.container' :class='{ [$style.greengradient]: !!circle }'>
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
  width: 100vw
  @media only screen and (max-width: 600px)
    flex-direction: column

.greengradient
  background: rgb(2,0,36);
  background: linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(59,179,11,1) 5%, rgba(59,179,11,1) 95%, rgba(0,212,255,0) 100%); 

.item
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  width: 400px
  @media only screen and (min-width: 600px) and (max-width: 800px)
    width: 300px

.circle
  background-color: white
  border-radius: 50%
  margin: 40px 30px
  height: 350px
  width: 350px
  @media only screen and (max-width: 600px)
    margin: 40px auto
  @media only screen and (min-width: 600px) and (max-width: 800px)
    height: 260px
    width: 260px

.pic
  width: 68%
  @media only screen and (min-width: 600px) and (max-width: 800px)
    width: 60%

.circle .title
  margin-top: -5px

.title
  font-weight: bold
  margin-bottom: 10px

.title strong
  color: #3bb30b
  
.subtitle
  font-style: italic
  max-width: 60%
  text-align: center

</style>
