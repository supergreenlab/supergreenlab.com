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
  <section :id='$style.container' :class='picOnly ? $style.small : ""'>
    <div :id='$style.region'>
      <Region />
    </div>
    <h3 v-if='title'>{{ title }}</h3>
    <div :id='$style.body' :class='center ? $style.center : $style.start'>
      <div ref='products' :id='$style.products' :style='{"height": height}'>
        <div v-for='(product, i) in products' :key='product.id' :class='$style.product'>
          <Item :location='location' :picOnly='picOnly' :product='product' />
        </div>
      </div>
      <div v-if='showAllProducts' :class='$style.propose'>
        <a href='javascript:void(0)' @click='proposeSellingPoint'>Propose a better product or shop</a>
      </div>
    </div>
    <div :class='$style.propose'>
      <a v-if='expandable' href='javascript:void(0)' @click='toggleShowAll'>{{ showAllProducts ? 'Hide' : 'Show' }} all items - ({{ products.length }} items)</a>
    </div>
  </section>
</template>

<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import Item from '~/components/products/tinyproductitem.vue'
import Region from '~/components/products/region.vue'

import { open, screenX, availWidth } from '~/lib/client-side.js'

export default {
  props: ['products', 'center', 'expandable', 'picOnly', 'title', 'location',],
  components: {SectionTitle, Item, Region,},
  data() {
    return {
      showAllProducts: this.$props.expandable ? false : true,
    }
  },
  methods: {
    proposeSellingPoint() {
      const width = 800
      open('https://airtable.com/shrVYGaBGhAUFSJvm', '_blank', `width=${width},height=600,top=100,left=${screenX() + availWidth()/2 - width/2}`)
      this.$analytics.trackEvent(this.$props.location || 'productlist', 'propose')
    },
    toggleShowAll() {
      this.$data.showAllProducts = !this.$data.showAllProducts
      if (this.$data.showAllProducts) {
        this.$analytics.trackEvent(this.$props.location || 'productlist', 'showAll')
      }
    }
  },
  computed: {
    height() {
      if (!this.$props.expandable) {
        return 'auto'
      }
      const height = this.$data.showAllProducts ? `${this.$refs.products.scrollHeight}px` : `110pt`
      return height
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

#container h3
  color: #5e5e5e

#title
  margin: 20pt 0 20pt 0

#body
  display: flex
  flex-direction: column

#body > a
  color: #454545

#products
  display: flex
  flex-wrap: wrap
  overflow-y: hidden
  transition: height 0.5s

.center
  justify-content: center

.start
  justify-content: flex-start

.product
  max-width: 200pt
  padding: 5pt 15pt

#container.small .product
  max-width: 100pt
  padding: 5pt 5pt

#region
  display: flex
  flex-direction: column
  align-items: flex-end
  margin: 5pt 0

.propose
  display: flex
  flex-direction: column
  align-items: flex-end
  font-size: 0.9em

.propose a
  color: #454545
  padding: 6pt 0

</style>
