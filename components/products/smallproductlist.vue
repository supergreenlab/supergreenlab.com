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
    <div :id='$style.title' v-if='title || subtitle'>
      <SectionTitle :title='title'
                    :green='subtitle' />
    </div>
    <div :id='$style.region'>
      <Region />
    </div>
    <div :id='$style.body'>
      <div v-for='product in products' :key='product.id' :class='$style.product'>
        <Item :promoDiscount='promoDiscount' :product='product' />
      </div>
    </div>
  </section>
</template>

<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import Item from '~/components/products/smallproductitem.vue'
import Region from '~/components/products/region.vue'

export default {
  props: ['title', 'subtitle', 'promoDiscount', 'products',],
  components: {SectionTitle, Item, Region,},
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  justify-content: center

#title
  margin: 20pt 0 20pt 0

#body
  display: flex
  flex-direction: column

.product
  @media only screen and (max-width: 600px)
    padding: 20pt 5pt

#region
  display: flex
  justify-content: flex-end

</style>
