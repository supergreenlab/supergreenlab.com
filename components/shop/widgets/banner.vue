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
  <div :id='$style.pictureBanner' :style='{"background-image": `url(${require(`~/assets/img/${config.picture[0].fileLarge}`)})`}'>
    <div :id='$style.titleBanner'>{{ config.title }}</div>
    <div :id='$style.linkBanner'>{{ config.link }}</div>
    <div :id='$style.productsBanner'>{{ config.products }}</div>
    <!-- <ProductList :products='config.products.pics' :id='$style.productsBanner'></ProductList> -->
  </div>
</section>

</template>

<script>
// import ProductList from '~/components/products/productlist.vue'

// import { products } from '~/config/products.json'

export default {
  props: ['config',],
  // components: {ProductList,},
  // computed: {
  //   products() {
  //     const { config } = this.$props
  //     return config.products.map(p => products.find(p2 => p2.id == p))
  //   }
  // }
}
</script>

<style module lang=stylus>

#pictureBanner
  height: 160pt
  width: 100%
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  display: flex
  flex-direction: column

#titleBanner
  font-family: plumeAd
  color: white
  -webkit-text-stroke: 0.5px black
  margin-top: 20pt
  margin-left: 20pt
  text-transform: uppercase
  font-weight: bold
  font-size: 1.5em
  color: #ffffff

#productsBanner
  align-self: flex-end
  margin-right: 20pt

</style>
