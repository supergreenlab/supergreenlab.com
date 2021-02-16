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
    <div :id='$style.region'>
      <Region />
    </div>
    <TitleStep :checked='collectionInCart("one-for-all-pack")'
                   @click='oneForAll'
                   :checkbox=true
                   green='Mega Crop Pack' />
    <div :id='$style.body'>
      <div>Image Logo Brand {{ brand }}</div>
      <div>
        <div> {{ descriptionPack }}</div>
      </div>
      <div  :id='$style.priceButton'>
        <div :id='$style.price'>XX.XX€</div>
        <div  :id='$style.cta'>
          <b class="hvr-grow">Add To Cart</b>
        </div>
        <!-- <Price :lineItems='[{sellingPoint, n: 1}]' :small=true /> -->
        <!-- <AddToCart /> -->
      </div>
    </div>
    <div :id='$style.cropPack' :style='{"display" : (isActive? "none" : "flex" )}'>
      <ProductList ref='one-for-all' :products='oneForAllPack' :center=true :maxItems=4  />
    </div>
    <a :class='$style.packSeparator'  @click='toggleClass()'>View X products in this pack</a>
    <div :id='$style.region'>
      <Region />
    </div>
    <TitleStep :checked='collectionInCart("organic-pack")'
                   @click='organic'
                   :checkbox=true
                   green='Bio Tabs Pack' />
    <div :id='$style.body'>
      <div>Image Logo Brand {{ brand }}</div>
      <div>
        <div> {{ descriptionPack }}</div>
      </div>
      <div  :id='$style.priceButton'>
        <div :id='$style.price'>XX.XX€</div>
        <div  :id='$style.cta'>
          <b class="hvr-grow">Add To Cart</b>
        </div>
        <!-- <Price />
        <AddToCart /> -->
      </div>
    </div>
    <div :id='$style.organicPack' :style='{"display" : (isActiveTwo? "none" : "flex" )}'>
      <ProductList ref='organic-pack' :products='organicPack' :center=true :maxItems=4  />
    </div>
    <a :class='$style.packSeparator'  @click='toggleClassTwo()'>View X products in this pack</a>
  </section>
</template>

<script>
import AddToCart from '~/components/products/addtocart.vue'
import Price from '~/components/products/price.vue'
import TitleStep from '~/components/widgets/titlestep.vue'
import ProductList from '~/components/products/productlist.vue'
import Region from '~/components/products/region.vue'

export default {
  components: { Price, AddToCart, TitleStep, ProductList, Region},
  data() {
    return{
      isActive: true,
      isActiveTwo: true
    }
  },
  props: ['brand', 'descriptionPack'],
  computed: {
    organicPack() {
      return this.$store.getters['eshop/collection']('organic-pack')
    },
    oneForAllPack() {
      return this.$store.getters['eshop/collection']('one-for-all-pack')
    },
    optionPack()  {
      return this.$store.getters['eshop/collection']('option-pack')
    },
    collectionInCart() {
      return (name) => {
        const cart = this.$store.getters['checkout/cart']
        const pack = this.$store.getters['eshop/collection'](name)
        const isInCart = pack.findIndex(p => cart.findIndex(li => li.sellingPoint.id == this.$store.getters['eshop/sellingPointForProduct'](p.id).id) == -1) == -1
        return isInCart
      }
    },
  },
  methods: {
    toggleClass: function(){
      this.isActive = !this.isActive;
    },
    toggleClassTwo: function(){
      this.isActiveTwo = !this.isActiveTwo
    },
    addCollection(name) {
      const products = this.$store.getters['eshop/collection'](name)
      products.forEach(product => {
        const sellingPoint = this.$store.getters['eshop/sellingPointForProduct'](product.id)
        this.$store.commit('checkout/addToCart', { n: 1, product, sellingPoint })
      })
    },
    removeCollection(name) {
      const products = this.$store.getters['eshop/collection'](name)
      products.forEach(product => {
        const sellingPoint = this.$store.getters['eshop/sellingPointForProduct'](product.id)
        this.$store.commit('checkout/addToCart', { n: 0, product, sellingPoint })
      })
    },
    oneForAll(checked) {
      if (!checked) {
        this.removeCollection('one-for-all-pack')
        return
      }
      this.removeCollection('organic-pack')
      this.addCollection('one-for-all-pack')
    },
    organic(checked) {
      if (!checked) {
        this.removeCollection('organic-pack')
        return
      }
      this.removeCollection('one-for-all-pack')
      this.addCollection('organic-pack')
    },
    options(checked) {
      if (!checked) {
        this.removeCollection('option-pack')
        return
      }
      this.addCollection('option-pack')
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
  align-items: center

#price
  font-size: 2.7em
  color : #3bb30b

#region
  width : 100%
  display: flex
  flex-direction: column
  align-items: flex-end

#body
  width: 100%
  display: flex
  align-items: center
  justify-content: space-around
  margin: 20px
  @media only screen and (max-width: 600px)
    padding: 5pt 10pt
    flex-direction: column

#cta
  text-transform: uppercase
  color: white
  background-color: #3BB30B
  padding: 10pt 35pt
  border-radius: 3pt
  text-decoration: none
  text-align: center
  z-index: 100
  font-size: 1.5em
  margin: 20px
  @media only screen and (max-width: 600px)
    margin-top: 20pt
    font-size: 1.1em

#cta > small
  padding-top: 5pt
  font-weight: 300
  font-size: 1.1em

#cta > b
  font-weight: 600

.packSeparator
  text-transform: uppercase
  text-align: right
  width: 90%
  border: 1px solid
  border-style: none none dashed none
  margin-bottom: 30px

a
  cursor: pointer

#cropPack
  width: 100%
  max-width: 900pt
  display: none

#organicPack
  width: 100%
  max-width: 900pt
  display: none
</style>
