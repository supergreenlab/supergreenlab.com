<!--
      Copyright (C) 2020  SuperGreenLab <towelie@supergreenlab.com>
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
    <video v-if='media.type == "video/mp4"' :id='$style.video' autoplay loop playsinline muted defaultMuted>
      <source :src="require(`~/assets/img/${media.filePath}`)" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div v-else :id='$style.picture' :style='{"background-image": `url(${require(`~/assets/img/${media.fileLarge}`)})`}'></div>
    <div v-if='typeof index != "undefined"' :id='$style.index'>#{{ index+1 }}</div>
  </section>
</template>

<script>
export default {
  props: ['media', 'index',],
}
</script>

<style module lang=stylus>

#container
  display: flex
  position: relative

#video
  display: block
  height: 100%
  max-height: 400px
  max-width: 400px
  margin: 0 10pt 0 0
  @media only screen and (max-width: 600pt)
    width: 100%
    margin: 0 0 10pt 0
  @media only screen and (min-width: 600pt)
    box-shadow: -1px 1px 5px #888

#picture
  display: block
  width: 100%
  height: 100%
  min-width: 200px
  min-height: 200px
  background-position: center
  background-repeat: no-repeat
  background-size: contain
  max-height: 400px
  max-width: 400px
  margin: 0 10pt 0 0
  @media only screen and (max-width: 600pt)
    width: 100%
    margin: 0 0 10pt 0
  @media only screen and (min-width: 600pt)
    box-shadow: -1px 1px 5px #888

#index
  position: absolute
  font-family: 'PlumeAd'
  top: 5pt
  left: 5pt
  font-size: 2em
  -webkit-text-stroke: 1pt white
  font-weight: bold
  color: #3bb30b

</style>
