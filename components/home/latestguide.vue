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
      <div :id='$style.thumbnail' :style='{"background-image": `url(${require("~/assets/img/yt-thumbnail-eketv2.jpg")})`}'><img src='~assets/img/youtube-play.png' /><a href='https://www.youtube.com/watch?v=1tHfZttB2Fg' target='_blank'></a></div>
      <div :id='$style.text'>
        <div>
          <h2>{{ guide.name }}</h2>
          <div v-html='$md.render(guide.text)'></div>
        </div>
        <nuxt-link  :id='$style.cta' :to='`/guide/${guide.slug}`'>
          <b class="hvr-grow">View guide</b>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'

export default {
  components: {SectionTitle,},
  computed: {
    guide() {
      const guide = require('~/config/guide-how-to-build-a-ikea-eket-connected-grow-box.json')
      return guide
    }
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
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

#text h2
  margin: 0 0 15pt 0

#thumbnail
  flex: 1
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 560px
  height: 315px
  margin: 10pt 0 20pt 0
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  @media only screen and (max-width: 600px)
    flex: auto
    width: 100%
    height: 200px

#thumbnail > img
  transition: opacity 0.2s
  @media only screen and (max-width: 600px)
    max-width: 25%

#thumbnail:hover > img
  opacity: 90%

#thumbnail > a
  display: block
  position: absolute
  width: 100%
  height: 100%

#cta
  text-transform: uppercase
  color: white
  background-color: #3BB30B
  padding: 10pt 35pt
  border-radius: 3pt
  text-decoration: none
  text-align: center
  z-index: 100
  font-size: 1.5em
  margin-top: 50px
  @media only screen and (max-width: 600px)
    margin-top: 20pt
    font-size: 1.1em

#cta > small
  padding-top: 5pt
  font-weight: 300
  font-size: 1.1em

#cta > b
  font-weight: 600

</style>
