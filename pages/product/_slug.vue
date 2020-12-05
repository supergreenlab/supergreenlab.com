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
    <div :id='$style.header'>
      <Header />
    </div>
    <div :id='$style.body'>
      <h2 :class='$style.title'>{{ product.name }} BY&nbsp;<a :id='$style.brand' :href='brand.url' target='_blank'>{{ brand.name }}</a></h2>
      <div :id='$style.product'>
        <div :id='$style.pic' :style='{"background-image": `url(${require(`~/assets/img/${brandProduct.pics[0].fileLarge}`)})`}'></div>
        <div :id='$style.center'>
          <div :id='$style.seller'>
            SOLD BY <a :href='sellingPoint.url' target='_blank'>{{ seller.name }}</a>
          </div>
          <div v-if='variants.length > 1' :id='$style.variants'>
            <nuxt-link :class='$style.variant' :id='v.id == brandProduct.id ? $style.selected : ""' v-for='v in variants' :key='v.id' :to='`/product/${v.sellingPoint.slug}`'>
              {{ v.name }}
              <div :class='$style.green'>{{ variantPrice(v) }}</div>
            </nuxt-link>
          </div>
          <div :id='$style.description' v-html='$md.render(brandProduct.description)'></div>
        </div>
        <div :id='$style.addtocart'>
          <div :id='$style.price'>
            <Price :lineItems='[{sellingPoint, n: 1}]' :small=true />
          </div>
          <OutOfStock v-if='product.outofstock' />
          <AddToCart :product='product' :sellingPoint='sellingPoint' :small='true' :discreet=false />
          Specs
          <div :id='$style.specs'>
            <div :class='$style.spec' v-if='brandProduct.specs.nItems'>Items<b>x{{ brandProduct.specs.nItems }}</b></div>
            <div :class='$style.spec' v-if='brandProduct.specs.pot'>Volume<b>{{ brandProduct.specs.pot.volume.value }}{{ brandProduct.specs.pot.volume.unit }}</b></div>
            <div :class='$style.spec' v-if='brandProduct.specs.soil'>Volume<b>{{ brandProduct.specs.soil.volume.value }}{{ brandProduct.specs.soil.volume.unit }}</b></div>
          </div>
        </div>
      </div>
      <h2 v-if='guides.length'>Guides</h2>
      <div v-if='guides.length' :id='$style.guides'>
        <Guide v-for='guide in guides' :key='guide.id' :guide='guide' />
      </div>
      <h2 v-if='relatedProducts.length'>Related products</h2>
      <div v-if='relatedProducts.length' :id='$style.products'>
        <ProductList :products='relatedProducts' />
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'
import Title from '~/components/products/title.vue'
import OutOfStock from '~/components/products/outofstock.vue'
import Price from '~/components/products/price.vue'
import AddToCart from '~/components/products/addtocart.vue'
import Guide from '~/components/products/guide.vue'
import ProductList from '~/components/products/productlist.vue'
import Footer from '~/components/layout/footer.vue'

import { guides } from '~/config/guides.json'

export default {
  components: { Header, Title, OutOfStock, Price, AddToCart, Guide, ProductList, Footer, },
  computed: {
    sellingPoint() {
      const { slug } = this.$route.params
      return this.$store.getters['eshop/sellingPointWithSlug'](slug)
    },
    brandProduct() {
      return this.$store.getters['eshop/brandProduct'](this.sellingPoint.BrandProduct[0])
    },
    brand() {
      return this.$store.getters['eshop/brand'](this.brandProduct.Brand[0])
    },
    product() {
      return this.$store.getters['eshop/product'](this.sellingPoint.Product[0])
    },
    seller() {
      return this.$store.getters['eshop/seller'](this.sellingPoint.Seller[0])
    },
    variants() {
      return this.$store.getters['eshop/variants'](this.brandProduct.id).map(bp => {
        bp.sellingPoint = this.$store.getters['eshop/sellingPointForBrandProduct'](bp.id)
        return bp
      })
    },
    variantPrice() {
      return ({ sellingPoint }) => this.$store.getters['checkout/lineItemsPrice']([{n: 1, sellingPoint}])
    },
    guides() {
      return guides.filter(g => {
        return g.requires && g.requires.indexOf(this.product.id) !== -1
      }).map(g => {
        if (g.first) {
          return guides.find(g2 => g2.id == g.first)
        }
        return g
      }).filter((g, i, a) => {
        return a.indexOf(g) == i
      })
    },
    relatedProducts() {
      return [].concat(...this.product.type.map(t => this.$store.getters['eshop/productsWithTypes'](t))).filter((p, i, a) => {
        return a.indexOf(p) == i
      })
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
  align-items: center

#container h2
  margin: 5pt 10pt
  color: #454545

#body
  width: 100%
  max-width: 900pt
  padding: 100pt 0 0 0

.title
  font-weight: 400
  text-transform: uppercase
  border-bottom: 2px solid #9a9a9a
  margin: 0 5pt
  color: #454545

.title a
  color: #454545

#seller
  text-transform: uppercase
  color: #454545
  font-weight: 600
  margin: 10pt 0

#seller a
  color: #454545

#product
  display: flex
  margin: 0 0 30pt 0
  @media only screen and (max-width: 600pt)
    flex-direction: column

#pic
  flex: 0.4
  width: 100%
  height: 300px
  margin: 10pt 0
  background-position: top
  background-size: contain
  background-repeat: no-repeat
  @media only screen and (max-width: 600pt)
    flex: auto !important
    height: 200px
    background-position: center

#center
  flex: 1
  padding: 20pt 15pt

#description strong
  color: #3bb30b

#description p
  margin: 10pt 0

#addtocart
  flex: 0.3
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  padding: 20pt 0

#price
  margin-bottom: 5pt

#specs
  background-color: #dedede
  width: 100%
  margin: 5pt 2pt
  padding: 5pt 10pt
  border-radius: 5pt
  @media only screen and (max-width: 600pt)
    width: 80%

.spec
  display: flex
  justify-content: space-between
  border-bottom: 1pt dashed #ababab
  margin: 7pt 0
  padding: 0 0 3pt 0

#variants
  display: flex
  align-items: center
  padding: 5pt 0

.variant
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: 5pt 10pt
  margin: 0 5pt 0 0
  border: 2pt solid #b1b1b1
  border-radius: 3pt
  cursor: pointer
  text-transform: uppercase
  text-align: center
  color: #454545
  text-decoration: none

.variant .green
  color: #3bb30b

#selected
  border: 2pt solid #3bb30b

#guides
  background-color: #EAEAEA
  margin: 5pt 10pt 30pt 10pt
  padding: 5pt 15pt
  border-radius: 5pt


</style>
