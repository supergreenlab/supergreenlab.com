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
    <h1>{{ title }}</h1>
    <div :id='$style.body' :style='{"flex-direction": right ? "row-reverse" : ""}'>
      <div :id='$style.icon' :style='{"background-image": `url(${require(`~/assets/img/${icon}`)})`}'></div>
      <div :id='$style.description'>
        <p v-for='b in bullets' v-html='`- ${b}`' :class='$style.bullet'></p>
      </div>
    </div>
    <div :id='$style.buy'>
      <a href='javascript:void(0)'>BUY NOW <b>{{ price }}</b></a><br />
      Free shipping
    </div>
  </section>
</template>

<script>

export default {
  props: ['title', 'icon', 'bullets', 'price', 'right', ],
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  padding: 0 20pt

#container > h1
  color: #5D5D5D

#body
  display: flex
  margin: 30pt 0

#icon
  width: 40%
  height: 200pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  margin: 0 20pt 0 20pt

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
  text-align: right

#buy > a
  display: block
  align-self: flex-end
  background-color: #3BB30B
  padding: 8pt 25pt
  border-radius: 5pt
  color: white
  text-decoration: none

#buy > a > b
  font-weight: 600

.bullet > b
  color: #3BB30B
  font-weight: 600
  

</style>
