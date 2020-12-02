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
      <Section :guideSection='guide' />
      <div v-for='section in guide.sections' :ref='section.slug'>
        <Section :guideSection='section' />
        <div :class='$style.separator'></div>
      </div>
      <div :id='$style.navigation'>
        <a :class='$style.navbutton' href='javascript:void(0)' @click='back'>BACK</a>&nbsp;
        <nuxt-link v-if='next' :class='$style.navbutton' :to='next'>NEXT</nuxt-link>
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import Footer from '~/components/layout/footer.vue'
import Section from '~/components/guides/section.vue'

export default {
  components: { Header, SectionTitle, Section, Footer, },
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
      const guide = require(`~/config/guide-${slug}.json`)
      return guide
    },
    next() {
      if (this.guide.nextslug == null || this.guide.nextslug.length == null) return null
      const next = require(`~/config/guide-${this.guide.nextslug[0]}.json`)
      return `/guide/${next.slug}`
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

#container h2
  margin-left: 5pt
  color: #454545

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

.separator
  height: 2pt
  margin: 30pt 0
  background-color: #efefef

#navigation
  display: flex
  align-items: center
  justify-content: center

.navbutton
  display: block
  background-color: #3BB30B
  padding: 8pt 25pt
  margin: 5pt 0 0 0
  border-radius: 5pt
  color: white
  text-decoration: none
  text-align: center
  font-weight: 500
  cursor: pointer

</style>
