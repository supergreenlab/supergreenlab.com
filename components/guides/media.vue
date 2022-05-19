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
    <div :id="$style.socialLink">
      <a href="https://www.youtube.com/c/supergreenlab" target="_blank"><i class="fa fa-youtube"></i></a>
      <a href="https://www.instagram.com/sgreenlab/" target="_blank"><i class="fa fa-instagram"></i></a>
      <a href="https://www.reddit.com/r/SuperGreenLab/" target="_blank"><i class="fa fa-reddit"></i></a>
      <a href="https://github.com/supergreenlab" target="_blank"><i class="fa fa-github"></i></a>
      <a href="https://twitter.com/SuperGreenLab" target="_blank"><i class="fa fa-twitter"></i></a>
    </div>
    <video v-if='media.type == "video/mp4"' :id='$style.video' autoplay loop playsinline muted defaultMuted @click='toggleZoom'>
      <source :src="`/img/${media.filePath}`" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div v-else :id='$style.picture' :style='{"background-image": `url(/img/${media.fileLarge})`}' @click='toggleZoom'></div>
    <!-- <div v-if='typeof index != "undefined"' :id='$style.index'>#{{ index+1 }}</div> -->
    <div v-if='!guideSection.nopiclogo' :id="$style.guidelogo" >
      <img src="~assets/img/logo_white.svg" alt="logo-supergreenlab">
    </div>
    <div :id="$style.footerMedia">
      <div v-if='guideSection.author'>Author: {{ guideSection.author }}</div>
      <div v-if='guideSection.credit'>Credit:  {{ guideSection.credit }}</div>
    </div>
    <!--<portal v-if='showZoom' to='root'>
      <div :id='$style.fullscreen' @click='toggleZoom'>
        <video v-if='media.type == "video/mp4"' :id='$style.mediafullscreen' autoplay loop playsinline muted defaultMuted>
          <source :src="`/img/${media.filePath}`" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div v-else :id='$style.mediafullscreen' :style='{"background-image": `url(/img/${media.fileLarge})`}'></div>
      </div>
    </portal>-->
  </section>
</template>

<script>
export default {
  props: ['media', 'index', 'guideSection', ],
  data() {
    return {
      showZoom: false,
    }
  },
  methods: {
    toggleZoom() {
      this.$data.showZoom = !this.$data.showZoom
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  position: relative

#socialLink

#socialLink i
  margin: 2px
  color: #8f8f8f
  font-size: 20px

#socialLink i:hover
   color: #3BB30B

#guidelogo
  top: 28pt
  right: 18pt
  position: absolute
  @media only screen and (max-width: 600pt)
    right: 8pt
    top: 25pt

#video
  display: block
  height: 100%
  max-height: 400px
  max-width: 400px
  margin: 0 10pt 0 0
  @media only screen and (max-width: 600pt)
    width: 100%
  @media only screen and (min-width: 600pt)
    box-shadow: -1px 1px 5px #888

#picture
  display: block
  width: 400px
  height: 400px
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
    background-size: 100%
  @media only screen and (min-width: 600pt)
    box-shadow: -1px 1px 5px #888

#footerMedia
  margin-right: 10pt
  width: 400px
  font-weight: bold
  text-transform: uppercase
  align-self: center
  font-size: 0.7em
  display: flex
  justify-content: space-between
  background-color: #EFEFEF
  color: #adadad
  @media only screen and (max-width: 600pt)
    width: 100%
    margin: 0 0 10pt 0

#index
  position: absolute
  font-family: 'PlumeAd'
  top: 23pt
  left: 5pt
  font-size: 2em
  -webkit-text-stroke: 1pt white
  font-weight: bold
  color: #3bb30b

#fullscreen
  position: fixed
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  display: flex
  align-items: center
  justify-content: center
  background-color: white


#mediafullscreen
  height: 90%
  width: 90%
  margin: 0 15pt 0 0
  background-position: center
  background-size: contain
  background-repeat: no-repeat

</style>
