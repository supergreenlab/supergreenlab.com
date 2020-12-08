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
      <a :id='$style.linkto' v-if='showProductLink' :href='lineItem.sellingPoint.url' target='_blank'>SEE PRODUCT <img src='~/assets/img/icon-open-link.svg' /></a>
    </div>
    <div :id='$style.body'>
      <nuxt-link :id='$style.piccontainer' :to='lineItem.product.type.indexOf("SGL_BUNDLE") == -1 ? `/product/${lineItem.sellingPoint.slug}` : `/bundle/${lineItem.product.slug}`'>
        <div :id='$style.pic' :style='{"background-image": `url(${require(`~/assets/img/${brandProduct.pics[0].fileLarge}`)})`}'></div>
      </nuxt-link>
      <div :id='$style.infos'>
        <div :id='$style.description'>
          <h3 :id='$style.soldby'>SOLD BY&nbsp;<a :id='$style.seller' :href='seller.url' target='_blank'>{{ seller.name }}</a></h3>
          <nuxt-link :to='lineItem.product.type.indexOf("SGL_BUNDLE") == -1 ? `/product/${lineItem.sellingPoint.slug}` : `/bundle/${lineItem.product.slug}`'>
            <p v-html='$md.render(brandProduct.description.substr(0, 200) + "...")'></p>
          </nuxt-link>
        </div>
        <div :id='$style.price'>
          <div :id='$style.checkbox' v-if='showCheckbox' :class='$style.mobilecheckbox'>
            <CheckBox @click='toggleChecked' :checked='lineItem.checked' label='Bought it' />
          </div>
          <div :id='$style.nitems'>
            QTY
            <Number :value='lineItem.n' v-on:input='changeLineItem' />
          </div>
          <Price :lineItems='[lineItem]' :promoDiscount='promoDiscount' />
        </div>
      </div>
      <div :id='$style.checkbox' v-if='showCheckbox' :class='$style.desktopcheckbox'>
        <CheckBox @click='toggleChecked' :checked='lineItem.checked' label='Bought it' />
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
    seller() {
      const { lineItem } = this.$props
      return this.$store.getters['eshop/seller'](lineItem.sellingPoint.Seller[0])
    }
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
  padding-bottom: 10pt
  border-bottom: 1pt dashed #cccccc
  color: #454545

#title
  display: flex
  justify-content: space-between
  align-items: center
  border-bottom: 2px solid #9a9a9a
  color: #454545
  @media only screen and (max-width: 600pt)
    font-size: 0.8em

#title > h2
  font-weight: 500
  text-transform: uppercase
  margin: 0

#linkto
  color: #3bb30b
  font-weight: bold
  white-space: nowrap

#body
  display: flex
  align-items: center
  justify-content: center

#nitems
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

#price
  display: flex
  flex: 0.7
  align-items: center
  justify-content: center
  flex-direction: column

#brand
  color: #454545

#seller
  color: #454545
  text-transform: uppercase

#infos
  display: flex
  flex: 1
  flex-direction: row !important
  @media only screen and (max-width: 600pt)
    align-items: center
    justify-content: center
    flex-direction: column !important

#soldby
  margin: 2pt 0 10pt 0
  color: #454545
  @media only screen and (max-width: 600pt)
    margin: 2pt 0 2pt 0

#piccontainer
  flex: 0.3
  margin: 10pt 0
  @media only screen and (max-width: 600pt)
    flex: 0.45
    height: 110px
    margin: 10pt 15pt 10pt 5pt
 
#pic
  height: 150px
  background-position: top
  background-size: contain
  background-repeat: no-repeat
  @media only screen and (max-width: 600pt)
    background-position: center

#description
  flex: 2
  padding: 10pt 5pt
  justify-self: stretch

#description > p
  @media only screen and (max-width: 600pt)
    display: none !important

#description > strong
  color: #3bb30b

#description ul, #description ol
  padding: 0
  list-style-type: none

#description li
  margin: 2pt 0

#description li::before
  content: '- '
  color: #3bb30b
  font-weight: bold

#description a
  color: #454545
  text-decoration: none

#description a:hover
  text-decoration: underline

#delete
  flex: 0.2
  display: flex
  align-items: center
  justify-content: center
  @media only screen and (max-width: 600pt)
    display: none !important

#checkbox
  flex: 0.2

.mobilecheckbox
  padding-bottom: 10pt
  @media only screen and (min-width: 600pt)
    display: none

.desktopcheckbox
  padding: 0 0 0 30pt
  @media only screen and (max-width: 600pt)
    display: none

</style>
