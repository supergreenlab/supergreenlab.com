<!--
      Copyright (C) 2022  SuperGreenLab <towelie@supergreenlab.com>
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
    <component  v-for="c in containersForLocation(location)" :id='c.slug' :key="c.id" :is='componentForName(c.component)' :config='c'>
      <div v-if='nomargin && !c.nomargin' :class='$style.spacer'></div>
      <div :class='nomargin && !c.nomargin ? $style.widgetcontainer : ""' v-for='w in widgetsForContainer(c)' :key='w.id' :ref='w.slug'>
        <component :is='componentForName(w.component)' :config='w' :container='c'></component>
        <div v-if='nomargin && !c.nomargin' :class='$style.spacer'></div>
      </div>
    </component>
  </section>
</template>

<script>

import BannerContainer from '~/components/shop/containers/bannercontainer.vue'
import CarrouselContainer from '~/components/shop/containers/carrouselcontainer.vue'
import VerticalContainer from '~/components/shop/containers/verticalcontainer.vue'
import HorizontalContainer from '~/components/shop/containers/horizontalcontainer.vue'

import Banner from '~/components/shop/widgets/banner.vue'
import Newsletter from '~/components/shop/widgets/newsletter.vue'
import PlantSpotlight from '~/components/shop/widgets/plantspotlight.vue'
import ProductList from '~/components/shop/widgets/productlist.vue'
import ProductSpotlight from '~/components/shop/widgets/productspotlight.vue'
import GuideSpotlight from '~/components/shop/widgets/guidespotlight.vue'
import CountDown from '~/components/shop/widgets/countdown.vue'
import CollectionSpotlight from '~/components/shop/widgets/collectionspotlight.vue'
import Edito from '~/components/shop/widgets/edito.vue'
import RegionSelector from '~/components/shop/widgets/regionselector.vue'
import Youtube from '~/components/shop/widgets/youtube.vue'

import widgets from '~/config/widgets.json'

import { addEventListener, removeEventListener, innerHeight, } from '~/lib/client-side.js'

const components = {BannerContainer, CarrouselContainer, GuideSpotlight, ProductSpotlight, VerticalContainer, HorizontalContainer, Banner, ProductList, Newsletter, PlantSpotlight, CountDown, CollectionSpotlight, Edito, RegionSelector, Youtube}

export default {
  props: ['location', 'nomargin', 'name'],
  components,
  computed: {
    componentForName: () => name => components[name],
    containersForLocation: () => (location) =>  widgets['shop'].filter(st => !st.test && st.location == location).sort((o1, o2) => o1.order - o2.order),
    widgetsForContainer: () => (container) => (container.widgets || []).map(wid => widgets['widgets'].find(w => w.id == wid)).filter(w => !w.date || Date.parse(w.date) < (new Date()).getTime()).filter(w => !w.expiration || Date.parse(w.expiration) > (new Date()).getTime()).sort((w1, w2) => (w1.order || 0) - (w2.order || 0)),
  },
  created () {
    if (this.$props.name) {
      addEventListener('scroll', this.handleScroll);
    }
  },
  destroyed () {
    if (this.$props.name) {
      if (this.timeout) clearTimeout(this.timeout)
      removeEventListener('scroll', this.handleScroll);
    }
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
              this.$analytics.trackEvent(this.$props.name, 'scrollto', name)
              this.lastEvent = name
              this.$data.currentRef = name
            }
          })
        })
      }, 250)
    },
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column

.widgetcontainer
  margin: 20pt 0

.spacer
  height: 10pt

</style>
