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
      <h2>{{ brandProduct.name }} BY&nbsp;<a :id='$style.brand' :href='brand.url' target='_blank'>{{ brand.name }}</a></h2>
      <a :id='$style.linkto' v-if='showProductLink' :href='productURL' target='_blank'>SEE PRODUCT <img src='~/assets/img/icon-open-link.svg' /></a>
    </div>
    <div :id='$style.body'>
      <nuxt-link :id='$style.piccontainer' :to='link'>
        <div :id='$style.pic' :style='{"background-image": `url(/img/${brandProduct.pics[0].fileLarge})`}'></div>
      </nuxt-link>
      <div :id='$style.infos'>
        <div :id='$style.description'>
          <h3 :id='$style.soldby'>SOLD AT&nbsp;<a :id='$style.seller' :href='productURL' target='_blank'>{{ seller.name }}</a></h3>
          <nuxt-link :to='link'>
            <b>{{ brandProduct.tagline }}</b>
            <div v-html='$md.render(brandProduct.description.substr(0, 200) + "...")'></div>
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
          <Price :lineItems='[lineItem]' />
          <OutOfStock v-if='lineItem.sellingPoint.outofstock' />
          <div v-if='alternateSellingPoint' :id='$style.alternative'><a href='javascript:void(0)' @click='switchToAlternate'>Group with<br /><b>{{ alternative.name }}</b><br />Warehouse</a></div>
        </div>
      </div>
      <div :id='$style.checkbox' v-if='showCheckbox' :class='$style.desktopcheckbox'>
        <CheckBox @click='toggleChecked' :checked='lineItem.checked' :label='checkboxLabel || "Bought it"' />
      </div>
      <div :id='$style.delete'>
        <a href='javascript:void(0)' @click='deleteLineItem'>
          <img src='~/assets/img/garbage-can.svg'/>
        </a>
      </div>
    </div>
    <div v-if='switching' :id='$style.switching' :style='{"opacity": switchingOpacity}'>
      Switching to {{ alternative.name }}
    </div>
  </section>
</template>

<script>

import Number from '~/components/widgets/number.vue'
import Price from '~/components/products/price.vue'
import CheckBox from '~/components/widgets/checkbox.vue'
import OutOfStock from '~/components/products/outofstock.vue'

import { brandProduct, brand, seller, region, } from '~/lib/json_db.js'

export default {
  components: {Number, Price, CheckBox, OutOfStock, },
  props: ['lineItem', 'showCheckbox', 'showProductLink', 'onDeleteLineItem', 'onChangeLineItem', 'onToggleChecked', 'checkboxLabel', 'alternative',],
  data() {
    return {
      switching: false,
      switchingOpacity: 0,
    }
  },
  computed: {
    brandProduct() {
      const { lineItem } = this.$props
      return brandProduct(lineItem.sellingPoint.BrandProduct[0])
    },
    brand() {
      return brand(this.brandProduct.Brand[0])
    },
    seller() {
      const { lineItem } = this.$props
      return seller(lineItem.sellingPoint.Seller[0])
    },
    productURL() {
      const { lineItem } = this.$props
      if (this.seller.type == 'amazon') return `${lineItem.sellingPoint.url}?tag=${this.seller.params.amazon.tag}`
      return lineItem.sellingPoint.url
    },
    link() {
      const { lineItem: { product, sellingPoint } } = this.$props
      if (product.type.indexOf("SGL_BUNDLE") !== -1) {
        return `/bundle/${product.slug}`
      }
      const sglSellerIDs = [process.env.sglSellerID, process.env.sgteuSellerID, process.env.sgtusSellerID]
      if (sglSellerIDs.includes(this.seller.id)) {
        return `/product/${product.slug}`
      }
      return `/product/${sellingPoint.slug}`
    },
    alternateSellingPoint() {
      if (!this.$props.alternative) {
        return null
      }
      const sellingPoint = this.$store.getters['eshop/sellingPointForProduct'](this.$props.lineItem.product.id, region(this.$props.alternative.regions[0]))
      if (sellingPoint.id == this.$props.lineItem.sellingPoint.id) {
        return null
      }
      return sellingPoint
    },
  },
  methods: {
    deleteLineItem() {
      const { lineItem, onDeleteLineItem } = this.$props
      if (onDeleteLineItem) {
        onDeleteLineItem()
        return
      }
      this.$store.commit('checkout/addToCart', Object.assign({}, lineItem, { n: 0 }))
    },
    changeLineItem(n) {
      const { lineItem, onChangeLineItem } = this.$props
      if (onChangeLineItem) {
        onChangeLineItem(n)
        return
      }
      this.$store.commit('checkout/addToCart', Object.assign({}, lineItem, { n }))
    },
    toggleChecked() {
      const { lineItem, onToggleChecked } = this.$props
      if (onToggleChecked) {
        onToggleChecked()
        return
      }
      this.$store.commit('checkout/checkLineItem', { lineItem, checked: !lineItem.checked })
      if (!lineItem.checked) {
        this.$analytics.trackEvent('lineitem', 'bought', lineItem.sellingPoint.slug, this.$store.getters['checkout/lineItemsPrice']([lineItem], true, true))
      }
    },
    switchToAlternate() {
      const alternateSellingPoint = this.alternateSellingPoint
      this.$data.switching = true
      setTimeout(() => {
        this.$data.switchingOpacity = 1
      }, 1)
      setTimeout(() => {
        this.$store.commit('checkout/addToCart', Object.assign({}, this.$props.lineItem, {sellingPoint: alternateSellingPoint}))
        this.$store.commit('checkout/addToCart', Object.assign({}, this.$props.lineItem, {n: 0}))
      }, 1000)
    },
  }
}

</script>

<style module lang=stylus>

#container
  position: relative
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
  margin-top: 5px

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
  flex: 1
  padding: 10pt 5pt
  justify-self: stretch

#description p
  padding: 0
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
  flex: 0.1
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

#alternative
  text-align: center
  margin-top: 5px
  > a
    color: #3bb30b

#switching
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(255, 255, 255, 0.8)
  display: flex
  align-items: center
  justify-content: center
  font-weight: bold
  font-size: 17pt
  text-align: center
  color: #454545
  opacity: 0
  transition: opacity 0.3s

</style>
