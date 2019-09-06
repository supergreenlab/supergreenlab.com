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
    <div :id='$style.header'>
      <Header responsiveHide='true' />
    </div>
    <div :id='$style.body'>
      <div :id='$style.toptitle'>
        <SectionTitle :title='guide.title'
                      :green='guide.subtitle' />
      </div>
      <div v-for='section in guide.sections' :ref='section.slug'>
        <div :class='$style.paragraph'>
          <div :class='$style.videosection'>
            <video :class='$style.video' autoplay loop playsinline muted defaultMuted>
              <source :src="section.video" type="video/mp4">
                Your browser does not support the video tag.
            </video> 
            <div :class='$style.text'>
              <h1 v-if='section.title'>{{ section.title }}</h1>
              <p :class='$style.ps' v-for='t in section.text' v-html='t'></p>
            </div>
          </div>
        </div>
        <div :class='$style.separator'></div>
      </div>
      <div :id='$style.navigation'>
        <a :id='$style.home' href='javascript:void(0)' @click='back'>BACK</a>
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import Header from '~/components/header.vue'
import SectionTitle from '~/components/sectiontitle.vue'
import Footer from '~/components/homesection-footer.vue'

import { guides } from '~/config/guides.json'

export default {
  components: { Header, SectionTitle, Footer, },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    if (this.timeout) clearTimeout(this.timeout)
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    guide() {
      const { slug } = this.$route.params
      return guides.find((g) => g.slug == slug)
    },
  },
  methods: {
    handleScroll(e) {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        Object.keys(this.$refs).forEach((name) => {
          if (this.lastEvent == name) {
            return;
          }
          const ref = this.$refs[name][0],
                { y, height } = ref.getBoundingClientRect(),
                centery = y + height / 2,
                winh = window.innerHeight

          if (centery > winh / 4 && centery < winh * 3/4) {
            this.$matomo && this.$matomo.trackEvent(`guide-${this.guide.slug}`, 'scrollto', name)
            this.lastEvent = name
          }
        })
      }, 250)
    },
    back() {
      this.$router.back()
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
  min-height: 100vh
  padding-top: 80pt
  @media only screen and (max-width: 600pt)
    padding-top: 30pt

#header
  position: fixed
  width: 100%
  top: 0 
  left: 0
  z-index: 1000

#body
  width: 100%
  max-width: 800pt

#top
  display: flex
  flex-direction: column
  align-items: center
  width: 100%

#toptitle
  font-size: 1.5em
  margin: 20pt 0
  background-color: rgba(255, 255, 255, 0.5)

.paragraph
  width: 100%
  font-size: 1.1em
  margin: 60pt 10pt
  @media only screen and (max-width: 600pt)
    margin: 15pt 0pt
    padding 0 5pt

.text > h1
  margin: 0 0 20pt 0
  color: #6D6D6D 

.ps
  margin: 10pt 0

.ps > b
  color: #3BB30B
  font-weight: 600

.ps > h3
  color: #717171

.video
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

.videosection
  display: flex
  @media only screen and (max-width: 600pt)
    flex-direction: column

.videosection > *
  flex-basis: 50%

.videosection > p
  margin: 10pt

.separator
  height: 2pt
  margin: 30pt 0
  background-color: #efefef

#navigation
  display: flex
  align-items: center
  justify-content: center

#home
  display: block
  background-color: #3BB30B
  padding: 8pt 25pt
  margin: 5pt 0 0 0
  border-radius: 5pt
  color: white
  text-decoration: none
  text-align: center
  font-weight: 500

</style>
