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
    <div :id='$style.body'>
      <div :id="$style.pic" :style='{"background-image": `url(${require(`~/assets/img/${picture}`)})`}'></div>
      <div :id='$style.text'>
        <h2 :id="$style.title" v-html='$md.render(title)'></h2>
        <div :id="$style.description" v-html='$md.render(description)'></div>

        <div :class='`${$style.products} ${$style.bigproducts}`'>
          <div :id='$style.list'>
            <TinyProductList title='Products in collection' :picOnly='true' :products='products' />
          </div>
          <div :id='$style.addtocartcontainer'>
            <div :class='$style.price'>
              <Price :lineItems='lineItems' :freeshipping='false' />
            </div>
            <AddToCart :title='`ADD ${products.length} TO CART`' :titleadded='`${products.length} ITEMS ADDED!`' :name='collection.slug' :lineItems='lineItems' :discreet=false />
          </div>
        </div>

      </div>
    </div>

    <div :class='`${$style.products} ${$style.smallproducts}`'>
      <div :id='$style.list'>
        <TinyProductList title='Products in collection' :picOnly='true' :products='products' />
      </div>
      <div :id='$style.addtocartcontainer'>
        <div :class='$style.price'>
          <Price :lineItems='lineItems' :freeshipping='false' />
        </div>
        <AddToCart :title='`ADD ${products.length} TO CART`' :titleadded='`${products.length} ITEMS ADDED!`' :name='collection.slug' :lineItems='lineItems' :discreet=false />
      </div>
    </div>

  </section>
</template>

<script>
import TinyProductList from '~/components/products/tinyproductlist.vue'
import AddToCart from '~/components/products/addtocart.vue'
import Price from '~/components/products/price.vue'

import { collection, product, productsForCollection, } from '~/lib/json_db.js'

export default {
  props: ['config'],
  components: { TinyProductList, AddToCart, Price, },
  computed: {
    collection() {
      const { config } = this.$props
      return collection(config.collections[0])
    },
    title() {
      const { config: { title } } = this.$props
      return title || this.collection.name
    },
    description() {
      const { config: { description } } = this.$props
      return description.trim() || this.collection.description
    },
    picture() {
      const { config: { picture } } = this.$props
      return (picture && picture.fileFull) || `${this.collection.picture[0].fileFull}`
    },
    products() {
      return productsForCollection(this.collection)
    },
    lineItems() {
      return this.products.map(p => ({n: 1, product: p, sellingPoint: this.$store.getters['eshop/sellingPointForProduct'](p.id)}))
    },
  },
}

</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  margin: 0 10pt

#body
  display: flex
  @media only screen and (max-width: 600px)
    flex-direction: column

#pic
  width: 300pt
  height: 300pt
  background-size: contain
  background-repeat: no-repeat
  background-position: center
  @media only screen and (max-width: 1100px) and (min-width: 600px)
    width: 200pt
    height: 200pt
  @media only screen and (max-width: 600px)
    width: 100%    

#text
  display: flex
  flex-direction: column
  flex: 1
  margin: 0 20pt
  @media only screen and (max-width: 600px)
    margin: 0

#title
  font-family: Roboto
  text-transform: uppercase
  font-weight: bold
  font-size: 2em
  color: #5E5E5E
  margin-bottom: 10pt
  margin: 10pt 0 10pt 0
  @media only screen and (max-width: 600px)
    font-size: 1.5em

#description
  text-align: justify
  margin: 0 10pt
  color: #454545
  margin: 10pt 5pt
  @media only screen and (max-width: 600px)
    margin: 0 5pt

#description strong
  color: #3BB30B
  font-weight: 600

#description ul
  padding: 0
  list-style-type: none

#description ul li
  margin-bottom:7pt

#description ul li::before
  content: '- '
  color: #3bb30b
  font-weight: bold

.productpage
  color: #3bb30b

.products
  display: flex
  @media only screen and (max-width: 600px)
    flex-direction: column

.bigproducts
  @media only screen and (max-width: 1000px)
    display: none
  
.smallproducts
  @media only screen and (min-width: 1000px)
    display: none

#list
  flex: 1

#addtocartcontainer
  display: flex
  flex-direction: column
  margin-top: 10pt
  align-items: flex-end
  justify-content: center

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
