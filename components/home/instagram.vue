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
  <section :id='$style.container'>
    <div :id='$style.title'>
      <SectionTitle title='we found the best way'
                    green='to grow your own buds'
                    title2='in the most convenient way'
                    smalltitle='No big tent, no complicated hardware.'
                    separator='true'/>
    </div>
    <div :id='$style.mosaic'>
      <div v-for='i in posts' :key='i.url' :class='$style.post' @click='open(i.url)'>
        <video v-if='i.pic.indexOf("mp4") != -1' autoplay loop playsinline muted defaultMuted>
          <source :src='require(`~/assets/img/instagram/${i.pic}`)' type="video/mp4">
          Your browser does not support the video tag.
        </video> 
        <img v-else :src='require(`~/assets/img/instagram/${i.pic}`)' />
        <div :class='$style.iglogo'></div>
      </div>
    </div>
  </section>
</template>

<script>
import instagram from '~/config/instagram.json'
import SectionTitle from '~/components/widgets/sectiontitle.vue'

import { open } from '~/lib/client-side.js'

export default {
  components: {SectionTitle,},
  computed: {
    posts() {
      return instagram.posts
    }
  },
  methods: {
    open(url) {
      open(url, '_blank')
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center

#title
  width: 100%
  margin: 0pt 0 50pt 0

#mosaic
  display: flex
  flex-wrap: wrap
  align-items: center
  justify-content: center
  margin: 0 50pt
  @media only screen and (max-width: 600px)
    margin: 0
   
.post
  display: flex
  position: relative
  flex-basis: 12.5%
  cursor: pointer
  @media only screen and (max-width: 600px)
    flex-basis: 50%

.post > video, .post > img
  width: 100%
  height: 100%

.iglogo
  position: absolute
  bottom: 3pt
  right: 3pt
  width: 20pt
  height: 20pt
  background-image: url('~assets/img/instagram.svg')
  background-position: center
  background-repeat: no-repeat
  background-size: contain
  transition: opacity 0.2s
  opacity: 0.7

.post:hover > .iglogo
  opacity: 1

</style>
