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
      <div :class='$style.topicContainer'>
        <div :class='$style.cardContainer'>
          <TitleGuide title='Growing Guides'
                    green='SuperGreenPedia'
                    content="Welcome to the brand new Guides page! As you can see we still need a bit of work to fill with guides 😅 Well good news we're full at it right now, stay tuned! You'll find here all our quick-guides related to growing awesome plants and building stealth growboxes."/>
        </div>
        <CardGuide v-for='guide in guides' :key="guide.id"
                       :class='$style.cardContainer'
                       :guide='guide'
                       userStep='0'/>
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

export default {
  components: { Header, Footer, TitleGuide, SectionTitle, CardGuide, Newsletter },
  computed: {
    guides: () => guides.filter(guide => guide.first == null).sort((g1, g2) => g1.order - g2.order),
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
  width: 95%
  border: 2px solid
  color: #C4C4C4
  border-style: none none dashed none
  margin-top: 30px
  margin-bottom: 30px
</style>
