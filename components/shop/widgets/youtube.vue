<!--
      Copyright (C) 2022  SuperGreenLab <towelie@supergreenlab.com>
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
    <div :id='$style.pic'>
      <div :class='$style.thumbnail' :style='{"background-image": `url(/img/${config.picture[0].fileLarge})`}'><img src='~assets/img/youtube-play.png' /><a :href='config.link' target='_blank'></a></div>
    </div>
    <div :id='$style.right'>
      <div :id='$style.text'>
        <h2 :id="$style.title" v-html='$md.render(config.title)'></h2>
        <div :id="$style.description" v-html='$md.render(config.description)'></div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  props: ['config', 'container',],
}

</script>

<style module lang=stylus>

#container
  display: flex
  margin: 0 10pt
  /* flex-direction: column */
  @media only screen and (max-width: 600px)
    flex-direction: column

.thumbnail
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 350px
  height: 240px
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  @media only screen and (max-width: 600px)
    width: 100%
    height: 200px
    margin: 10pt 0

.thumbnail > img
  width: 80px
  transition: opacity 0.2s
  @media only screen and (max-width: 600px)
    max-width: 25%

.thumbnail:hover > img
  opacity: 90%

.thumbnail > a
  display: block
  position: absolute
  width: 100%
  height: 100%

#right
  display: flex
  flex: 1
  margin: 0 20pt
  @media only screen and (max-width: 800px)
    flex-direction: column
    margin: 0

#text
  display: flex
  flex-direction: column
  flex: 1
  @media only screen and (max-width: 600px)
    margin: 0

#title
  font-family: Roboto
  text-transform: uppercase
  font-weight: bold
  font-size: 2em
  color: #5E5E5E
  margin-bottom: 10pt
  margin: 10pt 0 10pt 0
  @media only screen and (max-width: 600px)
    font-size: 1.5em

#description
  text-align: justify
  color: #454545
  margin: 10pt 5pt
  @media only screen and (max-width: 600px)
    margin: 0 0pt

#description p, #title p
  padding: 10px 0px

#description strong
  color: #3BB30B
  font-weight: 600

#description ul
  padding: 0
  list-style-type: none

#description ul li
  margin-bottom:7pt

#description ul li::before
  content: '- '
  color: #3bb30b
  font-weight: bold

</style>
