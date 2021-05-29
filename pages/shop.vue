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
          Colonne gauche
        </div>
        <div :id='$style.content'>
          Contenu
        </div>
        <div :id='$style.rightcolumn'>
         Colonne droite
        </div>
      </div>
  </section>
</template>

<script>

import Header from '~/components/shop/layout/header.vue'
import Product from '~/components/shop/layout/singleproduct.vue'

import BannerContent from '~/components/shop/components/bannercontainer.vue'
import CarrouselContent from '~/components/shop/components/carrouselcontainer.vue'

import Banner from '~/components/shop/widgets/banner.vue'
import CategoryList from '~/components/shop/widgets/categorylist.vue'
import Newsletter from '~/components/shop/widgets/newsletter.vue'
import Spotlight from '~/components/shop/widgets/spotlight.vue'
import ProductList from '~/components/shop/widgets/productlist.vue'

import Footer from '~/components/layout/footer.vue'

export default{
  components: {Header, Product, BannerContent, CarrouselContent, Banner, CategoryList, ProductList, Newsletter, Spotlight, Footer},

  computed: {
    bundles() {
			return this.$store.getters['eshop/bundles']
		},
    sglSpareParts() {
      return this.$store.getters['eshop/leds'].concat(this.$store.getters['eshop/accessories'])
    },
    furnitures() {
      return this.$store.getters['eshop/collection']('homepage-furniture')
    },
    tools() {
      return this.$store.getters['eshop/productsWithTypes'](['TOOLS'])
    },
    sglAddons() {
      return this.$store.getters['eshop/collection']('sgl-addons')
    },
	},

}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
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
  flex-direction: column
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
  position: fixed
  width: 220px
  height: 100%
  @media only screen and (max-width: 1200px)
    display: none

#rightcolumn
  display:flex
  flex-direction: column
  right: 0px
  position: fixed
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

</style>
