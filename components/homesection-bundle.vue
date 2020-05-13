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
      <Price :price='price' :promodiscount='promodiscount' :freeshipping='false' />
    </div>
    <div :id='$style.body' :style='{"flex-direction": right ? "row-reverse" : ""}'>
      <div :id='$style.iconcontainer'>
        <div :class='$style.icon' :style='{"background-image": `url(${require(`~/assets/img/${icon}`)})`, opacity: n == 0 ? 1 : 0}' @click='toggleZoom'></div>
        <div :class='$style.icon' :style='{"background-image": `url(${require(`~/assets/img/${setupicon}`)})`, opacity: n == 1 ? 1 : 0}' @click='toggleZoom'></div>
        <div :class='$style.icon' :style='{"background-image": `url(${require(`~/assets/img/${setupicon2}`)})`, opacity: n == 2 ? 1 : 0}' @click='toggleZoom'></div>
        <div :class='$style.icon' :style='{"background-image": `url(${require(`~/assets/img/${setupicon3}`)})`, opacity: n == 3 ? 1 : 0}' @click='toggleZoom'></div>
        <div :id='$style.leftarrow' @click='previous'></div>
        <div :id='$style.rightarrow' @click='next'></div>
      </div>
      <div :id='$style.description'>
        <p v-for='b in bullets' v-html='`- ${b}`' :class='$style.bullet'></p>

        <div :id='$style.bottom' v-if='!nobottom'>
          <div :id='$style.buy'>
            <!--<nuxt-link @click.native='bundleClicked' :to='`/bundle/${slug}`'>BUY NOW <b>${{ price }}</b></nuxt-link><br />-->
            <!--<OutOfStock v-if='outofstock' />-->
            <nuxt-link @click.native='bundleClicked' :to='`/bundle/${slug}`'>LEARN MORE</nuxt-link><br />
          </div>
        </div>

        <div :id='$style.addtocartcontainer' v-if='addtocart && !description'>
          <div :id='$style.addtocart'>
            <nuxt-link @click.native='addToCartClicked' :to='{path: `/bundle/${slug}`, hash: "#shipping"}'><b>ADD TO CART</b></nuxt-link><br />
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
          <!--<OutOfStock v-if='outofstock' />-->
          <nuxt-link @click.native='addToCartClicked' :to='{path: `/bundle/${slug}`, hash: "#shipping"}'><b>ADD TO CART</b></nuxt-link><br />
          <p>Our bundles are shipped discreet</p>
        </div>
      </div>
    </div>
    <portal v-if='showZoom' to='root'>
      <div :id='$style.fullscreen' @click='toggleZoom'>
        <div :id='$style.iconfullscreen' :style='{"background-image": `url(${require(`~/assets/img/${zoomPic}`)})`}'></div>
      </div>
    </portal>
  </section>
</template>

<script>
import Price from '~/components/price.vue'
import Items from '~/components/homesection-bundle-items.vue'
import priceConv from '~/lib/price.js'
import OutOfStock from '~/components/outofstock.vue'

export default {
  components: {Items, Price, OutOfStock,},
  props: ['slug', 'title', 'subtitle', 'description', 'icon', 'setupicon', 'setupicon2', 'setupicon3', 'bullets', 'price', 'right', 'bigleds', 'smallleds', 'tinyleds', 'ventilation', 'sensor', 'url', 'nobottom', 'addtocart', 'noframe', 'promodiscount', 'outofstock',],
  data() {
    return {
      showZoom: false,
      zoomPic: '',
      n: 0,
    }
  },
  created() {
    this.interval = setInterval(() => {
      this.$data.n = (this.$data.n+1) % 4
    }, 3000)
  },
  destroyed() {
    if (this.interval) clearInterval(this.interval)
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
    toggleZoom(url) {
      this.$data.zoomPic =  [this.$props.icon, this.$props.setupicon, this.$props.setupicon2, this.$props.setupicon3][this.$data.n];
      this.$data.showZoom = !this.$data.showZoom
    },
    next() {
      this.$data.n = (this.$data.n+1) % 4
      clearInterval(this.interval)
      this.interval = null
    },
    previous() {
      this.$data.n = (this.$data.n-1)
      if (this.$data.n < 0) this.$data.n = 3
      clearInterval(this.interval)
      this.interval = null
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

#iconcontainer
  position: relative
  width: 40%
  height: 300pt
  margin: 0 20pt 0 20pt
  cursor: pointer
  @media only screen and (max-width: 600px)
    width: 100%
    height: 300pt
    margin: 20pt 0pt 20pt 0pt

.icon
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  transition: opacity 1s

#leftarrow, #rightarrow
  width: 30pt
  height: 30pt
  position: absolute
  top: calc(50% - 15pt)
  background-position: center
  background-size: contain
  background-repeat: no-repeat

#leftarrow
  left: 5pt
  background-image: url('~assets/img/leftarrow.png')

#rightarrow
  right: 5pt
  background-image: url('~assets/img/rightarrow.png')

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
  @media only screen and (max-width: 600px)
    margin: 30pt 10pt 0 0
    align-self: flex-end

#buy > a
  display: block
  align-self: flex-start
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
  flex: 1
  align-items: center
  justify-content: center
  height: 80%
  width: 90%
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

.outofstock
  font-size: 1.2em
  font-weight: 600
  color: red
  margin: 5pt 0

</style>
