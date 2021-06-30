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
    <div :id="$style.titleList">{{config.title}}</div>
    <div :id='$style.description'>{{config.description}}</div>
    <ProductList :products='soil'></ProductList>
    <!-- <ProductList :products='coucou'></ProductList> -->
  </section>
</template>

<script>
import ProductList from '~/components/products/productlist.vue'

import { products } from '~/config/products.json'

export default {
  props: ['config',],
  components: {ProductList,},
  computed: {
<<<<<<< HEAD
    soil() {
      const { config } = this.$props
      console.log(config)
      return this.$store.getters['eshop/widgetsWithProducttypes'](['TOOLS'])
    }
    // coucou: () => (products) =>  widgets['products'].filter(st => st.product == products),
    // coucou() {
    //   const { config } = this.$props
    //   return console.log(config)
    // }
    // products: () => (products) =>  widgets['producttypes'].filter(st => st.product == products),
    // products() {
    //   const { config } = this.$props
    //   return config.products.map(p => products.find(p2 => p2.id == p))
      // if (config.length == 0) {
      //   console.log(config.length)
      // }
    // }
    // if products is null then return map widget producttype

=======
    products() {
      const { config } = this.$props
      return (config.products || []).map(p => products.find(p2 => p2.id == p))
    }
  },
  methods: {
>>>>>>> f61757adec98fc65db79efa064afffb99ba7af75
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center

#title
  margin: 20pt 0 20pt 0

#body
  display: flex
  align-items: center
  flex-wrap: wrap
  @media only screen and (max-width: 600px)
    justify-content: center

#titleList
  text-transform: uppercase
  font-weight: bold
  margin-left: 50px
  font-size: 2.5em
  color: #5E5E5E
  @media only screen and (max-width: 600px)
    margin-left: 5px

#description
  color: #3bb30b

</style>
