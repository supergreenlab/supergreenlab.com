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
    <h2 :id="$style.titleList">{{config.title}}</h2>
    <div :id="$style.headerProductList">
      <div :id="$style.picContainer">
        <div :id="$style.pic" :style='{"background-image": `url(${require(`~/assets/img/${config.picture[0].fileFull}`)})`}'></div>
      </div>
      <div :id='$style.description'>{{config.description}}</div>
    </div>
    <ProductListComponent :products='products' :center=true />
  </section>
</template>

<script>
import ProductListComponent from '~/components/products/productlistcomponent.vue'

export default {
  props: ['config',],
  components: { ProductListComponent},
  computed: {
    products() {
      const { config } = this.$props
      // console.log(config)
      return [].concat(...(config.producttypes || []).map(t => this.$store.getters['eshop/productsWithTypes'](t))).filter((p, i, a) => {
        return a.indexOf(p) == i
      })
    },
  },
  methods: {

  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center

#body
  display: flex
  align-items: center
  flex-wrap: wrap
  @media only screen and (max-width: 600px)
    justify-content: center

#titleList
  text-transform: uppercase
  font-weight: bold
  margin-bottom: 10pt
  font-size: 2.5em
  color: #5E5E5E

#description
  margin: 0 5pt
  text-align: justify

#pic
  width: 100pt
  height: 100pt
  background-position: center
  background-size: cover
  background-repeat: no-repeat
  margin: 0 5pt

#headerProductList
  display: flex
  width: 100%
  align-self: center
  margin-left: 20pt
  @media only screen and (max-width: 900px)
    margin-left: 0

#productlist
  @media only screen and (max-width: 900px)
    display: none

#smallproductlist
  display: none
  @media only screen and (max-width: 900px)
    display: block

</style>
