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
        <h1>{{ bundle.name }}</h1>
        <h2>{{ bundle.tagline }}</h2>
      </div>
      <Price :price='bundle.SellingPoints[0].price' :promodiscount='promodiscount' :freeshipping='false' />
    </div>
    <div :id='$style.body' :style='{"flex-direction": right ? "row-reverse" : ""}'>
      <div :id='$style.iconcontainer'>
        <div v-for='(p, i) in bundle.pics' :class='$style.icon' :style='{"background-image": `url(${require(`~/assets/img/${p.fileLarge}`)})`, opacity: n == i ? 1 : 0}' @click='toggleZoom'></div>
        <div :id='$style.leftarrow' @click='previous'></div>
        <div :id='$style.rightarrow' @click='next'></div>
      </div>
      <div :id='$style.description'>
        <p v-html='$md.render(bundle.bulletpoints)' :class='$style.bullet'></p>

        <div :id='$style.bottom' v-if='!nobottom'>
          <div :id='$style.buy'>
            <!--<OutOfStock v-if='outofstock' />-->
            <nuxt-link @click.native='bundleClicked' :to='`/bundle/${bundle.slug}`'>LEARN MORE</nuxt-link><br />
          </div>
        </div>

        <div :id='$style.addtocartcontainer' v-if='addtocart && !showdescription'>
          <AddToCart :product='bundle' :sellingPoint='bundle.sellingPoints[0]' />
        </div>
      </div>
    </div>
    <div v-if='showdescription' :id='$style.text'>
      <h1>Description</h1>
      <div v-html='$md.render(bundle.description)'></div>
      <div :id='$style.addtocartcontainer' v-if='addtocart'>
        <AddToCart :product='bundle' :sellingPoint='bundle.SellingPoints[0]' />
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
import Price from '~/components/products/price.vue'
import Items from '~/components/bundle/items.vue'
import priceConv from '~/lib/price.js'
import OutOfStock from '~/components/products/outofstock.vue'
import AddToCart from '~/components/products/addtocart.vue'

export default {
  components: {Items, Price, OutOfStock, AddToCart,},
  props: ['bundle', 'nobottom', 'addtocart', 'noframe', 'promodiscount', 'showdescription', 'right'],
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
    priceConv(dols) {
      return priceConv(dols)
    },
    toggleZoom(url) {
      this.$data.zoomPic =  this.$props.bundle.pics[this.$data.n];
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
  text-transform: uppercase

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

.bullet strong
  color: #3BB30B
  font-weight: 600

.bullet > ul
  padding: 0
  list-style-type: none

.bullet > ul > li
  margin-bottom:7pt

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

#text p
  margin: 5pt 0

#text strong
  color: #3bb30b

.outofstock
  font-size: 1.2em
  font-weight: 600
  color: red
  margin: 5pt 0

</style>
