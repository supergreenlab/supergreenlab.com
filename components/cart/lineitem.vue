<!--
      Copyright (C) 2020  SuperGreenLab <towelie@supergreenlab.com>
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
    <div :id='$style.title'>
      <h2>{{ lineItem.product.name }}</h2>
    </div>
    <div :id='$style.body'>
      <div :id='$style.pic' :style='{"background-image": `url(${require(`~/assets/img/${brandProduct.pics[0].fileLarge}`)})`}'></div>
      <div :id='$style.description' v-html='$md.render(brandProduct.description.substr(0, 200) + "...")'></div>
      <div :id='$style.nitems'>
        <Number :value='lineItem.n' v-on:change='changeLineItem' />
      </div>
      <div :id='$style.price'>
        <Price :price='lineItem.sellingPoint.price' />
      </div>
      <div :id='$style.buttons'>
        <a href='javascript:void(0)' @click='deleteLineItem'>
          <img src='~/assets/img/garbage-can.svg'/>
        </a>
      </div>
    </div>
  </section>
</template>

<script>

import Number from '~/components/widgets/number.vue'
import Price from '~/components/products/price.vue'

export default {
  components: {Number, Price,},
  props: ['lineItem'],
  computed: {
    brandProduct() {
      const { lineItem } = this.$props
      return this.$store.getters['eshop/brandProduct'](lineItem.sellingPoint.BrandProduct[0])
    }
  },
  methods: {
    deleteLineItem() {
    },
    changeLineItem(n) {
      const { lineItem } = this.$props
      this.$store.commit('checkout/addToCart', Object.assign({}, lineItem, { n }))
    }
  }
}

</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column

#title
  display: flex
  border-bottom: 2px solid #9a9a9a
  color: #454545

#title > h2
  display: flex
  align-items: flex-end
  font-weight: 500
  text-transform: uppercase
  margin: 0

#body
  display: flex

#body > div
  flex: 1
  display: flex
  align-items: center
  justify-content: center
 
#pic
  width: 150px
  height: 150px
  margin: 10pt 0
  background-position: top
  background-size: contain
  background-repeat: no-repeat

#description
  flex: 2 !important
  padding: 10pt 5pt
  align-items: flex-start !important

#description > strong
  color: #3bb30b
 
</style>
