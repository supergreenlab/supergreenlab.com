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
      <div v-for='(p, i) in config.picture' :class='$style[`media${i}-${config.picture.length}`]'>
        <video v-if='p.type == "video/mp4"' :class='$style.video' autoplay loop playsinline muted defaultMuted>
          <source :src="`/img/${p.filePath}`" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <img v-else :class='$style.pictureBanner' :src='`/img/${p.fileRaw}`' />
      </div>
    </div>
  </section>
</template>

<script>
import { open } from '~/lib/client-side.js'

export default {
  props: ['config', 'container',],
  computed: {
  },
  methods: {
    async open() {
      const { config: { slug, link } } = this.$props
      const { container: { slug: containerSlug } } = this.$props
      if (!link) {
        return
      }
      if (link.indexOf('https://') == 0) {
        open(link, '_blank')
      } else {
        if (link.indexOf('?') !== -1) {
          const urlParams = new URLSearchParams(link.split('?')[1])
          const sglSellerIDs = [process.env.sglSellerID, process.env.sgteuSellerID, process.env.sgtusSellerID]
          await Promise.all(sglSellerIDs.map(sglSellerID => this.$store.dispatch('checkout/fetchPromocode', {promocode: urlParams.get('promo'), sellerid: sglSellerID})))
          this.$router.push(link.split('?')[0])
        } else {
          this.$router.push(link)
        }
      }
      this.$analytics.trackEvent('banner', 'click', `${containerSlug}_${slug}`)
    }
  },
}
</script>

<style module lang=stylus>

#container > div
  cursor: pointer

.pictureBanner
  width: 100%
  image-rendering: -webkit-optimize-contrast;

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
  display: none
  @media only screen and (min-width: 600px) and (max-width: 1000px)
    display: block

.media2-3
  display: none
  @media only screen and (max-width: 600px)
    display: block

</style>
