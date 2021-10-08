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
    <div :class="border ? $style.bordertop : '' "></div>
    <div :class="$style.titlecontainer">
      <h2 :id='$style.title' v-html='$md.render(title || "")' :style="white ? {color : 'white'} : '' "></h2>
      <div v-if='brackets' :id='$style.brackets' v-html='$md.render(brackets || "")'></div>
    </div>

    <h1 v-if='green' :id='$style.green'  v-html='$md.render(green || "")' :style="white ? {color: '#7ccc5c'} : '' "></h1>
    <h2 v-if='subtitle' :id='$style.subtitle' v-html='$md.render(subtitle || "")'></h2>
    <h2 v-if='title2' :id='$style.title2'  v-html='$md.render(title2 || "")' :style="white ? {color : 'white'} : '' "></h2>
    <small v-if='smalltitle' :id='$style.smalltitle'  v-html='$md.render(smalltitle || "")' :style="white ? {color : 'white'} : '' "></small>
    <div :class="border ? $style.borderbottom : '' "></div>
  </section>
</template>

<script>

export default {
  props: ['title', 'title2', 'green', 'smalltitle', 'center','subtitle', 'border', 'white', 'brackets'],
}
</script>

<style module lang=stylus>

#container
  font-family: Roboto
  display: flex
  flex-direction: column
  justify-content:  center
  @media only screen and (max-width: 600px)
    margin: 20pt 0 30pt 0

.center
  align-items: center
  text-align: center
  @media only screen and (max-width: 600px)
    margin:  5pt 0

.notcenter
  margin-left: 30pt
  align-items: flex-start
  text-align:left
  @media only screen and (max-width: 600px)
    margin-left: 5pt 0

.bordertop
  width: 80pt
  height: 3pt
  margin-bottom: 20pt
  background-color: #3BB30B

.borderbottom
  width: 80pt
  height: 3pt
  margin-top: 20pt
  background-color: #3BB30B

.titlecontainer
  display: flex
  align-items: flex-end
  @media only screen and (max-width: 600px)
    flex-direction: column

#title
  font-size: 2.7em
  color: #323232
  @media only screen and (max-width: 600px)
    font-size: 2.3em
    margin: 5pt

#brackets
  margin-bottom: 7pt
  font-size: 2em
  color: #323232
  @media only screen and (max-width: 600px)
    font-size: 1.7em

#title strong
  color: #3bb30b
  font-weight: bold

#title2
  font-size: 1.6em
  color: #323232
  text-transform: uppercase
  @media only screen and (max-width: 600px)
    font-size: 1.4em
    margin: 5pt

#subtitle
  font-size 2em
  color: #323232
  font-weight: normal
  @media only screen and (max-width: 600px)
    font-size: 1.7em
    margin: 5pt

#subtitle strong
  color: #3bb30b
  font-weight: bold

#green
  color: #3BB30B
  font-size: 2.1em
  margin: 0pt
  @media only screen and (max-width: 600px)
    font-size: 1.9em
    margin: 5pt

#smalltitle
  margin-top: 5pt
  color: #323232
  font-size: 1.1em
  text-transform: lowercase
  @media only screen and (max-width: 600px)
    font-size: 1em
    margin: 5pt

</style>
