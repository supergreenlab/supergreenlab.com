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
  <section :id="$style.container" :class='center ? $style.center : $style.notcenter'>
    <div :class="border ? $style.border : '' "></div>
    <h2 :id='$style.title' v-html='$md.render(title || "")' :style="white ? {color : 'white'} : '' "></h2>
    <h1 :id='$style.green'  v-html='$md.render(green || "")' :style="white ? {color: '#7ccc5c'} : '' "></h1>
    <h2 :id='$style.subtitle' v-html='$md.render(subtitle || "")'></h2>
    <h2 :id='$style.title2'  v-html='$md.render(title2 || "")' :style="white ? {color : 'white'} : '' "></h2>
    <small :id='$style.smalltitle'  v-html='$md.render(smalltitle || "")' :style="white ? {color : 'white'} : '' "></small>
    <div :class="border ? $style.border : '' "></div>
  </section>
</template>

<script>

export default {
  props: ['title', 'title2', 'green', 'smalltitle', 'center','subtitle', 'border', 'white'],
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  justify-content:  center
  @media only screen and (max-width: 600px)
    margin: 0 5pt

.center
  align-items: center
  @media only screen and (max-width: 600px)
    margin:  5pt 0
    text-align: left

.notcenter
  margin-left: 30pt
  align-items: flex-start
  @media only screen and (max-width: 600px)
    margin-left: 5pt

.border
  width: 80pt
  height: 2pt
  margin: 20pt
  background-color: #3BB30B

#title
  font-size: 2.7em
  color: black
  text-align: center

#title strong
  color: #3bb30b
  font-weight: bold

#title2
  font-size: 1.6em
  color: black
  text-align: center
  text-transform: uppercase

#subtitle
  font-size 2em
  color: black
  text-align: center
  font-weight: normal
  @media only screen and (max-width: 600px)
    font-size: 1.3em

#subtitle strong
  color: #3bb30b
  font-weight: bold

#green
  color: #3BB30B
  font-size: 2.1em
  text-align: center
  margin: 0pt

#smalltitle
  margin-top: 5pt
  color: black
  font-size: 1.1em
  text-align: center
  text-transform: lowercase
  @media only screen and (max-width: 600px)
    font-size: 1.3em


</style>
