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
    <nuxt-link @click.native='click' :id='$style.infos' :to='product.type.indexOf("SGL_BUNDLE") == -1 ? `/product/${sellingPoint.slug}` : `/bundle/${product.slug}`'>
      <div :id='$style.pic'>
        <Pics :pics='brandProduct.pics' :hideArrow=true />
      </div>
    </nuxt-link>
    <div :id='$style.infocontainer'>
      <div :id='$style.description'>
        <nuxt-link @click.native='click' :to='product.type.indexOf("SGL_BUNDLE") == -1 ? `/product/${sellingPoint.slug}` : `/bundle/${product.slug}`'>
          <h3>{{ brandProduct.name }} BY {{ brand.name }}</h3>
          From <b>{{ seller.name }}</b>
        </nuxt-link>
        <div :id='$style.tagline' v-if='product.tagline' v-html='$md.render(product.tagline)'></div>
        <div v-html='$md.render(brandProduct.description.substring(0, 100))'></div>
      </div>
      <div :id='$style.price'>
        <Price :lineItems='[{sellingPoint, n: 1}]' :small=true />
      </div>
      <OutOfStock v-if='product.outofstock' />
      <SmallAddToCart :product='product' :sellingPoint='sellingPoint' :discreet=false :n='1' />
    </div>
  </section>
</template>

<script>
import OutOfStock from '~/components/products/outofstock.vue'
import Price from '~/components/products/price.vue'
import SmallAddToCart from '~/components/products/smalladdtocart.vue'
import Pics from '~/components/products/pics.vue'

export default {
  components: {Price, OutOfStock, SmallAddToCart, Pics,},
  props: ['product'],
  computed: {
    sellingPoint() {
      const { product } = this.$props
      return this.$store.getters['eshop/sellingPointForProduct'](product.id)
    },
    brandProduct() {
      return this.$store.getters['eshop/brandProduct'](this.sellingPoint.BrandProduct[0])
    },
    brand() {
      return this.$store.getters['eshop/brand'](this.brandProduct.Brand[0])
    },
    url() {
      return this.sellingPoint.url
    },
    seller() {
      return this.$store.getters['eshop/seller'](this.sellingPoint.Seller[0])
    },
  },
  methods: {
    click() {
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

#infocontainer
  display: flex
  align-items: center
  flex: 1
  @media only screen and (max-width: 600px)
    flex-direction: column
    align-items: flex-start

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
  margin: 0 20pt 0 5pt
  font-size: 0.8em
  color #454545

#description a
  color: #454545
  text-decoration: none

#container:hover #description a
  text-decoration: underline

#description > div
  @media only screen and (max-width: 600px)
    display: none

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

#price
  display: flex
  margin: 10pt 10pt

#tagline
  font-size: 0.9em
  font-weight: bold

#tagline p
  margin: 0

</style>
