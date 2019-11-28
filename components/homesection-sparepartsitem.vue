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
    <h2>{{ name }}</h2>
    <div :id='$style.pic' :style='{"background-image": `url(${require(`~/assets/img/${icons.white}`)})`}'></div>
    <div v-for='b in bullets' v-html='b'></div>
    <div :class='$style.price'>
      <Price :price='price' :promodiscount='promodiscount' />
    </div>
    <OutOfStock v-if='outofstock' />
    <a :id='$style.goto' :href='url'>View in spare part shop</a>
  </section>
</template>

<script>
import OutOfStock from '~/components/outofstock.vue'
import Price from '~/components/price.vue'

export default {
  components: {Price, OutOfStock,},
  props: ['name', 'icons', 'bullets', 'price', 'promodiscount', 'url', 'outofstock',],
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  flex-wrap: wrap
  max-width: 250pt
  color: #454545

#pic
  margin: 10pt
  width: 100%
  height: 150pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat

.price
  display: flex
  margin: 10pt 0

#goto
  display: block
  align-self: flex-start
  background-color: #3BB30B
  padding: 8pt 25pt
  border-radius: 5pt
  color: white
  text-decoration: none

#goto:hover
  background-color: #2F880B

#goto > b
  font-weight: 600

</style>
