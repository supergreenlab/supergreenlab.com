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
  <section>
    <div :id="$style.container">
      <div :id="$style.guidespotlightcontainer">
        <h2 :id="$style.title" v-html='$md.render(config.title)'></h2>
        <div :id="$style.description" v-html='$md.render(config.description)'></div>
        <div :id="$style.spotlightContent">
          <CardGuide :guide='guide' userStep='0' :class='$style.cardContainer' />
          <div :id="$style.require">
            <h3 :id="$style.tagline">What you'll need</h3>
            <SmallProductList :products='products' maxItems='3' />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CardGuide from '~/components/guides/cardguide.vue'
import SmallProductList from '~/components/products/smallproductlist.vue'

import { products } from '~/config/products.json'

export default {
  props: ['config'],
  components: { CardGuide, SmallProductList },
  computed: {
    guide() {
      const { config } = this.$props
      const slug = config.guideslug
      const guide = require(`~/config/guide-${slug}.json`)
      // console.log(guide)
      return guide
    },
    products() {
      const { config } = this.$props
      const slug = config.guideslug
      const guide = require(`~/config/guide-${slug}.json`)
      return (guide.requires || []).map(p => products.find(p1 => p1.id == p))
    }
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  justify-content: center
  align-items: center

#guidespotlightcontainer
  display:flex
  flex-direction: column

#title
  text-transform: uppercase
  font-weight: bold
  font-size: 2.5em
  margin-bottom: 10pt
  color: #5E5E5E
  @media only screen and (max-width: 600px)
    margin-bottom: 0

#description
  text-align: justify
  margin: 0 10pt
  @media only screen and (max-width: 600px)
    margin: 5pt

#spotlightContent
  display:flex
  justify-content: center
  align-items: center
  margin: 5pt
  @media only screen and (max-width: 1200px)
    flex-direction: column

.cardContainer
  display: flex
  flex-direction: column
  max-width: 300pt

#tagline
  color: #5E5E5E
  font-weight: bold

#require
  display: flex
  flex-direction: column
  margin: 10pt

</style>
