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
    <div :class='$style.space'></div>
    <div :id='$style.body'>
      <div v-for='(s, j) in sections' :class='$style.topicContainer'>
        <div :class='$style.cardContainer'>
          <TitleGuide :title='s.title'
                    :green='s.green'
                    :content='s.description' />
        </div>
        <div v-for='(guide, i) in guides(s.tag)' :key="guide.id" :class='$style.cardContainer'>
          <CardGuide v-if='!guide.spacer' :guide='guide' />
        </div>
        <div v-if='j != sections.length-1' :class='$style.separator'></div>
      </div>
      <div v-if='testGuides.length' :class='$style.topicContainer'>
        <div :class='$style.cardContainer'>
          <TitleGuide title='Testing guides'
                    green='Work In Progress'
                    content='Work-in-progress guides' />
        </div>
        <div v-for='guide in testGuides' :key="guide.id" :class='$style.cardContainer'>
          <CardGuide :guide='guide' />
        </div>
      </div>
      <div :class='$style.containerSeparator'>
        <div :class='$style.separator'></div>
      </div>
    </div>
    <Newsletter />
    <Footer />
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'
import Footer from '~/components/layout/footer.vue'
import TitleGuide from '~/components/widgets/sectiontitleguide.vue'
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import CardGuide from '~/components/guides/cardguide.vue'
import Newsletter from '~/components/layout/newsletter.vue'

import { guides } from '~/config/guides.json'

const sections = [
  {
    tag: 'growing-101',
    title: 'Growing 101',
    green: 'Better plants',
    description: 'Everything you need to know to grow your own plants.',
  },
  {
    tag: 'building-101',
    title: 'Building 101',
    green: 'Better builds',
    description: 'Everything you need to know to build your own box.',
  },
  {
    tag: 'diaries',
    title: 'Complete grow diaries',
    green: 'How it goes',
    description: 'Did you know that the SGL app is also a grow diary? In this section we\'ll review and comment complete seed-to-harvest diaries.',
  },
  {
    tag: 'supergreennerds',
    title: 'Let\'s get nerdy.',
    green: 'SuperGreenNerds',
    description: 'Become a better grower with high tech tools and accessories.',
  },
  {
    tag: 'kit-manuals',
    title: '3D printed kits manuals',
    green: 'Grower\'s Construction Set',
    description: 'Just bought or printed one of SGL\'s 3d printed kits and not sure what to do? Checkout those guides.',
  },
  {
    tag: 'bundle-manual',
    title: 'SGL bundle manuals',
    green: 'Follow the guide',
    description: 'Everything your need to know to setup your SuperGreenLab bundle.',
  },
]

export default {
  components: { Header, Footer, TitleGuide, SectionTitle, CardGuide, Newsletter },
  computed: {
    allGuides: () => guides.filter(guide => guide.first == null),
    sections: () => sections,
    guides: () => (tag) => {
      const gs = guides.filter(guide => guide.first == null && guide.ready && guide.tags.includes(tag))
      gs.sort((g1, g2) => g1.order - g2.order)
      gs.push(...Array.from(Array(5)).map(a => ({spacer: true})))
      return gs
    },
    testGuides: () => guides.filter(guide => guide.first == null && !guide.ready).sort((g1, g2) => g1.order - g2.order),
  }
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
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

.space
  height: 40pt

.topicContainer
  display: flex
  flex-wrap: wrap
  align-items: center
  max-width: 1300px
  margin: 10px 0
  @media only screen and (max-width: 600pt)
    justify-content: center

.cardContainer
  display: flex
  flex-direction: column
  width : 300px
  margin: 10px

.titlestep
  width: 100%
  height: 100%
  display: flex
  justify-content: flex-end
  align-items: center

.containerSeparator
  display: flex
  justify-content: center

SectionTitle
  display: flex
  justify-content: flex-start

.separator
  width: 100%
  border: 2px solid
  color: #dddddd
  border-style: none none dashed none
  margin-top: 30px
  margin-bottom: 30px

</style>
