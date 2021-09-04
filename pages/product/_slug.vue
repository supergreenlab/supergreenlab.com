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
      <h1 :class='$style.title'>{{ brandProduct.name }} BY&nbsp;<a :id='$style.brand' :href='brandProduct.url' target='_blank'>{{ brand.name }}</a></h1>
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
            SOLD AT <a :href='productURL' target='_blank'>{{ seller.name }}</a>
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
          <div :id='$style.tagline' v-if='product.tagline' v-html='$md.render(product.tagline)'></div>
          <div :id='$style.description' v-if='product.description' v-html='$md.render(product.description)'></div>

          <div :id='$style.description' v-if='brandProduct.description && brandProduct.description != product.description' v-html='$md.render(brandProduct.description)'></div>
          <div :id='$style.description' v-if='product.bulletpoints' v-html='$md.render(product.bulletpoints)'></div>
          <div :id='$style.description' v-if='brandProduct.bulletpoints && brandProduct.bulletpoints != product.bulletpoints' v-html='$md.render(brandProduct.bulletpoints)'></div>
          <div v-if='relatedProducts.length' :id='$style.relatedProducts' :class='addedToCart ? $style.highlight : ""'>
            <h4>This product can be used with:</h4>
            <nuxt-link :class='$style.relatedProduct' :key='rp.id' v-for='rp in relatedProducts' :to='`/product/${rp.sellingPoint.slug}`'>
              <div :class='$style.relatedProductPic' :style='{"background-image": `url(${require(`~/assets/img/${rp.brandProduct.pics[0].fileLarge}`)})`}'></div>
              <div :class='$style.relatedProductText'><b>{{ rp.brandProduct.name }}</b><br />{{ rp.text }}</div>
              <div>
                <b>{{ rp.price }}</b>
              </div>
            </nuxt-link>
          </div>
          <div v-if='product.links && product.links.length' :id='$style.links'>
            <h4>Useful links</h4>
            <a v-for='l in product.links' :key='l.id' :class='$style.link' :href='l.url' target='_blank'>
              <div :class='$style.linkpic' :style='{"background-image": `url(${require(`~/assets/img/${l.icon.fileLarge}`)})`}'>
                <img v-if='youtubeLink(l.url)' :class='$style.playbutton' src='~assets/img/youtube-play.png' />
              </div>
              <div :class='$style.linktext'>
                <b>{{ l.title }}</b>
                <div v-html='$md.render(l.description)'></div>
                <small>{{ l.url }}</small>
              </div>
            </a>
          </div>

        </div>
        <div :id='$style.addtocart'>
          <div :id='$style.price'>
            <Price :lineItems='[{sellingPoint, n: 1}]' :small=true :notify=true />
          </div>
          <OutOfStock v-if='product.outofstock' />
          <AddToCart :product='product' :sellingPoint='sellingPoint' :small=true :discreet=false @click='handleAddToCart' />
          <div v-if='relatedProducts.length' :id='$style.relatedProducts' :class='addedToCart ? $style.highlight : ""'>
            <h4>Checkout those too:</h4>
            <nuxt-link :class='$style.relatedProduct' :key='rp.id' v-for='rp in relatedProducts' :to='rp.product.type.indexOf("SGL_BUNDLE") == -1 ? `/product/${rp.sellingPoint.slug}` : `/bundle/${rp.product.slug}`'>
              <div :class='$style.relatedProductPic' :style='{"background-image": `url(${require(`~/assets/img/${rp.brandProduct.pics[0].fileLarge}`)})`}'></div>
              <div :class='$style.relatedProductText'><b>{{ rp.brandProduct.name }}</b><br />{{ rp.text }}</div>
              <div>
                <b>{{ rp.price }}</b>
              </div>
            </nuxt-link>
          </div>
          <div v-if='Object.keys(brandProduct.specs).length' :id='$style.specs'>
            <div :class='$style.spec' v-if='brandProduct.specs.nItems'>Items<b>x{{ brandProduct.specs.nItems }}</b></div>
            <div :class='$style.spec' v-if='brandProduct.specs.color'>Color<b>{{ brandProduct.specs.color }}</b></div>
            <div :class='$style.spec' v-if='brandProduct.specs.pot'>Volume<b>{{ brandProduct.specs.pot.volume.value }}{{ brandProduct.specs.pot.volume.unit }}</b></div>
            <div :class='$style.spec' v-if='brandProduct.specs.soil'>Volume<b>{{ brandProduct.specs.soil.volume.value }}{{ brandProduct.specs.soil.volume.unit }}</b></div>

            <div :class='$style.spec' v-if='brandProduct.specs.weight'>Weight<b>{{ brandProduct.specs.weight.value }}{{ brandProduct.specs.weight.unit }}</b></div>

            <div :class='$style.spec' v-if='brandProduct.specs.power'>Power<b>From <nuxt-link to='/product/sgl-controller-supergreenlab-supergreencontroller-supergreenlab-world'>Controller</nuxt-link></b></div>
            <div :class='$style.spec' v-if='brandProduct.specs.width'>Width<b>{{ brandProduct.specs.width }}cm</b></div>
            <div :class='$style.spec' v-if='brandProduct.specs.height'>Height<b>{{ brandProduct.specs.height }}cm</b></div>

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
            <div v-if='brandProduct.specs.tape'>
              <b>Tape dimensions</b>
              <div :class='$style.spec'>Width<b>{{ brandProduct.specs.tape.width.value }}{{ brandProduct.specs.tape.width.unit }}</b></div>
              <div :class='$style.spec'>Length<b>{{ brandProduct.specs.tape.length.value }}{{ brandProduct.specs.tape.length.unit }}</b></div>
            </div>
            <div v-if='brandProduct.specs.accuracy'>
              <b>Accuracy</b>
              <div :class='$style.spec'>Temperature<b>+/-{{ brandProduct.specs.accuracy.temperature }}°</b></div>
              <div :class='$style.spec'>Humidity<b>+/-{{ brandProduct.specs.accuracy.humidity }}%</b></div>
            </div>
            <div v-if='brandProduct.specs.keymetrics'>
              <div v-if='brandProduct.specs.keymetrics.distance'>
                <b>Distance to plant</b>
                <div :class='$style.spec'>Min<b>{{ brandProduct.specs.keymetrics.distance.min }}{{ brandProduct.specs.keymetrics.distance.unit }}</b></div>
                <div :class='$style.spec'>Max<b>{{ brandProduct.specs.keymetrics.distance.max }}{{ brandProduct.specs.keymetrics.distance.unit }}</b></div>
              </div>
              <div v-if='brandProduct.specs.keymetrics.power'>
                <b>Consumption</b>
                <div :class='$style.spec'>Min<b>{{ brandProduct.specs.keymetrics.power.min }}{{ brandProduct.specs.keymetrics.power.unit }}</b></div>
                <div :class='$style.spec'>Max<b>{{ brandProduct.specs.keymetrics.power.max }}{{ brandProduct.specs.keymetrics.power.unit }}</b></div>
              </div>
              <div v-if='brandProduct.specs.keymetrics.coverage'>
                <b>Coverage</b>
                <div :class='$style.spec'>Min<b>{{ brandProduct.specs.keymetrics.coverage.min }}x{{ brandProduct.specs.keymetrics.coverage.min }}{{ brandProduct.specs.keymetrics.coverage.unit }}</b></div>
                <div :class='$style.spec'>Max<b>{{ brandProduct.specs.keymetrics.coverage.max }}x{{ brandProduct.specs.keymetrics.coverage.max }}{{ brandProduct.specs.keymetrics.coverage.unit }}</b></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 v-if='guides.length'>Guides</h2>
      <div v-if='guides.length' :id='$style.guides'>
        <Guide v-for='guide in guides' :key='guide.id' :guide='guide' />
      </div>
      <h2 v-if='sameTypeProduct.length'>Products in the same category</h2>
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

import { open, screenX, availWidth } from '~/lib/client-side.js'
import { products, sellingPoints, regions, } from '~/config/products.json'

import { guides } from '~/config/guides.json'

export default {
  components: { Header, Title, OutOfStock, Pics, Price, AddToCart, Guide, ProductList, Region, Footer, },
  head() {
    return {
      title: `SuperGreenLab - ${this.brandProduct.name} - ${this.product.tagline}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.brandProduct.description
        },
      ],
    }
  },
  data() {
    return {
      showProposeSellingPoint: false,
      addedToCart: false
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
      if (this.sellingPoint.regions[0].id == regions[0].id) return false
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
        return Object.assign({}, bp, { sellingPoint: this.$store.getters['eshop/sellingPointForBrandProduct'](bp.id)})
      })
    },
    variantPrice() {
      return ({ sellingPoint }) => this.$store.getters['checkout/lineItemsPrice']([{n: 1, sellingPoint}])
    },
    relatedProducts() {
      return this.$store.getters['eshop/relatedProducts'](this.product.id).map(rp => {
        rp = Object.assign({}, rp)
        rp.sellingPoint = this.$store.getters['eshop/sellingPointForProduct'](rp.product[0])
        rp.brandProduct = this.$store.getters['eshop/brandProduct'](rp.sellingPoint.BrandProduct[0])
        rp.product = this.$store.getters['eshop/product'](rp.sellingPoint.Product[0])
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
      })//.sort((p1, p2) => (Math.random() * 2) - 1)
    },
    productURL() {
      if (this.seller.type == 'amazon') return `${this.sellingPoint.url}?tag=${this.seller.params.amazon.tag}`
      return this.sellingPoint.url
    },
    youtubeLink() {
      return (l) => l.indexOf('youtube.com') != -1
    },
  },
  methods: {
    proposeSellingPoint() {
      const width = 800
      open('https://airtable.com/shrVYGaBGhAUFSJvm', '_blank', `width=${width},height=533,top=100,left=${screenX() + availWidth()/2 - width/2}`)
    },
    handleAddToCart() {
      setTimeout(() => this.$data.addedToCart = true, 1000)
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

#container h2, #container h1
  font-family: Roboto
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
  @media only screen and (max-width: 600pt)
    font-size: 1.5em

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
  flex: 0.45
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
  margin: 5pt 2pt
  padding: 5pt 20pt
  border-radius: 5pt
  color: #454545
  @media only screen and (min-width: 600pt)
    align-self: stretch
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
  border-radius: 5pt
  margin: 0 0 10pt 0
  color: #454545
  @media only screen and (min-width: 600pt)
    align-self: stretch
  @media only screen and (max-width: 600pt)
    width: 80%
    margin: 0 10pt 10pt 10pt

#relatedProducts h4
  font-family: Roboto
  margin: 5pt 5pt

.relatedProduct
  display: flex
  padding: 5pt 5pt
  align-items: center
  justify-content: space-between
  text-decoration: none
  font-size: 0.9em
  color: #454545

.relatedProduct b
  color: #3bb30b

.relatedProduct:hover .relatedProductText
  text-decoration: underline !important

.relatedProductPic
  width: 60pt
  height: 60pt
  margin: 0 5pt 0 0
  background-position: top
  background-size: contain
  background-repeat: no-repeat

.relatedProductText
  flex: 1

#tagline
  font-weight: bold
  color: #454545

@keyframes highlight {
  0%  {background-color: transparent;}
  50%  {background-color: #d5d5d5;}
  100%  {background-color: transparent;}
}

.highlight
  animation: highlight 0.7s linear 2

#links
  display: flex
  flex-direction: column

#links h4
  font-family: Roboto
  margin: 5pt 5pt

.link
  display: flex
  color: #454545
  text-decoration: none
  margin: 5pt 0

.link:hover
  text-decoration: underline

.linktext
  flex: 1

.linktext small
  color: #787878
  text-decoration: underline

.linkpic
  display: flex
  align-items: center
  justify-content: center
  width: 60pt
  height: 60pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  margin-right: 10pt

.playbutton
  width: 30pt
  height: 30pt
  transition: opacity 0.2s

.link:hover .playbutton
  opacity: 0.7

</style>
