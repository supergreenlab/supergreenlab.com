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
          <component v-for="c in containersForLocation('SHOP_LEFT_COLUMN')" :key="c.id" :is='componentForName(c.component)' :config='c'>
            <component v-for='w in widgetsForContainer(c)' :key='w.id' :is='componentForName(w.component)' :config='w'></component>
          </component>
        </div>
        <div :id='$style.content'>
          <component v-for="c in containersForLocation('SHOP_CENTER_COLUMN')" :key="c.id" :is='componentForName(c.component)' :config='c'>
            <component v-for='w in widgetsForContainer(c)' :key='w.id' :is='componentForName(w.component)' :config='w'></component>
          </component>
        </div>
        <div :id='$style.rightcolumn'>
         <component v-for="c in containersForLocation('SHOP_RIGHT_COLUMN')" :key="c.id" :is='componentForName(c.component)' :config='c'>
            <component v-for='w in widgetsForContainer(c)' :key='w.id' :is='componentForName(w.component)' :config='w'></component>
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
    containersForLocation: () => (location) =>  widgets['shop'].filter(st => st.location == location).sort((o1, o2) => o1.order - o2.order),
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
  @media only screen and (max-width: 900px)
    justify-content: center

#content
  display: flex
  flex-direction: column
  justify-content: space-around
  min-width: 420pt
  margin: 5pt
  height: 100%
  @media only screen and (max-width: 1200px)
    justify-content: center

#leftcolumn
  margin-top: 5pt
  margin-left: 5pt
  display:flex
  flex-direction: column
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px
  width: 165pt
  @media only screen and (max-width: 900px)
    display: none

#rightcolumn
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px
  margin-top: 5pt
  margin-right: 5pt
  display:flex
  flex-direction: column
  width: 165pt
  @media only screen and (max-width: 900px)
    display: none


</style>
