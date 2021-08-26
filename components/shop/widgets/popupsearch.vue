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
   <VueFuse
     :list="products"
     :defaultAll="false"
     :fuse-opts="options"
     :search="search"
     :map-results="false"
     placeholder="Looking for something..."
     @fuse-results="handleResults"
     @fuse-input="onInputChange"
     />
   <div :id="$style.searchlist" v-if='results.length'>
     <SmallProductList :id='$style.smallproductlist' :products='results.map(i => i.item)' />
   </div>
 </section>
</template>

<script>
import SmallProductList from '~/components/products/smallproductlist.vue'
import VueFuse from '~/components/shop/widgets/vuefuse.vue'

import { products } from '~/config/products.json'

export default {
  components: {SmallProductList, VueFuse},
  props: ['onShowResults',],
  data () {
    return {
      search: '',
      results: [],
    }
  },
  computed: {
    products() {
      return products
    },
    options () {
      return {
        keys: ['name','SellingPoints.BrandProduct.name', 'description', 'SellingPoints.BrandProduct.description'],
      }
    },
  },
  methods: {
    handleResults (r) {
      this.results = r
    },
    onInputChange(i) {
      this.$props.onShowResults(i != '')
    },
  },
}
</script>

<style module lang=stylus>

#container
  width: 100%

#searchlist
  width: 100%
  top: 25pt
  background-color: white
  padding: 5pt

</style>
