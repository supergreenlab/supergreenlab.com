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
  <section :id='$style.container' :class='small ? $style.small : ""'>
    <div v-if='offer' :id='$style.pricecontainer'>
      <div :class='$style.price + " " + $style.smallprice'>
        <h1>{{ offer.currency }}{{ ((offer.price * 100) / (100 - offer.value)).toFixed(2) }}
          <div :id='$style.redbar'></div>
        </h1>
      </div>
      <div :class='$style.price'>
        <h1 :id='$style.green'>{{ price(true) }}</h1><br />
        <small><span v-if='includesTaxes'>incl.tax</span><span v-if='freeshipping'> + <b>FREE SHIPPING*</b></span></small>
        <small v-if='!isSGL'>*price may vary</small>
        <span>Special offer: <b>-{{ offer.value }}%</b></span>
      </div>
    </div>
    <div v-else-if='discount' :id='$style.pricecontainer'>
      <div :class='$style.price + " " + $style.smallprice'>
        <h1>{{ price(false) }}
          <div :id='$style.redbar'></div>
        </h1>
        <small v-if='!isSGL'>*price may vary</small>
      </div>
      <div :class='$style.price'>
        <h1 :id='$style.green'>{{ price(true) }}</h1><br />
        <small><span v-if='includesTaxes'>incl.tax</span><span v-if='freeshipping'> + <b>FREE SHIPPING*</b></span></small>
        <small v-if='!isSGL'>*price may vary</small>
        <span>promocode: <b>-{{ discount }}%</b></span>
      </div>
    </div>
    <div v-else :class='$style.price'>
      <h1 :id='$style.green'>{{ price(false) }}</h1>
      <small v-if='!isSGL'>*price may vary</small>
      <small><span v-if='includesTaxes'>incl. tax</span><span v-if='freeshipping'> + <b>FREE SHIPPING*</b></span></small>
    </div>
    <a v-if='notify' :id='$style.notify' href='javascript:void(0)' @click='notifyForm'>Notify me of price changes</a>
  </section>
</template>

<script>
import { open, screenX, availWidth } from '~/lib/client-side.js'

export default {
  props: ['lineItems', 'freeshipping', 'small', 'notify'],
  computed: {
    offer() {
      const { lineItems } = this.$props
      if (lineItems.length == 0) return 0
      if (lineItems.length != 1 || !lineItems[0].sellingPoint.offer) return 0 
      return { currency: lineItems[0].sellingPoint.currency, price: this.$store.getters['checkout/lineItemsPrice'](lineItems, true, true), value: lineItems[0].sellingPoint.offer }
    },
    discount() {
      const { lineItems } = this.$props
      if (lineItems.length == 0) return 0
      const { discount } = this.$store.getters['checkout/promoDiscount'](lineItems[0].sellingPoint)
      return discount
    },
    price() {
      const { lineItems } = this.$props
      if (lineItems.length == 0) return () => 0
      return (promo) => this.$store.getters['checkout/lineItemsPrice'](lineItems, promo)
    },
    isSGL() {
      const { lineItems } = this.$props
      if (lineItems.length == 0) return false
      return lineItems[0].sellingPoint.Seller[0] == 'recT9nIg4ahFv9J29'
    },
    includesTaxes() {
      const { lineItems } = this.$props
      return this.$store.getters['checkout/hasVAT'](lineItems)
    },
  },
  methods: {
    notifyForm() {
      const width = 800
      open(`https://airtable.com/shrB2zJ3H5jF9f6fl?prefill_SellingPoint=${this.$props.lineItems[0].sellingPoint.id}`, '_blank', `width=${width},height=600,top=100,left=${screenX() + availWidth()/2 - width/2}`)
      this.$matomo && this.$matomo.trackEvent('guide', 'feedback')
    }
  },
}
</script>

<style module lang=stylus>

#container
  font-family: Roboto
  display: flex
  flex-direction: column
  align-items: flex-end

#pricecontainer
  display: flex
  justify-content: flex-end
  margin: 10pt 10pt 15pt 0
  color: #454545
  @media only screen and (max-width: 600px)
    flex-direction: column
    font-size: 0.8em
    margin: 0

.price
  position: relative
  display: flex
  flex-direction: column
  justify-content: center
  text-align: right

.smallprice
  margin: 0 10pt 10pt 10pt
  font-size: 0.8em
  @media only screen and (max-width: 600px)
    margin: 0

.price > h1
  position: relative
  margin: 0 !important
  @media only screen and (max-width: 600px)
    margin-top: 4pt

.price > small
  color: #454545 !important

.smallprice > h1
  color: #787878

#redbar
  width: 50%
  height: 2pt
  top: 40%
  left: 25%
  transform: rotate(-30deg)
  position: absolute
  background-color: #FF0000

#green
  color: #3BB30B !important

.small
  font-size: 0.8em

#notify
  font-size: 0.9em
  color: #454545

</style>
