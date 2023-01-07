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
    <nuxt-link @click.native='click' :id='$style.infos' :to='link'>
      <div :id='$style.pic'>
        <Pics :pics='brandProduct.pics' :hideArrow=true />
      </div>
    </nuxt-link>
    <div :id='$style.infocontainerbig'>
      <div :id='$style.description'>
        <nuxt-link @click.native='click' :to='link'>
          <h3>{{ brandProduct.name }} BY <span :class='isSGL ? $style.green : ""'>{{ brand.name }}</span></h3>
          From <b>{{ seller.name }}</b>
        </nuxt-link>
        <div :id='$style.tagline' v-if='product.tagline' v-html='$md.render(product.tagline)'></div>
        <div v-if='brandProduct.description' v-html='$md.render(brandProduct.description.substring(0, 100))'></div>
      </div>
      <div v-if='brandProduct.sellable'>
        <div :id='$style.price'>
          <Price :lineItems='[{sellingPoint, n: 1}]' :small=true />
        </div>
        <OutOfStock v-if='sellingPoint.outofstock' />
        <SmallAddToCart v-else :location='location' :product='product' :sellingPoint='sellingPoint' :discreet=false :n='1' />
      </div>
      <div v-else>
        <nuxt-link :to='link' :class='$style.download'><img width='15pt' height='15pt' src='~/assets/img/icon_download.svg' />&nbsp;Free Download</nuxt-link>
      </div>
    </div>
    <div :id='$style.infocontainersmall'>
      <div :id='$style.description'>
        <div :id='$style.smalldescription'>
          <nuxt-link @click.native='click' :to='link'>
            <h3>{{ brandProduct.name }} BY <span :class='isSGL ? $style.green : ""'>{{ brand.name }}</span></h3>
            From <b>{{ seller.name }}</b>
          </nuxt-link>

          <div v-if='brandProduct.sellable'>
            <OutOfStock v-if='sellingPoint.outofstock' />
            <SmallAddToCart v-else :location='location' :product='product' :sellingPoint='sellingPoint' :discreet=false :n='1' :center=true />
          </div>
        </div>
        <div v-if='brandProduct.sellable'>
          <div :id='$style.price'>
            <Price :lineItems='[{sellingPoint, n: 1}]' :small=true />
          </div>
        </div>
        <div v-else>
          <div :class='$style.download'><img width='15pt' height='15pt' src='~/assets/img/icon_download.svg' />&nbsp;Free Download</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import OutOfStock from '~/components/products/outofstock.vue'
import Price from '~/components/products/price.vue'
import SmallAddToCart from '~/components/products/smalladdtocart.vue'
import Pics from '~/components/products/pics.vue'

import { brandProduct, brand, seller, } from '~/lib/json_db.js'

export default {
  components: {Price, OutOfStock, SmallAddToCart, Pics,},
  props: ['product', 'location',],
  computed: {
    sellingPoint() {
      const { product } = this.$props
      return this.$store.getters['eshop/sellingPointForProduct'](product.id)
    },
    brandProduct() {
      return brandProduct(this.sellingPoint.BrandProduct[0])
    },
    brand() {
      return brand(this.brandProduct.Brand[0])
    },
    url() {
      return this.sellingPoint.url
    },
    seller() {
      return seller(this.sellingPoint.Seller[0])
    },
    isSGL() {
      const sglSellerIDs = [process.env.sglSellerID, process.env.sgteuSellerID, process.env.sgtusSellerID]
      return sglSellerIDs.includes(this.sellingPoint.Seller[0])
    },
    link() {
      const { product } = this.$props
      if (product.type.indexOf("SGL_BUNDLE") !== -1) {
        return `/bundle/${product.slug}`
      }
      const sglSellerIDs = [process.env.sglSellerID, process.env.sgteuSellerID, process.env.sgtusSellerID]
      if (sglSellerIDs.includes(this.seller.id)) {
        return `/product/${this.product.slug}`
      }
      return `/product/${this.sellingPoint.slug}`
    },
  },
  methods: {
    click() {
      this.$analytics.trackEvent(this.$props.location || 'productitem', 'viewproduct', this.sellingPoint.slug)
    }
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  align-items: center
  justify-content: space-between
  color: #454545

#infocontainerbig
  display: flex
  align-items: center
  flex: 1
  @media only screen and (max-width: 600px)
    display: none

#infocontainersmall
  display: flex
  flex-direction: column
  flex: 1
  @media only screen and (min-width: 600px)
    display: none

#infos
  display: flex
  flex-direction: column
  align-items: center
  cursor: pointer
  text-decoration: none
  color: #454545

#infos:hover
  text-decoration: underline

#infos > h3
  display: flex
  align-items: flex-start
  margin: 0
  text-align: center

#pic
  margin: 10pt
  width: 70pt
  height: 70pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat

#description
  flex: 1
  margin: 0 10pt 0 5pt
  font-size: 0.8em
  color #454545
  @media only screen and (max-width: 600px)
    display: flex
    justify-content: space-between

#description a
  color: #454545
  text-decoration: none

#container:hover #description a
  text-decoration: underline

#description ul, #description ol
  padding: 0
  list-style-type: none

#description li
  margin: 2pt 0

#description li::before
  content: '- '
  color: #3bb30b
  font-weight: bold

#description strong
  color: #3bb30b

#description p
  margin: 5pt 0

#smalldescription
  flex: 1
  display: flex
  flex-direction: column

#price
  display: flex
  margin: 10pt
  align-items: center
  justify-content: center
  @media only screen and (max-width: 600px)
    margin: 5pt 0

#tagline
  font-size: 0.9em
  font-weight: bold

#tagline p
  margin: 0

.green
  color: #3bb30b

.download
  display: block
  background-color: #3BB30B
  text-align: center
  padding: 5pt 20pt
  border-radius: 3pt
  color: white
  text-decoration: none
  font-size: 1em
  margin: 10pt 0
  white-space: nowrap
  transition: opacity 0.2s
  @media only screen and (max-width: 1000px)
    padding: 7pt 22pt
    font-size: 0.9em

</style>
