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
      <h2 :class='$style.title'>{{ brandProduct.name }} BY&nbsp;<a :id='$style.brand' :href='brandProduct.url' target='_blank'>{{ brand.name }}</a></h2>
      <div :id='$style.product'>
        <div :id='$style.pic'>
          <Pics :pics='brandProduct.pics'/>
        </div>
        <div :id='$style.center'>
          <div v-if='closerProduct' :id='$style.closer'>
            This product might be closer: <nuxt-link :to='`/product/${closerProduct.slug}`'>{{ closerBrandProduct.name }} from {{ closerSeller.name }}</nuxt-link>
          </div>
          <div v-else-if='askCloserProduct' :id='$style.closer'>
            This product might not be available in your region.
          </div>
          <div :id='$style.region'>
            <Region />
          </div>
          <div :id='$style.seller'>
            SOLD BY <a :href='productURL' target='_blank'>{{ seller.name }}</a>
          </div>
          <div :id='$style.propose' v-if='seller.name != "SuperGreenLab"'>
            <a href='javascript:void(0)' @click='proposeSellingPoint'>Propose a better product or shop</a>
          </div>
          <div v-if='variants.length > 1' :id='$style.variants'>
            <nuxt-link :class='$style.variant' :id='v.id == brandProduct.id ? $style.selected : ""' v-for='v in variants' :key='v.id' :to='`/product/${v.sellingPoint.slug}`'>
              {{ v.name }}
              <div :class='$style.green'>{{ variantPrice(v) }}</div>
            </nuxt-link>
          </div>
          <div :id='$style.description' v-if='product.description' v-html='$md.render(product.description)'></div>
          <div :id='$style.description' v-if='brandProduct.description && brandProduct.description != product.description' v-html='$md.render(brandProduct.description)'></div>
          <div :id='$style.description' v-if='product.bulletpoints' v-html='$md.render(product.bulletpoints)'></div>
          <div :id='$style.description' v-if='brandProduct.bulletpoints && brandProduct.bulletpoints != product.bulletpoints' v-html='$md.render(brandProduct.bulletpoints)'></div>
        </div>
        <div :id='$style.addtocart'>
          <div :id='$style.price'>
            <Price :lineItems='[{sellingPoint, n: 1}]' :small=true />
          </div>
          <OutOfStock v-if='product.outofstock' />
          <AddToCart :product='product' :sellingPoint='sellingPoint' :small='true' :discreet=false />
          <div v-if='relatedProducts.length' :id='$style.relatedProducts'>
            <h4>Checkout those too:</h4>
            <nuxt-link :class='$style.relatedProduct' :key='rp.id' v-for='rp in relatedProducts' :to='`/product/${rp.sellingPoint.slug}`'>
              <div :class='$style.relatedProductPic' :style='{"background-image": `url(${require(`~/assets/img/${rp.brandProduct.pics[0].fileLarge}`)})`}'></div>
              <div :class='$style.relatedProductText'><b>{{ rp.brandProduct.name }}</b><br />{{ rp.text }}</div>
              <div>
                <b>{{ rp.price }}</b>
              </div>
            </nuxt-link>
          </div>
          <div v-if='Object.keys(brandProduct.specs).length'>Specs</div>
          <div v-if='Object.keys(brandProduct.specs).length' :id='$style.specs'>
            <div :class='$style.spec' v-if='brandProduct.specs.nItems'>Items<b>x{{ brandProduct.specs.nItems }}</b></div>
            <div :class='$style.spec' v-if='brandProduct.specs.pot'>Volume<b>{{ brandProduct.specs.pot.volume.value }}{{ brandProduct.specs.pot.volume.unit }}</b></div>
            <div :class='$style.spec' v-if='brandProduct.specs.soil'>Volume<b>{{ brandProduct.specs.soil.volume.value }}{{ brandProduct.specs.soil.volume.unit }}</b></div>

            <div :class='$style.spec' v-if='brandProduct.specs.power'>Power<b>From <nuxt-link to='/product/sgl-controller-supergreenlab-supergreencontroller-supergreenlab-world'>Controller</nuxt-link></b></div>
            <div :class='$style.spec' v-if='brandProduct.specs.width'>Width<b>{{ brandProduct.specs.width }}cm</b></div>
            <div :class='$style.spec' v-if='brandProduct.specs.width'>Height<b>{{ brandProduct.specs.height }}cm</b></div>

            <div :class='$style.spec' v-if='brandProduct.specs.width'>Height<b>{{ brandProduct.specs.height }}cm</b></div>

            <div v-if='brandProduct.specs.dimensions'>
              <b>Dimensions</b>
              <div :class='$style.spec'>Width<b>{{ brandProduct.specs.dimensions.width }}{{ brandProduct.specs.dimensions.unit }}</b></div>
              <div :class='$style.spec'>Height<b>{{ brandProduct.specs.dimensions.height }}{{ brandProduct.specs.dimensions.unit }}</b></div>
              <div :class='$style.spec'>Depth<b>{{ brandProduct.specs.dimensions.depth }}{{ brandProduct.specs.dimensions.unit }}</b></div>
            </div>
            <div v-if='brandProduct.specs.ventilation'>
              <b>Ventilation</b>
              <div :class='$style.spec'>Voltage<b>{{ brandProduct.specs.ventilation.V }}V</b></div>
              <div :class='$style.spec'>CFM<b>{{ brandProduct.specs.ventilation.CFM }}</b></div>
              <div :class='$style.spec'>A<b>{{ brandProduct.specs.ventilation.A }}</b></div>
            </div>
            <div v-if='brandProduct.specs.accuracy'>
              <b>Accuracy</b>
              <div :class='$style.spec'>Temperature<b>+/-{{ brandProduct.specs.accuracy.temperature }}°</b></div>
              <div :class='$style.spec'>Humidity<b>+/-{{ brandProduct.specs.accuracy.humidity }}%</b></div>
            </div>

          </div>
        </div>
      </div>
      <h2 v-if='guides.length'>Guides</h2>
      <div v-if='guides.length' :id='$style.guides'>
        <Guide v-for='guide in guides' :key='guide.id' :guide='guide' />
      </div>
      <h2 v-if='sameTypeProduct.length'>Related products</h2>
      <div v-if='sameTypeProduct.length' :id='$style.products'>
        <ProductList :products='sameTypeProduct' :maxItems=4 />
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'
import Title from '~/components/products/title.vue'
import OutOfStock from '~/components/products/outofstock.vue'
import Pics from '~/components/products/pics.vue'
import Price from '~/components/products/price.vue'
import AddToCart from '~/components/products/addtocart.vue'
import Guide from '~/components/guides/small.vue'
import ProductList from '~/components/products/productlist.vue'
import Region from '~/components/products/region.vue'
import Footer from '~/components/layout/footer.vue'

import { guides } from '~/config/guides.json'

export default {
  components: { Header, Title, OutOfStock, Pics, Price, AddToCart, Guide, ProductList, Region, Footer, },
  data() {
    return {
      showProposeSellingPoint: false
    }
  },
  computed: {
    closerProduct() {
      const { region } = this.$store.state.eshop
      if (this.sellingPoint.regions[0].id != region.id) {
        const sp = this.$store.getters['eshop/sellingPointForProduct'](this.product.id)
        if (sp.id == this.sellingPoint.id) return null
        /*const bp = this.$store.getters['eshop/brandProduct'](sp.BrandProduct[0])
        if (bp.variantOf && this.sellingPoint.BrandProduct[0].id == bp.variantOf[0]) return null
        if (this.brandProduct.variantOf && this.brandProduct.variantOf[0] == bp.id) return null*/
        return sp
      }
    },
    closerBrandProduct() {
      const sp = this.closerProduct
      if (sp) {
        return this.$store.getters['eshop/brandProduct'](sp.BrandProduct[0])
      }
    },
    closerSeller() {
      const sp = this.closerProduct
      if (sp) {
        return this.$store.getters['eshop/seller'](sp.Seller[0])
      }
    },
    askCloserProduct() {
      const { region } = this.$store.state.eshop
      if (this.sellingPoint.regions[0].id == this.$store.state.eshop.regions[0].id) return false
      return this.sellingPoint.regions[0].id != region.id
    },
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
    relatedProducts() {
      return this.$store.getters['eshop/relatedProducts'](this.product.id).map(rp => {
        rp.sellingPoint = this.$store.getters['eshop/sellingPointForProduct'](rp.product[0])
        rp.brandProduct = this.$store.getters['eshop/brandProduct'](rp.sellingPoint.BrandProduct[0])
        rp.price = this.$store.getters['checkout/lineItemsPrice']([{n: 1, sellingPoint: rp.sellingPoint}])
        return rp
      })
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
    sameTypeProduct() {
      return [].concat(...this.product.type.map(t => this.$store.getters['eshop/productsWithTypes'](t))).filter((p, i, a) => {
        return a.indexOf(p) == i
      })
    },
    productURL() {
      if (this.seller.type == 'amazon') return `${this.sellingPoint.url}?tag=${this.seller.params.amazon.tag}`
      return this.sellingPoint.url
    }
  },
  methods: {
    proposeSellingPoint() {
      const width = 800
      window.open('https://airtable.com/shrVYGaBGhAUFSJvm', '_blank', `width=${width},height=533,top=100,left=${window.screenX + window.screen.availWidth/2 - width/2}`)
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

#description
  color #454545

#description ul, #description ol
  padding: 0
  list-style-type: none

#description li
  margin: 5pt 0

#description li::before
  content: '- '
  color: #3bb30b
  font-weight: bold

#description strong
  color: #3bb30b

#description p
  margin: 10pt 0

#addtocart
  flex: 0.3
  display: flex
  flex-direction: column
  align-items: center
  padding: 20pt 0
  @media only screen and (max-width: 600pt)
    justify-content: center

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

#closer
  margin-bottom: 5pt
  font-weight: bold
  color: #3bb30b

#closer a
  color: #454545

#region
  display: flex

#propose
  display: flex
  flex-direction: column
  margin-bottom: 10pt

#propose a
  color: #454545

#relatedProducts
  flex: 1
  display: flex
  flex-direction: column
  align-self: stretch
  margin: 0 0 10pt 0
  color: #454545
  @media only screen and (max-width: 600pt)
    margin: 0 10pt 10pt 10pt

.relatedProduct
  display: flex
  padding: 5pt 0
  align-items: center
  justify-content: space-between
  text-decoration: none
  font-size: 0.9em
  color: #454545

.relatedProduct b
  color: #3bb30b

.relatedProduct:hover
  text-decoration: underline !important
  background-color: #dedede !important

.relatedProductPic
  width: 30pt
  height: 30pt
  margin: 0 5pt 0 0
  background-position: top
  background-size: contain
  background-repeat: no-repeat

.relatedProduct:hover .relatedProductText
  flex: 1

</style>
