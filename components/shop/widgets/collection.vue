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
    <h2 :id="$style.titleList">{{config.title}}</h2>
    <div :id="$style.headerProductList">
      <div :id="$style.picContainer">
        <div :id="$style.pic" :style='{"background-image": `url(${require(`~/assets/img/${config.picture[0].fileFull}`)})`}'></div>
      </div>
      <div :id='$style.description'>{{config.description}}</div>
    </div>
    <div v-for="collection in collections" :key="collection.id">
      <Collection :collection='collection' />
    </div>
  </section>
</template>

<script>
import Collection from '~/components/products/collection.vue'

import { collection, product, } from '~/lib/json_db.js'

export default {
  props: ['config'],
  components: { Collection, },
  computed: {
    collections() {
      const { config } = this.$props
      return (config.collections || []).map(t => collection(t))
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

#body
  display: flex
  align-items: center
  flex-wrap: wrap
  @media only screen and (max-width: 600px)
    justify-content: center

#titleList
  text-transform: uppercase
  font-weight: bold
  margin-bottom: 10pt
  font-size: 2.5em
  color: #5E5E5E

#description
  margin: 0 5pt
  text-align: justify

#pic
  width: 100pt
  height: 100pt
  background-position: center
  background-size: cover
  background-repeat: no-repeat
  margin: 0 5pt

#headerProductList
  display: flex
  width: 100%
  align-self: center
  margin-left: 20pt
  @media only screen and (max-width: 900px)
    margin-left: 0

#productlist
  @media only screen and (max-width: 900px)
    display: none

#smallproductlist
  display: none
  @media only screen and (max-width: 900px)
    display: block


/*  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center
  color: #454545

 #priceButton
  display: flex
  flex-direction: column
  @media only screen and (max-width: 600px)
    align-items: center
    justify-content: center
    text-align: center

.logo
  display: flex
  align-items: center
  height: 150px
  @media only screen and (max-width: 600px)
    margin-top: 10px
    margin-bot: 10px

.descriptionPack
  color: #5E5E5E
  margin-right: 20px
  margin-left: 20px
  @media only screen and (max-width: 600px)
    font-size: 0.9em
    text-align: center
    margin-top: 10px
    margin-bottom: 10px
    font-weight: 300

.descriptionPack strong
  color: #3bb30b
  font-weight: bold

.price
  @media only screen and (max-width: 600px)
    margin-top: 15px
    margin-bottom: 15px

#region
  width : 100%
  display: flex
  flex-direction: column
  align-items: flex-end

.body
  width: 100%
  display: flex
  align-items: center
  justify-content: space-between
  @media only screen and (max-width: 600px)
    margin: 5px 10px 5px 10px
    flex-direction: column

.packSeparator
  display: flex
  justify-content: flex-end
  text-transform: uppercase
  text-align: right
  width: 90%
  border: 1px solid
  border-style: none none dashed none
  padding-bottom: 5pt
  margin-top: 20px
  margin-bottom: 30px
  cursor: pointer
  @media only screen and (max-width: 600px)
    justify-content: center
    text-align: center

#cropPack
  margin-bottom:10px
  width: 100%
  max-width: 900pt

.number
  color: #3bb30b
  font-weight: bold
  padding: 0em 0.2em 0em 0.2em

.arrow
  width 1.25rem
  height 1.25rem
  display inline-block
  position relative
  margin 0 1rem

.leftBar
  top .5rem
  position absolute
  width .75rem
  height .1rem
  background-color #616A6B
  display inline-block
  transition all .2s ease
  left 0

.rightBar
  top .5rem
  position absolute
  width .75rem
  height .1rem
  background-color #616A6B
  display inline-block
  transition all .2s ease
  right 0 */

</style>
