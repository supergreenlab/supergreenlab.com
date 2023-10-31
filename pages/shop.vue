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
       <Header :onShowResults='onShowResults' location='SHOP_CENTER_COLUMN'/>
     </div>
   </div>
   <div :id='$style.fullcontent'>
     <div :id='$style.leftcolumn'>
       <Shop location='SHOP_LEFT_COLUMN' />
     </div>
     <div v-if='!showSearchResults' :id='$style.content'>
       <Shop name='shop-page' location='SHOP_CENTER_COLUMN' nomargin='true' />
     </div>
     <div v-else :id='$style.content'>
       <div :id="$style.searchlist">
         <SmallProductList location='search' :id='$style.smallproductlist' :products='searchResults.map(i => i.item)' />
       </div>
     </div>
     <div :id='$style.rightcolumn'>
       <Shop location='SHOP_RIGHT_COLUMN' />
     </div>
   </div>
   <Footer />
 </section>
</template>

<script>

import Header from '~/components/shop/layout/header.vue'
import Footer from '~/components/layout/footer.vue'

import SmallProductList from '~/components/products/smallproductlist.vue'
import Shop from '~/components/shop/shop.vue'

export default {
  components: {Header, SmallProductList, Shop, Footer},
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
  methods: {
    onShowResults(input, results) {
      this.$data.showSearchResults = input.length
      this.$data.searchResults = results
      window.scrollTo({ top: 0, behavior: 'smooth' })
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

</style>
