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
   {{ title }}
   {{ product }}
  </section>
</template>

<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import Item from '~/components/products/productitem.vue'
import Region from '~/components/products/region.vue'

import { open, screenX, availWidth } from '~/lib/client-side.js'

export default {
  props: ['products', 'center', 'maxItems',],
  components: {SectionTitle, Item, Region,},
  data() {
    return {
      showAllProducts: this.$props.maxItems ? false : true,
    }
  },
  methods: {
    proposeSellingPoint() {
      const width = 800
      open('https://airtable.com/shrVYGaBGhAUFSJvm', '_blank', `width=${width},height=600,top=100,left=${screenX() + availWidth()/2 - width/2}`)
      this.$matomo && this.$matomo.trackEvent('productlist', 'propose')
    },
    toggleShowAll() {
      this.$data.showAllProducts = !this.$data.showAllProducts
      if (this.$data.showAllProducts) {
        this.$matomo && this.$matomo.trackEvent('productlist', 'showAll')
      }
    }
  },
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

.center
  justify-content: center

.product
  flex-basis: 33%
  @media only screen and (min-width: 1200px)
    padding: 20pt 9pt
    flex-basis: 25%
  @media only screen and (max-width: 600px)
    padding: 20pt 3pt

#region
  display: flex
  flex-direction: column
  align-items: flex-end

#propose
  display: flex
  flex-direction: column
  align-items: flex-end

#propose a
  color: #454545

</style>
