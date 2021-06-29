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
    <div :id='$style.header' :class='noframe ? "" : $style.framed'>
      <div :id='$style.title'>
        <h1>{{ bundle.name }}</h1>
        <h2>{{ bundle.tagline }}</h2>
      </div>
      <Price :lineItems='[{sellingPoint: bundle.SellingPoints[0], n: 1}]' :freeshipping='false' v-if='nobottom' />
    </div>
    <div :id='$style.body' :style='{"flex-direction": right ? "row-reverse" : ""}'>
      <div :id='$style.iconcontainer '>
        <Pics :pics='bundle.pics' :offertext='bundle.SellingPoints[0].offertext' />
      </div>
      <div :id='$style.description'>
        <div v-html='$md.render(bundle.bulletpoints)' :id='$style.bullets'></div>
        <div v-if='showRelatedProducts && relatedProducts.length' :id='$style.relatedProducts' :class='addedToCart ? $style.highlight : ""'>
          <h4>This product can be used with:</h4>
          <nuxt-link :class='$style.relatedProduct' :key='rp.id' v-for='rp in relatedProducts' :to='rp.product.type.indexOf("SGL_BUNDLE") == -1 ? `/product/${rp.sellingPoint.slug}` : `/bundle/${rp.product.slug}`'>
            <div :class='$style.relatedProductPic' :style='{"background-image": `url(${require(`~/assets/img/${rp.brandProduct.pics[0].fileLarge}`)})`}'></div>
            <div :class='$style.relatedProductText'><b>{{ rp.brandProduct.name }}</b><br />{{ rp.text }}</div>
            <div>
              <b>{{ rp.price }}</b>
            </div>
          </nuxt-link>
        </div>

        <div v-if='showRelatedProducts && bundle.links && bundle.links.length' :id='$style.links'>
          <h4>Useful links</h4>
          <a v-for='l in bundle.links' :key='l.id' :class='$style.link' :href='l.url' target='_blank'>
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
        <div :id='$style.bottom' v-if='!nobottom'>
          <div :id='$style.buy'>
            <Price :lineItems='[{sellingPoint: bundle.SellingPoints[0], n: 1}]' :freeshipping='false' />
            <OutOfStock v-if='bundle.SellingPoints[0].outofstock' />
            <nuxt-link @click.native='bundleClicked' :to='`/bundle/${bundle.slug}`'>LEARN MORE</nuxt-link><br />
          </div>
        </div>
        <div :id='$style.addtocartcontainer' v-if='addtocart && !showdescription'>
          <div :class='$style.price'>
            <Price :lineItems='[{sellingPoint: bundle.SellingPoints[0], n: 1}]' :freeshipping='false' />
          </div>
        </div>
      </div>
    </div>
    <div v-if='showdescription' :id='$style.text'>
      <h1>Description</h1>
      <div v-html='$md.render(bundle.description)'></div>
      <div :id='$style.addtocartcontainer' v-if='addtocart'>
        <div :class='$style.price'>
          <Price :lineItems='[{sellingPoint: bundle.SellingPoints[0], n: 1}]' :freeshipping='false' />
        </div>
        <AddToCart :product='bundle' :sellingPoint='bundle.SellingPoints[0]' @click='handleAddToCart' />
      </div>
    </div>
  </section>
</template>

<script>
import Price from '~/components/products/price.vue'
import Items from '~/components/bundle/items.vue'
import OutOfStock from '~/components/products/outofstock.vue'
import AddToCart from '~/components/products/addtocart.vue'
import Pics from '~/components/products/pics.vue'

export default {
  components: {Items, Price, OutOfStock, AddToCart, Pics,},
  props: ['bundle', 'nobottom', 'addtocart', 'noframe', 'showdescription', 'right', 'showRelatedProducts',],
  data() {
    return {
      addedToCart: false,
    }
  },
  methods: {
    bundleClicked() {
      this.$matomo && this.$matomo.trackEvent('front-page', 'bundleclicked', this.$props.slug)
    },
    handleAddToCart() {
      setTimeout(() => this.$data.addedToCart = true, 1000)
    }
  },
  computed: {
    relatedProducts() {
      return this.$store.getters['eshop/relatedProducts'](this.bundle.id).map(rp => {
        rp = Object.assign({}, rp)
        rp.sellingPoint = this.$store.getters['eshop/sellingPointForProduct'](rp.product[0])
        rp.brandProduct = this.$store.getters['eshop/brandProduct'](rp.sellingPoint.BrandProduct[0])
        rp.product = this.$store.getters['eshop/product'](rp.sellingPoint.Product[0])
        rp.price = this.$store.getters['checkout/lineItemsPrice']([{n: 1, sellingPoint: rp.sellingPoint}])
        return rp
      })
    },
    youtubeLink() {
      return (l) => l.indexOf('youtube.com') != -1
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  color: #454545

#header
  display: flex
  align-items: center
  justify-content: space-between
  padding: 10pt 10pt
  border-bottom: 1pt solid #EEEEEE

.framed
  border-top: 1pt solid #EEEEEE

#header > h1
  color: #3BB30B
  margin: 0
  @media only screen and (max-width: 600px)
    font-size: 1.8em

#title
  color: #5D5D5D
  @media only screen and (max-width: 600px)
    font-size: 0.85em

#title > h1
  margin: 0
  text-transform: uppercase

#title > h2
  font-weight: 200
  font-size: 1.3em

#body
  display: flex
  margin: 30pt 30pt
  @media only screen and (max-width: 600px)
    flex-direction: column !important
    margin: 0pt 0pt

#iconcontainer
  position: relative
  width: 40%
  height: 300pt
  margin: 0 20pt 0 20pt
  cursor: pointer
  @media only screen and (max-width: 600px)
    width: 100%
    height: 300pt
    margin: 20pt 0pt 20pt 0pt

#description
  display: flex
  flex: 1
  flex-direction: column
  justify-content: center
  @media only screen and (max-width: 600px)
    margin: 0pt 10pt

#description > p
  margin: 5pt 0
  font-size: 1.1em

#buy
  display: flex
  flex-direction: column
  justify-content: center
  font-weight: bold
  @media only screen and (max-width: 600px)
    margin: 30pt 10pt 0 0
    align-self: flex-end

#buy > a
  display: block
  align-self: flex-end
  background-color: #3BB30B
  padding: 8pt 25pt
  border-radius: 5pt
  margin-top: 10pt
  color: white
  text-decoration: none

#buy > a:hover
  background-color: #2F880B

#buy > a > b
  font-weight: 600

#bullets
  color: #454545

#bullets strong
  color: #3BB30B
  font-weight: 600

#bullets ul
  padding: 0
  list-style-type: none

#bullets ul li
  margin-bottom:7pt

#bullets ul li::before
  content: '- '
  color: #3bb30b
  font-weight: bold

#relatedProducts h4
  margin: 5pt 5pt

.relatedProduct
  display: flex
  padding: 2pt 5pt
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

#bottom
  display: flex
  justify-content: flex-end
  padding: 10pt 0
  @media only screen and (max-width: 600px)
    padding: 0

#items
  flex: 1
  display: flex
  flex-direction: column
  font-weight: 400
  color: #5d5d5d

#items > b
  font-size: 1.2em
  margin-bottom: 30pt

#addtocartcontainer
  display: flex
  flex-direction: column
  margin-top: 20pt
  align-items: flex-end

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

#fullscreen
  position: fixed
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  display: flex
  align-items: center
  justify-content: center
  background-color: rgba(255, 255, 255, 0.5)

#iconfullscreen
  flex: 1
  align-items: center
  justify-content: center
  height: 80%
  width: 90%
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  background-color: white

#text
  font-size: 1.1em
  padding: 10pt 30pt 40pt 30pt
  color: #5D5D5D
  @media only screen and (max-width: 600px)
    padding: 10pt 10pt 40pt 10pt

#text p
  margin: 10pt 0

#text strong
  color: #3bb30b

.outofstock
  font-size: 1.2em
  font-weight: 600
  color: red
  margin: 5pt 0

#links
  display: flex
  flex-direction: column

#links h4
  margin: 5pt 5pt

.link
  display: flex
  color: #454545
  text-decoration: none
  padding: 2pt 5pt

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

</style>
