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
    <Collection :collection='oneForAllPack' />
    <TitleStep :checked='collectionInCart("organic-pack")'
                   @click='organic'
                   :checkbox=true
                   green='Bio Tabs Pack' />
    <Collection :collection='organicPack' />
    <TitleStep :checked='collectionInCart("option-pack")'
                     @click='options'
                     :checkbox=true
                     green='Recommendations' />
    <Collection :collection='optionPack' />
  </section>
</template>

<script>
import Collection from '~/components/products/collection.vue'
import TitleStep from '~/components/widgets/titlestep.vue'

import { collectionWithSlug, productsForCollection, } from '~/lib/json_db.js'

export default {
  components: { Collection, TitleStep,},
  computed: {
    oneForAllPack: () => collectionWithSlug('one-for-all-pack'),
    organicPack: () => collectionWithSlug('organic-pack'),
    optionPack: () => collectionWithSlug('option-pack'),
    collectionInCart() {
      const cart = this.$store.getters['checkout/cart']
      return name => productsForCollection(collectionWithSlug(name)).findIndex(p => cart.findIndex(li => li.sellingPoint.id == this.$store.getters['eshop/sellingPointForProduct'](p.id).id) == -1) == -1
    },
  },
  methods: {
    addCollection(name) {
      productsForCollection(collectionWithSlug(name)).forEach(product => {
        const sellingPoint = this.$store.getters['eshop/sellingPointForProduct'](product.id)
        this.$store.commit('checkout/addToCart', { n: 1, product, sellingPoint })
      })
    },
    removeCollection(name) {
      productsForCollection(collectionWithSlug(name)).forEach(product => {
        const sellingPoint = this.$store.getters['eshop/sellingPointForProduct'](product.id)
        this.$store.commit('checkout/addToCart', { n: 0, product, sellingPoint })
      })
    },
    oneForAll(checked) {
      if (!checked) {
        this.removeCollection('one-for-all-pack')
        return
      }
      this.$analytics.trackEvent('product', 'addtocart', 'one-for-all-pack')
      this.removeCollection('organic-pack')
      this.addCollection('one-for-all-pack')
    },
    organic(checked) {
      if (!checked) {
        this.removeCollection('organic-pack')
        return
      }
      this.$analytics.trackEvent('product', 'addtocart', 'organic-pack')
      this.removeCollection('one-for-all-pack')
      this.addCollection('organic-pack')
    },
    options(checked) {
      if (!checked) {
        this.removeCollection('option-pack')
        return
      }
      this.$analytics.trackEvent('product', 'addtocart', 'option-pack')
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

.price
  @media only screen and (max-width: 600px)
    margin-top: 15px
    margin-bottom: 15px

#region
  width : 100%
  display: flex
  flex-direction: column
  align-items: flex-end

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

</style>
