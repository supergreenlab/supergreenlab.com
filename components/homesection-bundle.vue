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
          <h1>{{ priceConv(price) }}
            <div :id='$style.redbar'></div>
          </h1>
        </div>
        <div :class='$style.price'>
          <h1>{{ priceConv(price - price * promodiscountdef / 100) }}</h1><br />
          <span>promocode: <b>-{{ promodiscountdef }}%</b></span>
        </div>
      </div>
      <h1 v-else>{{ priceConv(price - price*promodiscountdef/100) }}</h1>
    </div>
    <div :id='$style.body' :style='{"flex-direction": right ? "row-reverse" : ""}'>
      <div :id='$style.icon' :style='{"background-image": `url(${require(`~/assets/img/${icon}`)})`}' @click='toggleZoom'></div>
      <div :id='$style.description'>
        <p v-for='b in bullets' v-html='`- ${b}`' :class='$style.bullet'></p>

        <div :id='$style.bottom' v-if='!nobottom'>
          <div :id='$style.buy'>
            <!--<nuxt-link @click.native='bundleClicked' :to='`/bundle/${slug}`'>BUY NOW <b>${{ price }}</b></nuxt-link><br />-->
            <!--Free shipping-->
            <nuxt-link @click.native='bundleClicked' :to='`/bundle/${slug}`'>LEARN MORE</nuxt-link><br />
          </div>
        </div>

        <div :id='$style.addtocartcontainer' v-if='addtocart && !description'>
          <div :id='$style.addtocart'>
            <nuxt-link @click.native='addToCartClicked' :to='{path: `/bundle/${slug}`, hash: "#shipping"}'><b>ADD TO CART</b></nuxt-link><br />
            <p>Free shipping</p>
            <p>Our bundles are shipped discreet</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if='description' :id='$style.text'>
      <h1>Description</h1>
      <div v-html='description'></div>
      <div :id='$style.addtocartcontainer' v-if='addtocart'>
        <div :id='$style.addtocart'>
          <nuxt-link @click.native='addToCartClicked' :to='{path: `/bundle/${slug}`, hash: "#shipping"}'><b>ADD TO CART</b></nuxt-link><br />
          <p>Free shipping</p>
          <p>Our bundles are shipped discreet</p>
        </div>
      </div>
    </div>
    <portal v-if='showZoom' to='root'>
      <div :id='$style.fullscreen' @click='toggleZoom'>
        <div :id='$style.iconfullscreen' :style='{"background-image": `url(${require(`~/assets/img/${icon}`)})`}'></div>
      </div>
    </portal>
  </section>
</template>

<script>
import Items from '~/components/homesection-bundle-items.vue'
import priceConv from '~/lib/price.js'

export default {
  components: {Items,},
  props: ['slug', 'title', 'subtitle', 'description', 'icon', 'bullets', 'price', 'right', 'bigleds', 'smallleds', 'tinyleds', 'ventilation', 'sensor', 'url', 'nobottom', 'addtocart', 'noframe', 'promodiscount',],
  data() {
    return {
      showZoom: false,
    }
  },
  methods: {
    bundleClicked() {
      this.$matomo && this.$matomo.trackEvent('front-page', 'bundleclicked', this.$props.slug)
    },
    addToCartClicked() {
      this.$matomo && this.$matomo.trackEvent('bundle', 'addtocartclicked', this.$props.slug)
    },
    priceConv(dols) {
      return priceConv(dols)
    },
    toggleZoom() {
      this.$data.showZoom = !this.$data.showZoom
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
    margin: 0pt 0pt

#icon
  width: 40%
  height: 300pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  margin: 0 20pt 0 20pt
  cursor: pointer
  @media only screen and (max-width: 600px)
    width: 100%
    height: 300pt
    margin: 0 0pt 0 0pt

#description
  display: flex
  flex: 1
  flex-direction: column
  justify-content: center
  @media only screen and (max-width: 600px)
    margin: 0pt 10pt

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

#fullscreen
  position: fixed
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  display: flex
  align-items: center
  justify-content: center
  background-color: rgba(255, 255, 255, 0.5)

#iconfullscreen
  height: 80%
  width: 90%
  margin: 0 15pt 0 0
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  background-color: white

#text
  font-size: 1.1em
  padding: 10pt 30pt 40pt 30pt
  color: #5D5D5D
  @media only screen and (max-width: 600px)
    padding: 10pt 10pt 40pt 10pt

</style>
