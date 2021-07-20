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
<section :id="$style.container" >
  <!-- <nuxt-link :to="config.link">Coucou</nuxt-link> -->
  <div @click='open(config.link)'>
    <video v-if='media.type == "video/mp4"' :id='$style.video' autoplay loop playsinline muted defaultMuted>
      <source :src="require(`~/assets/img/${config.picture[0].filePath}`)" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div v-else :id='$style.pictureBanner' :style='{"background-image": `url(${require(`~/assets/img/${config.picture[0].fileFull}`)})`}'>
    <!-- <div :id='$style.linkBanner'>{{ config }}</div> -->
    </div>
  </div>

</section>

</template>

<script>

import { open } from '~/lib/client-side.js'

export default {
  props: ['config',],
  computed: {
    media() {
      const { config } = this.$props
      const media = config.picture[0]
      return media
    },
    link() {
      const { config } = this.$props
      const link = config.link
      // console.log(config)
      return link
    }
  },
  methods: {
    open(link) {
      open(link, '_blank')
    }
  },
}
</script>

<style module lang=stylus>

#container > div
  cursor: pointer

#pictureBanner
  width: 100%
  height: 250pt
  background-position: center
  background-size: cover
  background-repeat: no-repeat
  display: flex
  flex-direction: column
  @media only screen and (max-width: 600px)
    height: 150pt

#video
  width: 100%
  height: 250pt
  object-fit: cover
  object-position: center
  @media only screen and (max-width: 600px)
    height: 150pt


</style>

