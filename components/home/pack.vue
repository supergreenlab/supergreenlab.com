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
    <div :id='$style.body'>
      <div :id='$style.logo'>
        <img src="~assets/img/brands/attGe1tOGm4kTIeCJ_small.png" alt="" width="200px">
      </div>
      <div>
        <div style="text-align:left">Description Crop Pack</div>
      </div>
      <div  :id='$style.priceButton'>
        <div :id='$style.price'>XX.XX€</div>
        <nuxt-link v-if='done' :id='$style.cta' to='/cart'><b>GO TO CART</b></nuxt-link>
        <a :id='$style.cta' v-else :style='{"opacity": activated ? 0.5 : 1}' href='javascript:void(0);' @click='oneForAll'><b>{{ activated ? "PLEASE WAIT" : (added ? "ITEM ADDED!" : "ADD TO CART") }}</b></a>
      </div>
    </div>
    <div :id='$style.cropPack' :style='{"display" : (isActive? "none" : "flex" )}'>
      <ProductList ref='one-for-all' :products='oneForAllPack' :center=true :maxItems=4  />
    </div>
    <a :class='$style.packSeparator'  @click='toggleClass()'>View <div :class='$style.number'>{{ oneForAllPack.length }}</div> products in this pack <span :class="$style.arrow"><span></span><span></span></span></a>
    <TitleStep :checked='collectionInCart("organic-pack")'
                   @click='organic'
                   :checkbox=true
                   green='Bio Tabs Pack' />
    <div :id='$style.body'>
      <div :id='$style.logo'>
        <img src="~assets/img/brands/attHFsMczLP8xVS9E.png" alt="" width="150px">
      </div>
      <div>
        <div>Description Organic Pack</div>
      </div>
      <div  :id='$style.priceButton'>
        <div :id='$style.price'>XX.XX€</div>
        <nuxt-link v-if='doneOrganic' :id='$style.cta' to='/cart'><b>GO TO CART</b></nuxt-link>
        <a :id='$style.cta' v-else :style='{"opacity": activatedOrganic ? 0.5 : 1}' href='javascript:void(0);' @click='organic'><b>{{ activatedOrganic ? "PLEASE WAIT" : (addedOrganic ? "ITEM ADDED!" : "ADD TO CART") }}</b></a>
      </div>
    </div>
    <div :id='$style.organicPack' :style='{"display" : (isActiveOrganic? "none" : "flex" )}'>
      <ProductList ref='organic-pack' :products='organicPack' :center=true :maxItems=4  />
    </div>
    <a :class='$style.packSeparator'  @click='toggleClassOrganic()'>View <div :class='$style.number'>{{ organicPack.length }}</div> products in this pack <span :class="$style.arrow"><span></span><span></span></span></a>
    <TitleStep :checked='collectionInCart("option-pack")'
                     @click='options'
                     :checkbox=true
                     green='Options' />
    <div :id='$style.body'>
      <div :id='$style.logo'>
        <img src="~assets/img/brands/attUA2jsnGS3G34XG.png" alt="" width="150px">
      </div>
      <div>
        <div>Description Option Pack</div>
      </div>
      <div  :id='$style.priceButton'>
        <div :id='$style.price'>XX.XX€</div>
        <nuxt-link v-if='doneOptions' :id='$style.cta' to='/cart'><b>GO TO CART</b></nuxt-link>
        <a :id='$style.cta' v-else :style='{"opacity": activatedOptions ? 0.5 : 1}' href='javascript:void(0);' @click='options'><b>{{ activatedOptions ? "PLEASE WAIT" : (addedOptions ? "ITEM ADDED!" : "ADD TO CART") }}</b></a>
      </div>
    </div>
    <div :id='$style.optionPack' :style='{"display" : (isActiveOption? "none" : "flex" )}'>
       <ProductList ref='option-pack' :products='optionPack' :center=true :maxItems=4 />
    </div>
    <a :class='$style.packSeparator'  @click='toggleClassOption()'>View <div :class='$style.number'>{{ optionPack.length }}</div> products in this pack <span :class="$style.arrow"><span></span><span></span></span></a>
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
      activated: false,
      added: false,
      done: false,
      isActive: true,
      activatedOrganic: false,
      addedOrganic: false,
      doneOrganic: false,
      isActiveOrganic: true,
      activatedOptions: false,
      addedOptions: false,
      doneOptions: false,
      isActiveOption: true,
    }
  },
  props: [],
  computed: {
    oneForAllPack() {
      return this.$store.getters['eshop/collection']('one-for-all-pack')
    },
    organicPack() {
      return this.$store.getters['eshop/collection']('organic-pack')
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
    // $(".arrow").on("click", function () {
    //   $(this).toggleClass("active");
    // });
    toggleClass: function(){
      this.isActive = !this.isActive
    },
    toggleClassOrganic: function(){
      this.isActiveOrganic = !this.isActiveOrganic
    },
    toggleClassOption: function(){
      this.isActiveOption = !this.isActiveOption
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
        this.$data.activated = true
        this.timeout = setTimeout(() => {
          this.$data.activated = false
        }, 500)
        this.$data.added = false
        this.$data.done = false
        this.removeCollection('one-for-all-pack')
        return
      }
      if (this.$data.activated) return
      this.$data.activated = true
      this.timeout = setTimeout(() => {
        this.$data.activated = false
        this.$data.added = true
        this.timeout = setTimeout(() => {
          this.$data.done = true
        }, 1500)
      }, 700)
      this.$data.addedOrganic = false
      this.$data.doneOrganic = false
      this.removeCollection('organic-pack')
      this.addCollection('one-for-all-pack')
    },
    organic(checked) {
      if (!checked) {
        this.$data.activatedOrganic = true
        this.timeout = setTimeout(() => {
          this.$data.activatedOrganic = false
        }, 500)
        this.$data.addedOrganic = false
        this.$data.doneOrganic = false
        this.removeCollection('organic-pack')
        return
      }
      if (this.$data.activatedOrganic) return
      this.$data.activatedOrganic = true
      this.timeout = setTimeout(() => {
        this.$data.activatedOrganic = false
        this.$data.addedOrganic = true
        this.timeout = setTimeout(() => {
          this.$data.doneOrganic = true
        }, 1500)
      }, 700)
      this.$data.added = false
      this.$data.done = false
      this.removeCollection('one-for-all-pack')
      this.addCollection('organic-pack')
    },
    options(checked) {
      if (!checked) {
        this.$data.activatedOptions = true
        this.timeout = setTimeout(() => {
          this.$data.activatedOptions = false
        }, 500)
        this.$data.addedOptions = false
        this.$data.doneOptions = false
        this.removeCollection('option-pack')
        return
      }
      if (this.$data.activatedOptions) return
      this.$data.activatedOptions = true
      this.timeout = setTimeout(() => {
        this.$data.activatedOptions = false
        this.$data.addedOptions = true
        this.timeout = setTimeout(() => {
          this.$data.doneOptions = true
        }, 1500)
      }, 700)
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
  cursor: pointer
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

#button:hover
  background-color: #2F880B

#button > b
  font-weight: 600

.packSeparator
  display: flex
  justify-content: flex-end
  text-transform: uppercase
  text-align: right
  width: 90%
  border: 1px solid
  border-style: none none dashed none
  margin-bottom: 30px
  @media only screen and (max-width: 600px)
    justify-content: center
    text-align: center

a
  cursor: pointer

#cropPack
  margin-bottom:10px
  width: 100%
  max-width: 900pt
  display: none

#organicPack
  margin-bottom:10px
  width: 100%
  max-width: 900pt
  display: none

#optionPack
  margin-bottom:10px
  width: 100%
  max-width: 900pt
  display: none

.number
  color: #3bb30b
  font-weight: bold
  padding: 0em 0.2em 0em 0.2em

#arrow
  width 1.25rem
  height 1.25rem
  display inline-block
  position relative
  margin 0 1rem

.arrow
  width 1.25rem
  height 1.25rem
  display inline-block
  position relative
  margin 0 1rem
  span
    top .5rem
    position absolute
    width .75rem
    height .1rem
    background-color #616A6B
    display inline-block
    transition all .2s ease
    &:first-of-type
      left 0
      transform rotate(45deg)
    &:last-of-type
      right 0
      transform rotate(-45deg)
  &.active
    span
      &:first-of-type
        transform rotate(-45deg)

      &:last-of-type
        transform rotate(45deg)
</style>
