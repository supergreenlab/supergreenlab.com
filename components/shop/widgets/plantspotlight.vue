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
  <section :id="$style.container">
    <div :id="$style.spotlightcontainer">
      <h2 :id="$style.title" v-html='$md.render(config.title)'></h2>
      <div v-if='loading==false' :id='$style.plantcontainer'>
        <div :id='$style.pic'>
          <div :style='{"background-image": `url(https://storage.supergreenlab.com${plant.thumbnailPath})`}'></div>
        </div>
        <div :id='$style.description'>
          <div :id='$style.descriptionbody' v-for="product in products" :key="product.id">
            <h3>{{ plant.name }}</h3>
            <div :id='$style.descriptioncontainer'>
              <div :id='$style.settings'>
                <div :class='$style.setting'>
                  <img src='~/assets/img/icon_seeds.svg' />
                  <div><b :class='$style.green'>Plant Strain</b>: {{ plant.settings.strain || 'Not set' }}<br/><span :class='$style.green'>From</span>: {{ plant.settings.seedBank || 'Not set' }}</div>
                </div>
                <div :class='$style.setting'>
                  <img src='~/assets/img/icon-veg.svg' />
                  <div><b :class='$style.green'>Germinated</b>: {{ germinated }}<br/><b :class='$style.green'>{{ phase[0] }}</b>: {{ phase[1] }}</div>
                </div>
              </div>
              <div :id='$style.button'>
                <i><nuxt-link :id='$style.appbutton' to='/app' target='_blank'>Install app first</nuxt-link></i>
                <nuxt-link :id='$style.plantbutton' :to='`/public/plant?id=${plant.id}`' target='_blank'>Open plant</nuxt-link><br />
              </div>
            </div>
            <h3>Grow with {{ product.name }}</h3>
            <div :class='$style.relatedProduct'>
              <div :id='$style.ProducPic'>
                <div :style='{"background-image": `url(${require(`~/assets/img/${product.pics[0].fileLarge}`)})`}'></div>
              </div>
              <nuxt-link :to='`/product/${product.SellingPoints[0].slug}`' :id='$style.relatedProduct'>
                <div>
                  <div :class='$style.relatedProductTagline'  v-html='$md.render(product.tagline)'></div>
                  <div :class='$style.description'  v-html='$md.render(product.description)'></div>
                </div>
              </nuxt-link>
              <div :id="$style.pricecontainer">
                <Price :id="$style.price" :lineItems='[{sellingPoint: product.SellingPoints[0], n: 1}]' :freeshipping='false' />
                <AddToCart :product='product' :sellingPoint='product.SellingPoints[0]' :discreet='false' @click='handleAddToCart' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else :id='$style.loading'>
        <div :id='$style.loadingdiv'>
          <Loading label='Loading plant..' />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { DateTime, Interval } from 'luxon'
import axios from 'axios'
import Loading from '~/components/widgets/loading.vue'
import ProductList from '~/components/products/productlist.vue'
import Price from '~/components/products/price.vue'
import AddToCart from '~/components/products/smalladdtocart.vue'

import { products } from '~/lib/json_db.js'

export default {
  props: ['config',],
  components: {Loading, ProductList, AddToCart, Price},
  data() {
    return {
      plant: null,
      loading: true,
    }
  },
  async mounted() {
    const { plantid } = this.$props.config
    const { data: plant } = await axios.get(`https://api2.supergreenlab.com/public/plant/${plantid}`)
    this.$data.plant = plant
    plant.settings = JSON.parse(plant.settings)
    this.$data.loading = false

  },
  computed: {
    products() {
      const { config } = this.$props
      return products(config.products || [])
    },
    germinated() {
      const { germinationDate } = this.$data.plant.settings
      if (!germinationDate) {
        return 'Not set'
      }
      const d = DateTime.fromISO(germinationDate)
      const i = Interval.fromDateTimes(d, DateTime.now())
      return `${Math.round(i.toDuration('days').toObject().days)} days ago`
    },
    phase() {
      const { germinationDate, veggingStart, bloomingStart } = this.$data.plant.settings
      if (bloomingStart) {
        const d = DateTime.fromISO(bloomingStart)
        const i = Interval.fromDateTimes(d, DateTime.now())
        return [
          'Blooming since',
          `${Math.round(i.toDuration('days').toObject().days)} days ago`
        ]
      } else if (veggingStart) {
        const d = DateTime.fromISO(veggingStart)
        const i = Interval.fromDateTimes(d, DateTime.now())
        return [
          'Vegging since',
          `${Math.round(i.toDuration('days').toObject().days)} days ago`
        ]
      } else if (germinationDate) {
        const d = DateTime.fromISO(germinationDate)
        const i = Interval.fromDateTimes(d, DateTime.now())
        return [
          'Started',
          `${Math.round(i.toDuration('days').toObject().days)} days ago`
        ]
      }
      return [
        'Phase',
        'Not set'
      ]
    }
  },
  methods: {
    handleAddToCart() {
      setTimeout(() => this.$data.addedToCart = true, 1000)
    }
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  justify-content: center
  align-items: center

#spotlightcontainer
  display:flex
  flex-direction: column

#title
  font-family: Roboto
  text-transform: uppercase
  font-weight: bold
  font-size: 2em
  margin-bottom: 10pt
  color: #5E5E5E
  @media only screen and (max-width: 600px)
    font-size: 1.5em

#plantcontainer
  display: flex
  justify-content:center
  align-self : center
  @media only screen and (max-width: 600px)
    flex-direction: column

#pic
  height: 160pt
  align-self : center

#pic > div
  width: 160pt
  height: 100%
  background-position: center
  background-size: contain
  background-repeat: no-repeat

#description
  display: flex
  flex-direction: column
  margin: 0 10pt

#descriptionbody
  flex: 1

#descriptioncontainer
  display: flex
  align-items: center
  margin-bottom: 5pt
  @media only screen and (max-width: 600px)
    flex-direction: column

#descriptionbody strong
  color: #3BB30B
  font-weight: 600

#descriptionbody > h3
  color: #5E5E5E
  margin: 5pt 0

#button
  display: flex
  align-items: flex-end
  flex-direction: column
  @media only screen and (max-width: 600px)
    margin-top: 10pt

#plantbutton
  display: block
  background-color: #3bb30b
  text-align: center
  padding: 4pt 12pt
  border-radius: 3pt
  color: #ffffff
  text-decoration: none
  font-size: 1.2em
  margin: 4pt 10pt
  white-space: nowrap
  text-transform: uppercase
  font-weight: bold

#plantbutton:hover
  background-color: #2F880B

#appbutton
  color: #3bb30b
  font-weight: bold
  font-size: 1.2em
  margin-right: 10pt

#loading
  display: flex
  align-items: center
  justify-content: center

#loadingdiv
  position: relative
  width: 140pt
  height: 70pt

.relatedProduct
  display: flex
  justify-content: space-around
  cursor: pointer
  @media only screen and (max-width: 600px)
    flex-direction: column
    justify-content: center


#relatedProduct
  text-decoration: none

#relatedProduct:hover
  text-decoration: underline

#ProducPic
  height: 60pt
  display: flex;
  justify-content: center;
  align-items: center;

#ProducPic > div
  width: 60pt
  height: 100%
  background-size: contain
  background-repeat: no-repeat

.relatedProductTagline
  color: #3bb30b

.description
  height: 50px
  overflow: hidden
  margin: 7px
  @media only screen and (max-width: 1000pt)
    margin-bottom: 0px
    height: 25px
    font-size: 0.8rem

#pricecontainer
  display: flex
  align-items: flex-end
  justify-content: center
  flex-direction: column
  font-size: 1.2em
  @media only screen and (max-width: 600px)
    margin-top: 10pt

#price
  font-size: 0.6em
  margin-right: 10pt

#settings
  display: flex
  width: 100%
  margin: 15pt 0 10pt 0

.setting
  display: flex
  flex: 1
  color: #454545
.setting > img
  padding-right: 5pt

.green
  color: #3bb30b
  font-weight: bold

</style>
