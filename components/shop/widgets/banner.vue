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
    <div @click='open()'>
      <div v-for='(p, i) in config.picture'>
        <video v-if='p.type == "video/mp4"' :class='`${$style.video} ${$style[`media${i}-${config.picture.length}`]}`' autoplay loop playsinline muted defaultMuted>
          <source :src="require(`~/assets/img/${p.filePath}`)" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <img v-else :class='`${$style.pictureBanner} ${$style[`media${i}-${config.picture.length}`]}`' :src='require(`~/assets/img/${p.fileFull}`)' />
      </div>
    </div>
  </section>
</template>

<script>
import { open } from '~/lib/client-side.js'

export default {
  props: ['config',],
  computed: {
  },
  methods: {
    open() {
      const { config: { link } } = this.$props
      if (link) {
        open(link, '_blank')
      }
    }
  },
}
</script>

<style module lang=stylus>

#container > div
  cursor: pointer

.pictureBanner
  width: 100%

.video
  width: 100%
  height: 250pt
  object-fit: cover
  object-position: center
  @media only screen and (max-width: 600px)
    height: 150pt

.media0-2
  @media only screen and (max-width: 1000px)
    display: none
  
.media1-2
  @media only screen and (min-width: 1000px)
    display: none

.media0-3
  @media only screen and (max-width: 1000px)
    display: none
  
.media1-3
  @media only screen and (max-width: 600px) and (min-width: 1000px)
    display: none

.media2-3
  @media only screen and (min-width: 600px)
    display: none

</style>
