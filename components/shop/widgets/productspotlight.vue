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
      <div :id="$style.spotlightcontainer">
        <h2 :id="$style.title" v-html='$md.render(config.title)'></h2>
        <div :id="$style.description" v-html='$md.render(config.description)'></div>
        <SmallProductList :id='$style.smallproductlist' :products='products' />
      </div>
    </div>
  </section>
</template>

<script>

import SmallProductList from '~/components/products/smallproductlist.vue'

import { products } from '~/config/products.json'

export default {
  props: ['config',],
  components: { SmallProductList },
  data() {
    return {
    }
  },
  computed: {
    products() {
      const { config } = this.$props
      return (config.products || []).map(p => products.find(p1 => p1.id == p))
    },
  },
  methods: {
  }
}

</script>

<style module lang=stylus>

#container
  display: flex
  align-items: center
  margin: 5pt


#spotlightcontainer
  display:flex
  flex-direction: column

#smallproductlist
  width: 100%

#title
  text-transform: uppercase
  font-weight: bold
  font-size: 2.5em
  color: #5E5E5E
  margin-bottom: 10pt
  @media only screen and (max-width: 600px)
    margin: 0


#description
  text-align: justify
  margin: 0 10pt 15pt
  @media only screen and (max-width: 600px)
    margin: 0 5pt
/*
#content
  display:flex
  flex-direction: column
  margin-left: 10pt
  @media only screen and (max-width: 600px)
    margin-top: 10pt


#contentlink
  text-decoration: none

#contentlink:hover
  text-decoration: underline

#contentlink > h3
  color: #5E5E5E

#contentlink > div
  margin-bottom: 5pt

.productspotlight
  display: flex
  align-items: center
  justify-content: center
  @media only screen and (max-width: 600px)
    flex-direction: column

#pics
  width: 300pt
  height: 300pt
  background-position: center
  background-size: cover
  background-repeat: no-repeat
  @media only screen and (max-width: 600px)
    width: 250pt
    height: 250pt

#pricing
  display: flex
  flex-direction: column
  align-self: flex-end

#bullets
  color: #454545

#bullets strong
  color: #3BB30B
  font-weight: 600

#bullets ul
  padding: 0
  list-style-type: none

#bullets ul li
  margin-bottom:7pt

#bullets ul li::before
  content: '- '
  color: #3bb30b
  font-weight: bold

#tagline
  color: #3bb30b
  font-weight: bold */

</style>
