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
 <section :id="$style.container">
   <div id='header_wrapper'>
     <div :id='$style.header'>
       <Header :onShowResults='onShowResults' :containers="containersForLocation('SHOP_CENTER_COLUMN')"/>
     </div>
   </div>
   <div :id='$style.fullcontent'>
     <div :id='$style.leftcolumn'>
       <component v-for="c in containersForLocation('SHOP_LEFT_COLUMN')" :key="c.id" :is='componentForName(c.component)' :config='c'>
         <component v-for='w in widgetsForContainer(c)' :key='w.id' :is='componentForName(w.component)' :config='w'></component>
       </component>
     </div>
     <div v-if='!showSearchResults' :id='$style.content'>
       <component  v-for="c in containersForLocation('SHOP_CENTER_COLUMN')" :id='c.slug' :key="c.id" :is='componentForName(c.component)' :config='c'>
         <div v-if='!c.nomargin' :id='$style.spacer'></div>
         <div :class='!c.nomargin ? $style.widgetcontainer : ""' v-for='w in widgetsForContainer(c)' :key='w.id' :ref='w.slug'>
           <component :is='componentForName(w.component)' :config='w'></component>
           <div v-if='!c.nomargin' :id='$style.spacer'></div>
         </div>
       </component>
     </div>
     <div v-else :id='$style.content'>
       <div :id="$style.searchlist">
         <SmallProductList :id='$style.smallproductlist' :products='searchResults.map(i => i.item)' />
       </div>
     </div>
     <div :id='$style.rightcolumn'>
       <component v-for="c in containersForLocation('SHOP_RIGHT_COLUMN')" :key="c.id" :is='componentForName(c.component)' :config='c'>
         <component v-for='w in widgetsForContainer(c)' :key='w.id' :is='componentForName(w.component)' :config='w'></component>
       </component>
     </div>
   </div>
   <Footer />
 </section>
</template>

<script>

import Header from '~/components/shop/layout/header.vue'
import Product from '~/components/shop/layout/singleproduct.vue'
import Footer from '~/components/layout/footer.vue'

import SmallProductList from '~/components/products/smallproductlist.vue'

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

import widgets from '~/config/widgets.json'

import { addEventListener, removeEventListener, innerHeight, } from '~/lib/client-side.js'

const components = {Header, SmallProductList, Product, BannerContainer, CarrouselContainer, GuideSpotlight, ProductSpotlight, VerticalContainer, HorizontalContainer, Banner, ProductList, Newsletter, PlantSpotlight, CountDown, CollectionSpotlight, Edito, RegionSelector, Footer}

export default {
  components,
  head() {
    return {
      title: `SuperGreenLab Shop`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Welcome to SuperGreenLab\'s shop! We\'ve been crawling the web, so you don\'t have to. Find everything you need to grow your own weed here!'
        },
      ],
    }
  },
  data() {
    return {
      searchResults: [],
      showSearchResults: false,
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
    containersForLocation: () => (location) =>  widgets['shop'].filter(st => !st.test && st.location == location).sort((o1, o2) => o1.order - o2.order),
    widgetsForContainer: () => (container) => (container.widgets || []).map(wid => widgets['widgets'].find(w => w.id == wid)).filter(w => !w.expiration || Date.parse(w.expiration) > (new Date()).getTime()),
  },
  methods: {
    componentForName: name => components[name],
    onShowResults(input, results) {
      this.$data.showSearchResults = input.length
      this.$data.searchResults = results
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
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
              centery = y + height / 2,
              winh = innerHeight()

            if (centery > winh / 4 && centery < winh * 3/4) {
              this.$matomo.trackEvent('shop-page', 'scrollto', name)
              this.lastEvent = name
            }
          })
        })
      }, 250)
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100vw
  flex-direction: column
  align-items: center

#header
  position: fixed
  width: 100vw
  top: 0
  left: 0
  z-index: 1000

#fullcontent
  display: flex
  justify-content: space-between
  width: 100%
  margin-top: 62.25pt
  @media only screen and (max-width: 1500px)
    justify-content: center
    margin-top: 75pt

#content
  display: flex
  flex-direction: column
  justify-content: center
  min-width: 0
  margin: 2pt 200pt
  width: 100%
  overflow: visible
  @media only screen and (max-width: 1500px)
    margin: 10pt 0

.widgetcontainer
  margin: 20pt 0

#leftcolumn
  height: 100%
  padding: 3pt
  margin-top: 5pt
  margin-left: 5pt
  display:flex
  flex-direction: column
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px
  width: 200pt
  position: fixed
  left: 0
  overflow: hidden
  background-color: #f4f4f4
  @media only screen and (max-width: 1500px)
    display: none

#rightcolumn
  height: 100%
  position: fixed
  right: 0
  padding: 3pt
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px
  margin-top: 5pt
  margin-right: 5pt
  display:flex
  flex-direction: column
  width: 200pt
  overflow: hidden
  background-color: #f4f4f4
  @media only screen and (max-width: 1500px)
    display: none

#searchlist
  width: 100%
  top: 25pt
  background-color: white
  padding: 5pt
  @media only screen and (min-width: 1500px)
    padding: 35pt 5pt 5pt 5pt

#spacer
  height: 10pt

</style>
