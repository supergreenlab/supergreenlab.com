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
    <div :id='$style.body'>
      <div :id='$style.iconcontainer '>
        <Pics :pics='bundle.pics' :offertext='bundle.SellingPoints[0].offertext' />
      </div>
      <div :id='$style.description'>
        <div :id='$style.bottom'>
          <div :id='$style.buy'>
            <Price :lineItems='[{sellingPoint: bundle.SellingPoints[0], n: 1}]' :freeshipping='false' />
            <OutOfStock v-if='bundle.SellingPoints[0].outofstock' />
            <nuxt-link @click.native='bundleClicked' :to='`/bundle/${bundle.slug}`'>LEARN MORE</nuxt-link><br />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Price from '~/components/products/price.vue'
import Items from '~/components/bundle/items.vue'
import OutOfStock from '~/components/products/outofstock.vue'
import Pics from '~/components/products/pics.vue'

export default {
  components: {Items, Price, OutOfStock, Pics,},
  props: ['bundle'],

  methods: {
    bundleClicked() {
      this.$matomo && this.$matomo.trackEvent('front-page', 'bundleclicked', this.$props.slug)
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

#body
  display: flex
  flex-direction: column
  margin: 30pt 30pt
  @media only screen and (max-width: 600px)
    flex-direction: column !important
    margin: 0pt 0pt

#iconcontainer
  position: relative
  width: 100%
  height: 300pt
  margin: 0 20pt 0 20pt
  cursor: pointer
  @media only screen and (max-width: 600px)
    width: 100%
    height: 300pt
    margin: 20pt 0pt 20pt 0pt

#buy
  display: flex
  flex-direction: column
  justify-content: center
  font-weight: bold
  @media only screen and (max-width: 600px)
    margin: 0pt 10pt 0 0
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

#bottom
  display: flex
  justify-content: flex-end
  padding: 10pt 0
  @media only screen and (max-width: 600px)
    padding: 0

.outofstock
  font-size: 1.2em
  font-weight: 600
  color: red
  margin: 5pt 0

</style>
