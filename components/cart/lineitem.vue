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
      <h2>{{ lineItem.product.name }} BY&nbsp;<a :id='$style.brand' :href='brand.url' target='_blank'>{{ brand.name }}</a></h2>
      <a :id='linkto' v-if='showProductLink' :href='lineItem.sellingPoint.url' target='_blank'>SEE PRODUCT <img src='~/assets/img/icon-open-link.svg' /></a>
    </div>
    <div :id='$style.body'>
      <div :id='$style.pic' :style='{"background-image": `url(${require(`~/assets/img/${brandProduct.pics[0].fileLarge}`)})`}'></div>
      <div :id='$style.infos'>
        <div :id='$style.description' v-html='$md.render(brandProduct.description.substr(0, 150) + "...")'></div>
        <div :id='$style.price'>
          <div :id='$style.nitems'>
            QTY
            <Number :value='lineItem.n' v-on:input='changeLineItem' />
          </div>
          <Price :price='lineItem.sellingPoint.price * lineItem.n' :promoDiscount='promoDiscount' />
        </div>
      <div :id='$style.checkbox' v-if='showCheckbox'>
        <CheckBox @click='toggleChecked' :checked='lineItem.checked' label='Bought it' />
      </div>

      </div>
      <div :id='$style.delete'>
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
import CheckBox from '~/components/widgets/checkbox.vue'

export default {
  components: {Number, Price, CheckBox,},
  props: ['lineItem', 'showCheckbox', 'showProductLink', 'promoDiscount'],
  computed: {
    brandProduct() {
      const { lineItem } = this.$props
      return this.$store.getters['eshop/brandProduct'](lineItem.sellingPoint.BrandProduct[0])
    },
    brand() {
      return this.$store.getters['eshop/brand'](this.brandProduct.Brand[0])
    },
  },
  methods: {
    deleteLineItem() {
      const { lineItem } = this.$props
      this.$store.commit('checkout/addToCart', Object.assign({}, lineItem, { n: 0 }))
    },
    changeLineItem(n) {
      const { lineItem } = this.$props
      this.$store.commit('checkout/addToCart', Object.assign({}, lineItem, { n }))
    },
    toggleChecked() {
      const { lineItem } = this.$props
      this.$store.commit('checkout/checkLineItem', { lineItem, checked: !lineItem.checked })
    },
  }
}

</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  margin-bottom: 15pt

#title
  display: flex
  justify-content: space-between
  border-bottom: 2px solid #9a9a9a
  color: #454545

#title > h2
  display: flex
  align-items: flex-end
  font-weight: 500
  text-transform: uppercase
  margin: 0

#linkto
  color: #3bb30b
  font-weight: bold

#body
  display: flex
  @media only screen and (max-width: 600pt)
    align-items: center
    flex-direction: column

#body > div, #nitems
  flex: 1
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

#price
  display: flex
  flex-direction: column

#brand
  color: #454545

#infos
  display: flex
  flex: 1
  align-items: center
  justify-content: center
  flex-direction: row !important
  @media only screen and (max-width: 600pt)
    flex-direction: column !important
 
#pic
  flex: 0.3 !important
  width: 150px
  height: 150px
  margin: 10pt 0
  background-position: top
  background-size: contain
  background-repeat: no-repeat
  @media only screen and (max-width: 600pt)
    flex: auto !important
    height: 200px
    background-position: center

#description
  flex: 2 !important
  padding: 10pt 5pt
  align-items: flex-start !important
  @media only screen and (max-width: 600pt)
    display: none !important

#description > strong
  color: #3bb30b

#delete
  flex: 0.2 !important
  @media only screen and (max-width: 600pt)
    display: none !important

#checkbox
  padding: 0 0 0 30pt
  @media only screen and (max-width: 600pt)
    padding: 20pt 0 0 10pt

</style>
