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
  <section :class='center ? $style.center : $style.notcenter'>
    <h2 :id='$style.title' :style='white ? {color: "white"} : {}'>{{ title }}</h2>
    <h1 :id='$style.green' :style='white ? {color: "#7CCC5C"} : {}'>{{ green }}</h1>
    <h2 :id='$style.subtitle' :style='white ? {color: "white"} : {}'>{{ subtitle }}</h2>
    <h2 :id='$style.title2' :style='white ? {color: "white"} : {}'>{{ title2 }}</h2>
    <small :id='$style.smalltitle' :style='white ? {color: "white"} : {}'>{{ smalltitle }}</small>

  </section>
</template>

<script>

export default {
  props: ['title', 'title2', 'green', 'smalltitle', 'center', 'white','subtitle'],
}
</script>

<style module lang=stylus>
/*
#container
  display: flex
  flex-direction: column
  align-items: flex-start
  justify-content:  center
  @media only screen and (max-width: 600px)
    font-size: 0.8em */

.center
  display: flex
  flex-direction: column
  align-items: center
  justify-content:  center
  /* border-top: solid 3pt #3bb30b
  border-bottom: solid 3pt #3bb30b
  padding-top: 20pt
  padding-bottom: 20pt */
  @media only screen and (max-width: 600px)
    font-size: 0.8em

.center:before
  margin: 20pt
  width: 80pt
  height: 2pt
  background: #3bb30b
  content: ""

.center:after
  margin: 20pt
  width: 80pt
  height: 2pt
  background: #3bb30b
  content: ""

.notcenter
  margin-left: 50pt
  display: flex
  flex-direction: column
  align-items: flex-start
  justify-content:  center
  border: none
  @media only screen and (max-width: 600px)
    font-size: 0.8em

#title
  font-size: 2.7em
  color: #5E5E5E
  text-align: center

#title2
  font-size: 1.6em
  color: #5E5E5E
  text-align: center
  text-transform: uppercase

#subtitle
  font-size 2em
  color: #5E5E5E

#green
  color: #3BB30B
  font-size: 2.1em
  text-align: center
  margin: 0pt

#smalltitle
  margin-top: 5pt
  color: #5E5E5E
  font-size: 1.1em
  text-align: center
  text-transform: lowercase
  @media only screen and (max-width: 600px)
    font-size: 1.3em


</style>
