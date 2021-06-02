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
      <div :id='$style.header'>
        <Header/>
      </div>
      <div :id='$style.fullcontent'>
        <div :id='$style.leftcolumn'>
          <component v-for="c in containersForLocation('SHOP_LEFT_COLUMN')" :key="c.id" :is='componentForName(c.component)' v-bind='c'>
            <component v-for='w in widgetsForContainer(c)' :key='w.id' :is='componentForName(w.component)' v-bind='w'></component>
          </component>
        </div>
        <div :id='$style.content'>
          <component v-for="c in containersForLocation('SHOP_CENTER_COLUMN')" :key="c.id" :is='componentForName(c.component)' v-bind='c'>
            <component v-for='w in widgetsForContainer(c)' :key='w.id' :is='componentForName(w.component)' v-bind='w'></component>
          </component>
        </div>
        <div :id='$style.rightcolumn'>
         <component v-for="c in containersForLocation('SHOP_RIGHT_COLUMN')" :key="c.id" :is='componentForName(c.component)' v-bind='c'>
            <component v-for='w in widgetsForContainer(c)' :key='w.id' :is='componentForName(w.component)' v-bind='w'></component>
          </component>
        </div>
      </div>
  </section>
</template>

<script>

import Header from '~/components/shop/layout/header.vue'
import Product from '~/components/shop/layout/singleproduct.vue'
import Footer from '~/components/layout/footer.vue'

import BannerContainer from '~/components/shop/containers/bannercontainer.vue'
import CarrouselContainer from '~/components/shop/containers/carrouselcontainer.vue'
import VerticalContainer from '~/components/shop/containers/verticalcontainer.vue'
import HorizontalContainer from '~/components/shop/containers/horizontalcontainer.vue'

import Banner from '~/components/shop/widgets/banner.vue'
import CategoryList from '~/components/shop/widgets/categorylist.vue'
import Newsletter from '~/components/shop/widgets/newsletter.vue'
import Spotlight from '~/components/shop/widgets/spotlight.vue'
import ProductList from '~/components/shop/widgets/productlist.vue'

import widgets from '~/config/widgets.json'

const components = {Header, Product, BannerContainer, CarrouselContainer, VerticalContainer, HorizontalContainer, Banner, CategoryList, ProductList, Newsletter, Spotlight, Footer}

export default{
  components,
  computed: {
    containersForLocation: () => (location) =>  widgets['shop'].filter(st => st.location == location),
    widgetsForContainer: () => (container) => (container.widgets || []).map(wid => widgets['widgets'].find(w => w.id == wid)),
  },
  methods: {
    componentForName: name => components[name],
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  align-items: center

#header
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 1000

#fullcontent
  display: flex
  justify-content: space-around
  height: 3000px
  width: 100%
  margin-top: 83px
  @media only screen and (max-width: 600px)
    display: flex
    justify-content: center

#content
  display: flex
  align-items: center
  margin: 0px 220px
  width: 100%
  height: 100%
  background-color: #fff
  @media only screen and (max-width: 1200px)
    margin 20px 0px

#leftcolumn
  display:flex
  flex-direction: column
  left: 0px
  width: 220px
  height: 100%
  @media only screen and (max-width: 1200px)
    display: none

#rightcolumn
  display:flex
  flex-direction: column
  right: 0px
  width: 220px
  height: 100%
  @media only screen and (max-width: 1200px)
    display: none


.shop
  display: flex
  width: 100%
  max-width: 900pt
  padding: 0 15pt

.pack
  width: 80%
  display: flex
  justify-content: center

#bundles
  display: flex
  justify-content: space-around
  align-items: center
  width: 100%
  @media only screen and (max-width: 600px)
    flex-direction: column

.bundle
  margin: 10px
  width: 100%
  /* max-width: 920pt */
  height: 100%
  /* border-radius: 10px
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px; */
  @media only screen and (max-width: 600px)
    width: 100%
    height: 100%

.title
  width: 100%
  margin: 20pt 0pt 20pt 0

.space
  width: 100%
  margin: 60px
  @media only screen and (max-width: 600px)
    margin: 30px

.test
  margin: 10px
</style>
