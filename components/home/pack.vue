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
    <TitleStep :checked='collectionInCart("one-for-all-pack")'
                   @click='oneForAll'
                   :checkbox=true
                   green='Mega Crop Pack' />
    <div :class='$style.body'>
      <div :class='$style.logo'>
        <img src="~assets/img/mega-crop-logo2.png" alt="logo-mega-crop" width="150px">
      </div>
      <div>
        <div :class='$style.descriptionPack'>MEGA CROP PACK is an all in one, complete plant nutrient designed from the ground up. You get everything you need from start to finish, to grow the best quality plants. Regulate pH from your water is recommanded</div>
      </div>
      <div  :id='$style.priceButton'>
        <Price :lineItems='oneForAllPackLineItems' />
        <AddToCart name='one-for-all-pack' :lineItems='oneForAllPackLineItems' :discreet=false @click='removeCollection("organic-pack")' />
      </div>
    </div>
    <ProductList ref='one-for-all' :id='$style.cropPack' v-if="isActive" :products='oneForAllPack' :center=true :maxItems=4  />
    <a :class='$style.packSeparator'  @click='toggleClass()'>View
      <div :class='$style.number'>{{ oneForAllPack.length }}</div> products in this pack
      <span  :class="$style.arrow">
        <span :class="$style.leftBar" :style='{"transform": (isActive? "rotate(-45deg)" : "rotate(45deg)")}'></span>
        <span :class="$style.rightBar" :style='{"transform": (isActive? "rotate(45deg)" : "rotate(-45deg)")}'></span>
      </span>
    </a>
    <TitleStep :checked='collectionInCart("organic-pack")'
                   @click='organic'
                   :checkbox=true
                   green='Bio Tabs Pack' />
    <div :class='$style.body'>
      <div :class='$style.logo'>
        <img src="~assets/img/bio-tabs-logo.png" alt="logo-bio-tabs" width="150px">
      </div>
      <div>
        <div :class='$style.descriptionPack'>This Pack is for 100% organic growth, it is best to prepare your soil with a rich mix of beneficial bacteria and microorganisms. The method consists of preparing the substrate with the BioTabs products in the quantities indicated and repeating the same procedure each time the plant is transplanted into a new pot. The formula is so simple, you only need to add water not even with ph control. Certified 100% Organic. </div></div>
      <div  :id='$style.priceButton'>
        <Price :lineItems='organicPackLineItems' />
        <AddToCart name='organic-pack' :lineItems='organicPackLineItems' :discreet=false @click='removeCollection("one-for-all-pack")' />
      </div>
    </div>
    <ProductList ref='organic-pack' :id='$style.organicPack' v-if="isActiveOrganic" :products='organicPack' :center=true :maxItems=4 />
    <a :class='$style.packSeparator'  @click='toggleClassOrganic()'>View
      <div :class='$style.number'>{{ organicPack.length }}</div> products in this pack
      <span  :class="$style.arrow">
        <span :class="$style.leftBar" :style='{"transform": (isActiveOrganic? "rotate(-45deg)" : "rotate(45deg)")}'></span>
        <span :class="$style.rightBar" :style='{"transform": (isActiveOrganic? "rotate(45deg)" : "rotate(-45deg)")}'></span>
      </span>
    </a>
    <TitleStep :checked='collectionInCart("option-pack")'
                     @click='options'
                     :checkbox=true
                     green='Options' />
    <div :class='$style.body'>
      <div :class='$style.logo'>
        <img src="~assets/img/sgl-logo.png" alt="logo-SGL"  width="150px">
      </div>
      <div>
        <div :class='$style.descriptionPack'>Sometimes growing is difficult and mistakes are easily made, this pack will help you to reduce all those mistakes with tools who are not mandatory but really recommanded for massive success</div>
      </div>
      <div  :id='$style.priceButton'>
        <Price :lineItems='optionPackLineItems' />
        <AddToCart name='option-pack' :lineItems='optionPackLineItems' :discreet=false />
      </div>
    </div>
    <ProductList ref='option-pack' :products='optionPack' :id='$style.optionPack' v-if="isActiveOptions" :center=true :maxItems=4 />
    <a :class='$style.packSeparator'  @click='toggleClassOption()'>View
      <div :class='$style.number'>{{ optionPack.length }}</div> products in this pack
      <span  :class="$style.arrow">
        <span :class="$style.leftBar" :style='{"transform": (isActiveOptions? "rotate(-45deg)" : "rotate(45deg)")}'></span>
        <span :class="$style.rightBar" :style='{"transform": (isActiveOptions? "rotate(45deg)" : "rotate(-45deg)")}'></span>
      </span>
    </a>
  </section>
</template>

<script>
import AddToCart from '~/components/products/addtocart.vue'
import Price from '~/components/products/price.vue'
import TitleStep from '~/components/widgets/titlestep.vue'
import ProductList from '~/components/products/productlist.vue'

export default {
  components: { Price, AddToCart, TitleStep, ProductList},
  data() {
    return{
      isActive: false,
      isActiveOrganic: false,
      isActiveOptions: false,
    }
  },
  computed: {
    oneForAllPack() {
      return this.$store.getters['eshop/collection']('one-for-all-pack')
    },
    oneForAllPackLineItems() {
      return this.oneForAllPack.map(p => ({n: 1, product: p, sellingPoint: this.$store.getters['eshop/sellingPointForProduct'](p.id)}))
    },
    organicPack() {
      return this.$store.getters['eshop/collection']('organic-pack')
    },
    organicPackLineItems() {
      return this.organicPack.map(p => ({n: 1, product: p, sellingPoint: this.$store.getters['eshop/sellingPointForProduct'](p.id)}))
    },
    optionPack()  {
      return this.$store.getters['eshop/collection']('option-pack')
    },
    optionPackLineItems() {
      return this.optionPack.map(p => ({n: 1, product: p, sellingPoint: this.$store.getters['eshop/sellingPointForProduct'](p.id)}))
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
      this.isActive = !this.isActive
    },
    toggleClassOrganic: function(){
      this.isActiveOrganic = !this.isActiveOrganic
    },
    toggleClassOption: function(){
      this.isActiveOptions = !this.isActiveOptions
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
      console.log('removeCollection', name, products.length)
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

.price
  @media only screen and (max-width: 600px)
    margin-top: 15px
    margin-bottom: 15px

#region
  width : 100%
  display: flex
  flex-direction: column
  align-items: flex-end

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

#cropPack
  margin-bottom:10px
  width: 100%
  max-width: 900pt

#organicPack
  margin-bottom:10px
  width: 100%
  max-width: 900pt

#optionPack
  margin-bottom:10px
  width: 100%
  max-width: 900pt

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
