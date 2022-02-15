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
  <section :id='$style.container'>
    <div :id='$style.carousel'>
      <VueSlickCarousel v-bind="settings">
        <div v-for='media in medias' :key='media.id'>
          <div v-if="mediaType(media) === MEDIA_TYPES.TYPE_IMAGE" :style='{"background-image": `url(${url(media)})`, height: height, "background-size": size}' :class="$style.image" @click='e => onClick(e, media)'>
            <div v-if='media.previous' :style='{"background-image": `url(${url(media.previous)})`, height: height, "background-size": size, opacity: 1 - measureOpacity/100}' :class="{ [$style.image]: true, [$style.previous]: true}" @click='e => onClick(e, media)'></div>
            <input v-if='media.previous' :class='$style.slider' type="range" min="0" max="100" v-model='measureOpacity'>
          </div>
          <video v-else-if="mediaType(media) === MEDIA_TYPES.TYPE_VIDEO" ref="videoPlayer" :class="$style.video" @click='e => onClick(e, media)' :style='{height, "object-fit": size || "cover"}' autoplay loop playsinline muted defaultMuted>
            <source :src="url(media)" type="video/mp4">
          </video>
        </div>
      </VueSlickCarousel>
    </div>
  </section>
</template>

<script>

const MEDIA_TYPES = {
  TYPE_IMAGE: 1,
  TYPE_VIDEO: 2,
}

export default {
  props: ['medias', 'onMediaClick', 'thumbnails', 'height', 'size'],
  data() {
    return {
      measureOpacity: 100,
      settings: {
        arrows: true,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: this.$props.medias.length > 1,
        speed: 2000,
        autoplaySpeed: 1800,
        touchMove: this.$props.medias.length > 1,
        cssEase: 'ease',
      },
      MEDIA_TYPES,
    }
  },
  methods: {
    onClick(e, media) {
      if (e.target.type == 'range') return
      if (!this.$props.onMediaClick) return
      this.$props.onMediaClick(media)
    },
  },
  computed: {
    mediaType: () => media => {
      const url = media.filePath
      if (url.includes('/feedmedias/pictures')) {
        return MEDIA_TYPES.TYPE_IMAGE;
      } else if (url.includes('/feedmedias/videos')) {
        return MEDIA_TYPES.TYPE_VIDEO;
      }
    },
    url: () => media => `https://storage.supergreenlab.com${media.filePath}`,
  },
}
</script>

<style module lang=stylus>

#container
  overflow: hidden
  width: 100%
  height: 100%

#carousel
  width: 100%
  height: 100%

.image
  position: relative
  background-position: center
  background-size: cover
  background-repeat: no-repeat
  width: 100%
  height: 100%

.previous
 position: absolute
 top: 0
 left: 0
 opacity: 0
 transition: opacity 0.1s

.video
  width: 100%
  height: 100%

.slider
  position: absolute
  z-index: 500
  display: flex
  bottom: 10px
  width: 300px
  left: calc(50% - 150px)

</style>
