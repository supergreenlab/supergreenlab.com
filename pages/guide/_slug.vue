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
      <div :id='$style.first' v-if='first'>
        <h2>This guide is part of:</h2>
        <div :class='$style.guide'>
          <Guide location='first-guide' :from='guide' :guide='first' button='BACK TO FIRST' />
        </div>
        <h2 v-if='showTableOfContent'>Table of content</h2>
        <a href='javascript:void(0)' @click='showTableOfContent = !showTableOfContent'>{{ showTableOfContent ? 'Hide' : 'Show' }} table of content - ({{ allGuides.length }} guides)</a>
        <div v-if='showTableOfContent' v-for='(g, i) in allGuides' :class='$style.guide' :id='g.id == guide.id ? $style.selected : ""'>
          <h1>#{{ i+1 }}</h1>
          <Guide location='table-of-content' :from='guide' :guide='g' />
        </div>
        <a v-if='showTableOfContent' href='javascript:void(0)' @click='showTableOfContent = !showTableOfContent'>{{ showTableOfContent ? 'Hide' : 'Show' }} table of content - ({{ allGuides.length }} guides)</a>
      </div>
      <Section v-if='guide.text' :guide='guide' :guideSection='guide' :ref='guide.slug' />
      <div v-if='!first && next' :id='$style.tocs'>
        <h2>Table of contents</h2>
        <nuxt-link v-for='(g, i) in allGuides' :key='g.slug' :class='$style.toc' :to='`/guide/${g.slug}`'>
          <div><b>#{{ i+1 }}</b>&nbsp;{{ g.name }}</div>
          <div><b :class='nChecked(g) == g.sections.length ? $style.green : (nChecked(g) != 0 ? $style.orange : "")'>{{ nChecked(g) }}/{{ g.sections.length }}</b> steps</div>
        </nuxt-link>
      </div>
      <div v-for='(section, i) in guide.sections' :key='section.id'>
        <div v-if='guide.diary && addDateSeparator(section, i)' :class='$style.diaryDate'>
          <div :class='$style.diaryDateLabel'>
            <img src='~/assets/img/icon_calendar.svg' />&nbsp;{{ separatorDate(section, i) }}
          </div>
          <div :class='$style.separator'></div>
        </div>
        <Section :guide='guide' :guideSection='section' :index='i' :ref='section.slug' />
        <div :class='$style.separator'></div>
      </div>
      <div ref='end-guide' v-if='first && !next' :id='$style.congrats'>
        <h1>CONGRATULATIONS!</h1>
        <h2>You made it through this guide:)</h2>
      </div>
      <div ref='next-guide' :id='$style.guides' v-if='next'>
        <h2>Next</h2>
        <Guide :guide='next' :from='guide' location='next-guide' button='CONTINUE >' />
      </div>
      <div ref='related-guides' :id='$style.guides' v-if='relatedGuides.length'>
        <h2>Guides to see next</h2>
        <Guide v-for='g in relatedGuides' location='related-guide' :from='guide' :key='g.id' :guide='g' />
      </div>
    </div>
    <div :id='$style.prefooter'>
      <CallToAction ref='start-growing' :guide='guide' />
      <Newsletter ref='newsletter' />
    </div>
    <Footer />
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import Footer from '~/components/layout/footer.vue'
import Guide from '~/components/guides/small.vue'
import Section from '~/components/guides/section.vue'
import CallToAction from '~/components/guides/calltoaction.vue'
import Newsletter from '~/components/layout/newsletter.vue'

import { addEventListener, removeEventListener, innerHeight } from '~/lib/client-side.js'

import { guides } from '~/config/guides.json'

export default {
  components: { Header, SectionTitle, Section, Guide, Footer, CallToAction, Newsletter},
  head() {
    return {
      title: `SuperGreenLab Guides - ${this.guide.name}`,
      meta: [
        { hid: 'description', name: 'description', content: this.guide.text },
        { hid: 'og:image', property: 'og:image', content: `/img/${ this.guide.thumbnail.fileLarge }` },
      ],
    }
  },
  data() {
    return {
      showTableOfContent: false,
    }
  },
  created () {
    addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    if (this.timeout) clearTimeout(this.timeout)
    removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    addDateSeparator() {
      return (section, i) => {
        if (!i) {
          return true
        }
        const addSeparator = this.separatorDate(section) != this.separatorDate(this.guide.sections[i-1])
        if (!addSeparator) {
          return false
        }
        return true
      }
    },
    separatorDate() {
      return (section, i) => {
        if (i == 0 && !this.guide.first) {
          return 'Start'
        }
        let entry
        if (section.grouped) {
          entry = section.entry[0]
        } else {
          entry = section.entry
        }
        const plant = this.guide.plant
        if (plant.settings.curingStart && new Date(entry.date) > new Date(plant.settings.curingStart)) {
          const durationDays = Math.floor((new Date(entry.date) - new Date(plant.settings.curingStart)) / (1000 * 60 * 60 * 24))
          if (durationDays == 0) {
            return `First day of curing`
          } else if(durationDays < 7) {
            return `Curing: day ${durationDays}`
          } else {
            return `Curing: week ${Math.floor(durationDays / 7) + 1} day ${durationDays % 7 + 1}`
          }
        } else if (plant.settings.dryingStart && new Date(entry.date) > new Date(plant.settings.dryingStart)) {
          const durationDays = Math.floor((new Date(entry.date) - new Date(plant.settings.dryingStart)) / (1000 * 60 * 60 * 24))
          if (durationDays == 0) {
            return `First day of drying`
          } else if(durationDays < 7) {
            return `Drying: day ${durationDays}`
          } else {
            return `Drying: week ${Math.floor(durationDays / 7) + 1} day ${durationDays % 7 + 1}`
          }
        } else if (plant.settings.bloomingStart && new Date(entry.date) > new Date(plant.settings.bloomingStart)) {
          const durationDays = Math.floor((new Date(entry.date) - new Date(plant.settings.bloomingStart)) / (1000 * 60 * 60 * 24))
          if (durationDays == 0) {
            return `First day of blooming`
          } else if(durationDays < 7) {
            return `Blooming: day ${durationDays}`
          } else {
            return `Blooming: week ${Math.floor(durationDays / 7) + 1} day ${durationDays % 7 + 1}`
          }
        } else if (plant.settings.veggingStart && new Date(entry.date) > new Date(plant.settings.veggingStart)) {
          const durationDays = Math.floor((new Date(entry.date) - new Date(plant.settings.veggingStart)) / (1000 * 60 * 60 * 24))
          if (durationDays == 0) {
            return `First day of vegging`
          } else if(durationDays < 7) {
            return `Vegging: day ${durationDays}`
          } else {
            return `Vegging: week ${Math.floor(durationDays / 7) + 1} day ${durationDays % 7 + 1}`
          }
        } else if (plant.settings.germinationDate && new Date(entry.date) > new Date(plant.settings.germinationDate)) {
          const durationDays = Math.floor((new Date(entry.date) - new Date(plant.settings.germinationDate)) / (1000 * 60 * 60 * 24))
          if (durationDays == 0) {
            return `Germination!`
          } else {
            return `Germinated ${durationDays} days ago`
          }
        }

        const nd = new Date(entry.date)
        return nd.toLocaleDateString();
      }
    },
    guide() {
      const { slug } = this.$route.params
      const guide = require(`~/config/guide-${slug}.json`)
      return guide
    },
    relatedGuides() {
      return (this.guide.relatedGuides || []).map(rg => guides.find(g => g.id == rg))
    },
    first() {
      if (this.guide.first == null || this.guide.first.length == 0) return null
      let first = guides.find(g => g.id == this.guide.first[0])
      if (!first) return null
      first = require(`~/config/guide-${first.slug}.json`)
      return first
    },
    allGuides() {
      let current = this.first == null ? this.guide : guides.find(g => g.slug == this.first.nextslug[0])
      let ordered = []
      const fn = (current) => {
        ordered.push(current)
        current = guides.find(g => g.slug == current.nextslug)
        if (current) return fn(current)
      }
      fn(current)

      if (this.first) {
        ordered = [this.first, ...ordered]
      }
      return ordered
    },
    next() {
      if (this.guide.nextslug == null || this.guide.nextslug.length == 0) return null
      const next = require(`~/config/guide-${this.guide.nextslug[0]}.json`)
      return next
    },
    nSteps() {
      return (guide) => {
        return guide.sections.filter(gs => gs.showdone).length
      }
    },
    nChecked() {
      return (guide) => {
        return guide.sections.filter(gs => gs.showdone && this.$store.state.guides[gs.slug].checked).length
      }
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
          let ref = this.$refs[name]
          if (!ref.length) ref = [ref]
          ref.forEach((ref) => {
            const $el = ref.$el ? ref.$el : ref
            const { y, height } = $el.getBoundingClientRect(),
              winh = innerHeight()

            let isCoveringScreen = Math.min(y+height, winh) - Math.max(y, 0) > (height * 3/4 < winh * 3/4 ? height * 3/4 : winh * 3/4)

            if (isCoveringScreen) {
              this.$analytics.trackEvent('guide', 'scrollto', name)
              this.lastEvent = name
              this.$data.currentRef = name
            }
          })
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
  font-family: Roboto
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
  width: 100%
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

#guides
  background-color: #dedede
  border-radius: 5pt
  padding: 10pt 10pt 4pt 10pt
  margin: 5pt 0
  @media only screen and (max-width: 600pt)
    margin: 5pt 10pt

#guides > h2
  font-family: Roboto
  margin: 0 0 20pt 0
  color: #454545

#congrats
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  color: #454545
  text-align: center
  margin: 0 0 50pt 0

#congrats > h1
  font-family: Roboto
  color: #3bb30b

#first
  background-color: #dedede
  border-radius: 5pt

#first > h2, #first > a
  display: block
  padding: 20pt 0 10pt 10pt
  color: #454545

.guide
  padding: 3pt 15pt
  @media only screen and (max-width: 600pt)
    margin: 5pt 10pt

.guide > h1
  color: #3bb30b

#selected
  border-radius: 5pt
  background-color: #cdcdcd

#tocs
  display: flex
  flex-direction: column

#tocs h2
  font-family: Roboto
  margin-bottom: 5pt

.toc
  display: flex
  justify-content: space-between
  color: #454545
  text-decoration: none
  margin-left: 10pt
  margin-bottom: 4pt
  border-bottom: 1pt dashed #dedede

.toc:hover
  text-decoration: underline

.green
  color: #3bb30b
  font-weight: bold

.orange
  color: #e37120
  font-weight: bold

#prefooter
  width: 100%
  margin: 20pt 0 0 0

.diaryDateLabel
  display: flex
  align-items: center
  font-size: 2em
  font-weight: bold
  color: #454545
  margin-top: 30px
  margin-left: 10px
  @media only screen and (max-width: 600pt)
    font-size: 1.8em

.diaryDateLabel > img
  margin-bottom: 10px
  height: 40px
  @media only screen and (max-width: 600pt)
    margin-bottom: 7px
    height: 30px

</style>
