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
    <div :class='$style.videosection'>
      <div :id='$style.smalltitle' v-if='!guideSection.sections && guideSection.title'>
        <h1>{{ guideSection.title }}</h1>
        <CheckBox v-if='guideSection.showdone' label='Done' @click='checkDone' :checked='checked' />
      </div>
      <FeedEntry v-if='guide.diary && guideSection.entry' :plant='guide.plant' :feedEntry='guideSection.entry' :feedMedias='feedMedias(guideSection)' />
      <Media v-else :index='index' :media='guideSection.media' :guideSection='guideSection'/>
      <div :class='$style.text'>
        <div :id='$style.title' v-if='!guideSection.sections && guideSection.title'>
          <h1>{{ guideSection.title }}</h1>
          <CheckBox v-if='guideSection.showdone' label='Done' @click='checkDone' :checked='checked' />
        </div>
        <div :class='$style.ps' v-if='guideSection.text' v-html='$md.render(guideSection.text)'></div>
        <b v-if='guideSection.attachements && guideSection.attachements.length'>Attachements</b>
        <div v-if='guideSection.attachements && guideSection.attachements.length' :id='$style.attachements'>
          <a v-for='a in guideSection.attachements' :key='a.id' :class='$style.attachement' :href='`/${a.filePath}`' target='_blank' :download='a.fileName' @click='attachementClicked(a)'>
            <img :src='`/img/${a.fileLarge}`' />
            {{ a.fileName }}
          </a>
        </div>
        <b v-if='guideSection.links && guideSection.links.length'>Useful links</b>
        <div v-if='guideSection.links && guideSection.links.length' :id='$style.links'>
          <a v-for='l in guideSection.links' :key='l.id' :class='$style.link' :href='l.url' target='_blank' @click='linkClicked(l)'>
            <div :class='$style.linkpic' :style='{"background-image": `url(/img/${l.icon.fileLarge})`}'>
              <img v-if='youtubeLink(l.url)' :class='$style.playbutton' src='~assets/img/youtube-play.png' />
            </div>
            <div :class='$style.linktext'>
              <b>{{ l.title }}</b>
              <div v-html='$md.render(l.description)'></div>
              <small>{{ l.url }}</small>
            </div>
          </a>
        </div>
        <div :id='$style.guides' v-if='gotoGuides.length'>
          <b v-if='gotoGuides.length > 1'>Checkout these guides</b>
          <b v-else>Checkout this guide</b>
          <Guide v-for='g in gotoGuides' :key='g.id' :from='guide' :guide='g' />
        </div>
        <a v-if='!guideSection.sections' href='javascript:void(0)' @click='feedback' :id='$style.feedback'>Got a feedback/suggestion? click here</a>
      </div>
    </div>
    <h2 v-if='requires.length'>What you'll need</h2>
    <SmallProductList :location='`guide-${guide.slug}`' v-if='requires.length' :products='requires' maxItems='2' />
  </section>
</template>

<script>
import Media from '~/components/guides/media.vue'
import SmallProductList from '~/components/products/smallproductlist.vue'
import CheckBox from '~/components/widgets/checkbox.vue'
import Guide from '~/components/guides/small.vue'
import FeedEntry from '~/components/plant/feed/cards/FeedEntry.vue'

import { open, screenX, availWidth } from '~/lib/client-side.js'

import { guides } from '~/config/guides.json'
import { product } from '~/lib/json_db.js'

export default {
  props: [ 'index', 'guide', 'guideSection', ],
  components: { Media, SmallProductList, CheckBox, Guide, FeedEntry,},
  computed: {
    requires() {
      return (this.$props.guideSection.requires || []).map(r => product(r)).filter(r => r)
    },
    youtubeLink() {
      return (l) => l.indexOf('youtube.com') != -1 || l.indexOf('youtu.be') != -1
    },
    checked() {
      return this.$store.state.guides[this.$props.guideSection.slug].checked
    },
    gotoGuides() {
      return (this.$props.guideSection.gotoguides || []).map(gg => guides.find(g => g.id == gg))
    },
    feedMedias() {
      return (section) => {
        return (section.entry.medias || []).map(m1 => { 
          const file = section.medias.find(m => m1.filePath.indexOf(m.fileName) !== -1)
          return Object.assign({}, m1, {
            type: file.type,
            filePath: `/img/${file.type.indexOf('video/') == 0 ? file.filePath : file.fileFull}`,
            thumbnailPath: `/img/${section.medias.find(m => m1.thumbnailPath.indexOf(m.fileName) !== -1).fileFull}`,
          })
        })
      }
    }
  },
  methods: {
    checkDone() {
      this.$analytics.trackEvent('guide', this.checked ? 'uncheck' : 'check', `${this.$props.guide.slug}-${this.$props.guideSection.slug}`)
      this.$store.commit('guides/checkSection', { slug: this.$props.guideSection.slug, checked: !this.checked })
    },
    feedback() {
      const width = 800
      open(`https://airtable.com/shrXcK5fyNpfMH5n9?prefill_GuideSection=${this.guideSection.id}`, '_blank', `width=${width},height=600,top=100,left=${screenX() + availWidth()/2 - width/2}`)
      this.$analytics.trackEvent('guide', 'feedback')
    },
    linkClicked(link) {
      const { guide } = this.$props
      this.$analytics.trackEvent(`guide-${guide.slug}`, 'linkclicked', link.slug)
    },
    attachementClicked(attachement) {
      const { guide } = this.$props
      this.$analytics.trackEvent(`guide-${guide.slug}`, 'attachementclicked', attachement.fileName)
    },
  },
}
</script>

<style module lang=stylus>

#container
  font-size: 1.1em
  margin: 60pt 10pt
  @media only screen and (max-width: 600pt)
    margin: 15pt 0pt
    padding 0 5pt

#container h2
  font-family: Roboto
  margin: 20pt 0 0 5pt
  font-size: 1em
  color: #454545

.text
  display: flex
  flex-direction: column
  flex-basis: 60% !important
  color #454545

.text > b
  font-family: Roboto

#title h1, #smalltitle h1
  font-family: Roboto
  padding-right: 10pt
  color: #6D6D6D

#title, #smalltitle
  display: flex
  align-items: center
  justify-content: space-between
  margin: 0 0 10pt 0
  @media only screen and (max-width: 600pt)
    display: none

#smalltitle
  @media only screen and (max-width: 600pt)
    display: flex
  @media only screen and (min-width: 600pt)
    display: none

.ps
  margin: 10pt 5pt
  color: #454545
  @media only screen and (min-width: 600pt)
    margin: 10pt 50pt 10pt 0

.ps > p, .ps > ul, .ps > pre
  margin-bottom: 10pt

.ps code
  white-space: pre-wrap

.ps strong
  color: #3BB30B
  font-weight: 600

.ps h3
  color: #454545

.videosection
  display: flex
  @media only screen and (max-width: 600pt)
    flex-direction: column

.videosection > *
  flex-basis: 40%

.videosection > p
  margin: 10pt

#attachements
  display: flex
  flex-direction: column
  margin-bottom: 10pt

.attachement
  display: flex
  align-items: center
  color: #454545
  margin: 5pt 0

.attachement img
  margin-right: 5pt
  width: 20pt

#links
  display: flex
  flex-direction: column
  margin: 5pt

.link
  display: flex
  color: #454545
  text-decoration: none
  margin: 5pt 0
  font-size: 0.9em

.link:hover
  text-decoration: underline

.linktext
  flex: 1

.linktext b
  font-weight: 600

.linktext small
  color: #787878
  text-decoration: underline

.linkpic
  display: flex
  align-items: center
  justify-content: center
  width: 150px
  height: 86px
  background-position: center
  background-size: 100%
  background-repeat: no-repeat
  margin-right: 10pt

#guides
  margin: 5pt

.playbutton
  width: 30pt
  height: 30pt
  transition: opacity 0.2s

.link:hover .playbutton
  opacity: 0.7

#feedback
  text-align: right
  font-size: 0.8em
  color: #454545

</style>
