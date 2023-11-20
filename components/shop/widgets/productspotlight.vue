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
    <div :id='$style.pic'>
      <Pics :pics='product.pics' />
    </div>
    <div :id='$style.right'>
      <div :id='$style.text'>
        <h2 :id="$style.title">{{ title }}</h2>
        <div :id="$style.description" v-html='$md.render(description)'></div>
        <div :id='$style.productlink' v-if='brandProduct.sellable'>
          <nuxt-link :id='$style.productpage' :to='link'>View product</nuxt-link>
        </div>
      </div>
      <div v-if='brandProduct.sellable' :id='$style.addtocartcontainer'>
        <div :class='$style.price'>
          <Price :lineItems='[{sellingPoint: sellingPoint, n: 1}]' :freeshipping='false' />
        </div>
        <OutOfStock v-if='sellingPoint.outofstock' />
        <AddToCart v-else :type='product.type.indexOf("SGL_BUNDLE") != -1 ? "bundle" : "product"' :product='product' :sellingPoint='sellingPoint' @click='handleAddToCart' :name='`${container.slug}_${config.slug}`' />
      </div>
      <div v-else :id='$style.addtocartcontainer'>
        <div :id='$style.downloadlink'>
          <nuxt-link :id='$style.productpage' :to='link'>Free download!</nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import Pics from '~/components/products/pics.vue'
import SmallProductList from '~/components/products/smallproductlist.vue'
import OutOfStock from '~/components/products/outofstock.vue'
import AddToCart from '~/components/products/addtocart.vue'
import Price from '~/components/products/price.vue'

import { products, brandProduct, seller } from '~/lib/json_db.js'
const bp = brandProduct

export default {
  props: ['config', 'container',],
  components: { SmallProductList, Pics, OutOfStock, AddToCart, Price, },
  data() {
    return {
      addedToCart: false,
    }
  },
  computed: {
    product() {
      const { config } = this.$props
      return products(config.products)[0]
    },
    brandProduct() {
      const { config } = this.$props
      return bp(this.sellingPoint.BrandProduct[0])
    },
    sellingPoint() {
      return this.$store.getters['eshop/sellingPointForProduct'](this.product.id)
    },
    seller() {
      return seller(this.sellingPoint.Seller[0])
    },
    title() {
      const { config: { title } } = this.$props
      return title || this.product.name
    },
    description() {
      const { config: { description } } = this.$props
      return description || this.product.bulletpoints
    },
    link() {
      const product = this.product
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
    handleAddToCart() {
      setTimeout(() => this.$data.addedToCart = true, 1000)
    },
  }
}

</script>

<style module lang=stylus>

#container
  display: flex
  margin: 0 10pt
  /* flex-direction: column */
  @media only screen and (max-width: 600px)
    flex-direction: column

#pic
  width: 200pt
  height: 200pt
  @media only screen and (min-width: 600px)
    margin-top: 40pt
  @media only screen and (max-width: 1100px) and (min-width: 600px)
    width: 150pt
    height: 150pt
  @media only screen and (max-width: 600px)
    width: 100%

#right
  display: flex
  flex: 1
  margin: 0 20pt
  @media only screen and (max-width: 800px)
    flex-direction: column
    margin: 0

#text
  display: flex
  flex-direction: column
  flex: 1
  @media only screen and (max-width: 600px)
    margin: 0

#title
  font-family: Roboto
  text-transform: uppercase
  font-weight: bold
  font-size: 2em
  color: #5E5E5E
  margin-bottom: 10pt
  margin: 20px 10px
  @media only screen and (max-width: 600px)
    font-size: 1.5em

#description
  text-align: justify
  margin: 0 10pt
  color: #454545
  margin: 10pt 5pt
  @media only screen and (max-width: 600px)
    margin: 0 5pt

#description strong, #description a
  color: #3BB30B
  font-weight: 600

#description ul
  margin-left: 25px
  padding: 0
  list-style-type: none

#description ul li
  margin-bottom:7pt

#description ul li::before
  content: '- '
  color: #3bb30b
  font-weight: bold

#productlink
  display: flex
  margin: 10pt 5pt

#downloadlink
  display: flex
  margin: 10pt 5pt 10pt 10pt
  font-weight: 800
  font-size: 1.2em
  > a
    padding: 10pt 25pt

#productpage
  display: block
  background-color: #3bb30b
  text-align: center
  padding: 5pt 15pt
  border-radius: 3pt
  color: #ffffff
  text-decoration: none
  font-size: 0.9em
  margin: 5pt 0
  white-space: nowrap
  text-transform: uppercase
  cursor: pointer

#productpage:hover
  background-color: #2F880B

#addtocartcontainer
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  @media only screen and (max-width: 800px)
    align-items: flex-end
    justify-content: flex-end

.price
  margin-bottom: 10pt

#addtocart
  display: flex
  flex-direction: column
  justify-content: flex-end
  text-align: right
  color: #3bb30b;
  font-weight: 600;
  @media only screen and (max-width: 600px)
    align-self: flex-end

#addtocart > a
  display: block
  align-self: flex-end
  background-color: #3BB30B
  padding: 8pt 25pt
  border-radius: 5pt
  color: white
  text-decoration: none
  font-size: 22px
  margin: 4pt 0

#addtocart > a:hover
  background-color: #2F880B

#addtocart > a > b
  font-weight: 600

</style>
