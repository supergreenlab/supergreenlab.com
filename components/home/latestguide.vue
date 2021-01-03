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
    <div :id='$style.body'>
      <div :id='$style.thumbnail'>
        <Thumbnail @click='clickVideo' @mouseover='hoverVideo' asset='yt-thumbnail-eketv2.jpg' url='https://www.youtube.com/watch?v=1tHfZttB2Fg' />
      </div>
      <div :id='$style.text'>
        <div>
          <h2>{{ guide.name }}</h2>
          <div v-html='$md.render(guide.text)'></div>
        </div>
        <Cta title='View guide' :to='`/guide/${guide.slug}`' @click='ctaClicked' />
      </div>
    </div>
  </section>
</template>

<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import Cta from '~/components/home/cta.vue'
import Thumbnail from '~/components/home/thumbnail.vue'

export default {
  components: {SectionTitle, Cta, Thumbnail,},
  computed: {
    guide() {
      const guide = require('~/config/guide-how-to-build-a-ikea-eket-connected-grow-box.json')
      return guide
    },
    videoName() {
      return 'How to build a stealth growbox - Perpetual harvest edition - Vegging and blooming at the same time!'
    },
  },
  methods: {
    ctaClicked() {
      this.$matomo.trackEvent('Homepage navigation', 'Homepage click', 'Homepage Click Featured Guide', this.guide.name)
    },
    hoverVideo() {
      this.$matomo.trackEvent('Homepage navigation', 'Homepage hover', 'Homepage hover featured video', this.videoName)
    },
    clickVideo() {
      this.$matomo.trackEvent('Homepage navigation', 'Homepage click', 'Homepage click featured video', this.videoName)
    },
  },
}
</script>

<style module lang=stylus>

#container
  width: 100%
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  color: #454545

#title
  width: 100%
  margin: 0pt 0 50pt 0

#body
  display: flex
  align-items: center
  justify-content: center
  max-width: 900pt
  @media only screen and (max-width: 600px)
    padding: 5pt 10pt
    flex-direction: column

#text
  flex: 1
  display: flex
  height: 100%
  flex-direction: column
  justify-content: space-between
  align-items: flex-end
  padding: 0 10pt

#text h2
  margin: 0 0 15pt 0

#thumbnail
  width: 560px
  height: 315px
  margin: 10pt 0 20pt 0
  @media only screen and (max-width: 600px)
    width: 100%
    height: 250px
    margin: 10pt 0

</style>
