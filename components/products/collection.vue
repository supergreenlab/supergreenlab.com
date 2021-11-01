<!--
      Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
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
    <div :class='$style.body'>
      <div :class='$style.logo'>
        <img :src="require(`~/assets/img/${collection.picture[0].fileLarge}`)" alt="logo-SGL"  width="150px">
      </div>
      <div>
        <div :class='$style.descriptionPack'>{{ collection.description }}</div>
      </div>
      <div  :id='$style.priceButton'>
        <Price :lineItems='lineItems' />
        <AddToCart type='collection' name='option-pack' :lineItems='lineItems' :discreet=false />
      </div>
    </div>
    <ProductListComponent ref='option-pack' :products='products' :id='$style.optionPack' v-if="isActive" :center=true :maxItems=4 />
    <a :class='$style.packSeparator'  @click='toggleClass()'>View
      <div :class='$style.number'>{{ products.length }}</div> products in this pack
      <span  :class="$style.arrow">
        <span :class="$style.leftBar" :style='{"transform": (isActive? "rotate(-45deg)" : "rotate(45deg)")}'></span>
        <span :class="$style.rightBar" :style='{"transform": (isActive? "rotate(45deg)" : "rotate(-45deg)")}'></span>
      </span>
    </a>
  </section>
</template>

<script>
import AddToCart from '~/components/products/addtocart.vue'
import Price from '~/components/products/price.vue'
import ProductListComponent from '~/components/products/productlistcomponent.vue'

import { productsForCollection, } from '~/lib/json_db.js'

export default {
  components: { Price, AddToCart, ProductListComponent},
  props: ['collection',],
  data() {
    return {
      isActive: false,
    }
  },
  computed: {
    products() {
      return productsForCollection(this.$props.collection)
    },
    lineItems() {
      return this.products.map(p => ({n: 1, product: p, sellingPoint: this.$store.getters['eshop/sellingPointForProduct'](p.id)}))
    },
    collectionInCart() {
      return this.products.findIndex(p => cart.findIndex(li => li.sellingPoint.id == this.$store.getters['eshop/sellingPointForProduct'](p.id).id) == -1) == -1
    },
  },
  methods: {
    toggleClass() {
      this.isActive = !this.isActive
    },
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
  color: #454545

#priceButton
  display: flex
  flex-direction: column
  @media only screen and (max-width: 600px)
    align-items: center
    justify-content: center
    text-align: center

.logo
  display: flex
  align-items: center
  height: 150px
  @media only screen and (max-width: 600px)
    margin-top: 10px
    margin-bot: 10px

.descriptionPack
  color: #5E5E5E
  margin-right: 20px
  margin-left: 20px
  @media only screen and (max-width: 600px)
    font-size: 0.9em
    text-align: center
    margin-top: 10px
    margin-bottom: 10px
    font-weight: 300

.descriptionPack strong
  color: #3bb30b
  font-weight: bold

.body
  width: 100%
  display: flex
  align-items: center
  justify-content: space-between
  @media only screen and (max-width: 600px)
    margin: 5px 10px 5px 10px
    flex-direction: column

.packSeparator
  display: flex
  justify-content: flex-end
  text-transform: uppercase
  text-align: right
  width: 90%
  border: 1px solid
  border-style: none none dashed none
  padding-bottom: 5pt
  margin-top: 20px
  margin-bottom: 30px
  cursor: pointer
  @media only screen and (max-width: 600px)
    justify-content: center
    text-align: center

.number
  color: #3bb30b
  font-weight: bold
  padding: 0em 0.2em 0em 0.2em

.arrow
  width 1.25rem
  height 1.25rem
  display inline-block
  position relative
  margin 0 1rem

.leftBar
  top .5rem
  position absolute
  width .75rem
  height .1rem
  background-color #616A6B
  display inline-block
  transition all .2s ease
  left 0

.rightBar
  top .5rem
  position absolute
  width .75rem
  height .1rem
  background-color #616A6B
  display inline-block
  transition all .2s ease
  right 0

</style>
