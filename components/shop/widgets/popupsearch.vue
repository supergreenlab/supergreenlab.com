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
    <input type="text" placeholder="Looking for something" v-model="listsearch">
    <div :id="$style.searchlist" v-if='listsearch.length > 0'> use v-model and v-for on products, filter on string return product = v-model</div>
  </section>
</template>

<script>

export default {
  data() {
    return{
      listsearch: ''
    }
  },
}
</script>

<style module lang=stylus>
#container
  display: flex
  justify-content: center
  align-items: center
  width: 100%

#container > input
  background-color: rgba(255,255,255,0.8)
  font-size: 1.2em
  border: 0.2pt solid black
  width: 100%
  border-radius: 3pt
  padding: 2pt 5pt
  margin: 5pt 10pt
  @media only screen and (max-width: 600px)
    width: 90%

#container > input:hover
  background-color: #e8e8e8

#searchlist
  width: 100%
  height: 1000pt
  position: absolute
  top: 25pt
  background-color: rgba(255,255,255,0.8)
  margin: 5pt
  z-index : 9000
  padding: 5pt


</style>
