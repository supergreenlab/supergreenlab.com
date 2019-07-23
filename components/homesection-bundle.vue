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
        <h1>{{ title }}</h1>
        <h2>{{ subtitle }}</h2>
      </div>
      <div v-if='promodiscount' :id='$style.pricecontainer'>
        <div :class='$style.price + " " + $style.smallprice'>
          <h1>${{ price.toFixed(2) }}
            <div :id='$style.redbar'></div>
          </h1>
        </div>
        <div :class='$style.price'>
          <h1>${{ (price - price * promodiscountdef / 100).toFixed(2) }}</h1><br />
          <span>promocode: <b>-{{ promodiscountdef }}%</b></span>
        </div>
      </div>
      <h1 v-else>${{ (price - price*promodiscountdef/100).toFixed(2) }}</h1>
    </div>
    <div :id='$style.body' :style='{"flex-direction": right ? "row-reverse" : ""}'>
      <div :id='$style.icon' :style='{"background-image": `url(${require(`~/assets/img/${icon}`)})`}'></div>
      <div :id='$style.description'>
        <p v-for='b in bullets' v-html='`- ${b}`' :class='$style.bullet'></p>

        <div :id='$style.bottom' v-if='!nobottom'>
          <div :id='$style.buy'>
            <!--<nuxt-link @click.native='bundleClicked' :to='`/bundle/${slug}`'>BUY NOW <b>${{ price }}</b></nuxt-link><br />-->
            <!--Free shipping-->
            <nuxt-link @click.native='bundleClicked' :to='`/bundle/${slug}`'>LEARN MORE</nuxt-link><br />
          </div>
        </div>

        <div :id='$style.addtocartcontainer' v-if='addtocart'>
          <div :id='$style.addtocart'>
            <nuxt-link @click.native='addToCartClicked' :to='{path: `/bundle/${slug}`, hash: "#shipping"}'><b>ADD TO CART</b></nuxt-link><br />
            Free shipping
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Items from '~/components/homesection-bundle-items.vue'

export default {
  components: {Items,},
  props: ['slug', 'title', 'subtitle', 'icon', 'bullets', 'price', 'right', 'bigleds', 'smallleds', 'tinyleds', 'ventilation', 'sensor', 'url', 'nobottom', 'addtocart', 'noframe', 'promodiscount',],
  methods: {
    bundleClicked() {
      this.$matomo && this.$matomo.trackEvent('front-page', 'bundleclicked', this.$props.slug)
    },
    addToCartClicked() {
      fbq('track', 'AddToCart')
      this.$matomo && this.$matomo.trackEvent('bundle', 'addtocartclicked', this.$props.slug)
    },
  },
  computed: {
    promodiscountdef() {
      return this.$props.promodiscount || 0
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column

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

#title > h2
  font-weight: 200
  font-size: 1.3em

#body
  display: flex
  margin: 30pt 30pt
  @media only screen and (max-width: 600px)
    flex-direction: column !important

#icon
  width: 40%
  height: 200pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  margin: 0 20pt 0 20pt
  @media only screen and (max-width: 600px)
    width: 100%
    margin: 0 0pt 0 0pt

#description
  display: flex
  flex: 1
  flex-direction: column
  justify-content: center

#description > p
  margin: 5pt 0
  font-size: 1.1em

#buy
  display: flex
  flex-direction: column
  justify-content: flex-end
  text-align: right
  @media only screen and (max-width: 600px)
    margin: 30pt 10pt 0 0
    align-self: flex-end

#buy > a
  display: block
  align-self: flex-end
  background-color: #3BB30B
  padding: 8pt 25pt
  border-radius: 5pt
  color: white
  text-decoration: none

#buy > a:hover
  background-color: #2F880B

#buy > a > b
  font-weight: 600

.bullet > b
  color: #3BB30B
  font-weight: 600

#bottom 
  display: flex
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
  margin-top: 20pt

#addtocart
  display: flex
  flex-direction: column
  justify-content: flex-end
  text-align: right
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

#addtocart > a:hover
  background-color: #2F880B

#addtocart > a > b
  font-weight: 600

#pricecontainer
  display: flex
  flex: 1
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
  align-items: center
  justify-content: center

.smallprice
  margin: 0 10pt 10pt 10pt
  font-size: 0.8em
  @media only screen and (max-width: 600px)
    margin: 0

.price > h1
  position: relative
  margin-bottom: 0
  color: #3BB30B
  @media only screen and (max-width: 600px)
    margin-top: 4pt

.smallprice > h1
  color: #787878

#redbar
  width: 100%
  height: 2pt
  top: calc(50%)
  left: 0
  transform: rotate(-30deg)
  position: absolute
  background-color: #FF0000
 
</style>
