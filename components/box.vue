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
  <section :id='$style.container' :style='{display: visible ? "" : "none"}'>
    <h3>Box #{{ i+1 }}<span v-if='box.leds'> - </span><span v-if='box.leds' :id='$style.type'>{{ main ? "Main" : "Veg" }}</span></h3>
    <div v-if='!box.leds'>
      <div :id='$style.empty'>
        No light selected for this box yet.
        <nuxt-link :id='$style.create' :to='`/designer/box/${i+1}`'>Create box</nuxt-link>
      </div>
      <div v-if='box.enabled == "false"' :id='$style.disabled'></div>
    </div>
    <div v-else :id='$style.item'>
      <Item 
        :icon='box.leds.icons[box.color]'
        :name='box.leds.name'
        :n='Math.floor(box.leds.n)'
        :total='`$${Math.round(box.leds.price * Math.floor(box.leds.n) * 100) / 100}`'>
        <span  v-if='box.leds.power == "external"' :id='$style.power'>
          Power included<br />
          <span :id='$style.powergreen'>No seperate driver needed</span>
          <span v-if='box.leds.power == "mw"' :id='$style.powerred'>Seperate driver needed</span>
        </span>
        <span  v-if='box.leds.power == "mw"' :id='$style.power'>
          Power <b>NOT</b> included<br />
          <span :id='$style.powerred'>Seperate driver needed</span>
        </span>
        <span :id='$style.shipping'>
          SHIPPING SUMMER 2019
        </span>
      </Item>
      <div :id='$style.actions'>
        <nuxt-link :to='`/designer/box/${i+1}`'>Edit</nuxt-link>
        <a href='javascript:void(0)' v-on:click='clear'>X clear</a>
      </div>
    </div>
  </section>
</template>

<script>
import Item from './item.vue'
export default {
  components: { Item },
  props: ['i', 'box', 'visible', 'main',],
  methods: {
    clear() {
      const { i } = this.$props
      this.$store.commit('boxes/update', {i, obj: {leds: null}})
    },
  },
}
</script>

<style module lang=stylus>

#container
  position: relative
  display: flex
  flex-direction: column

#logo
  margin: 5pt
  font-size: 1.2em
  align-self: flex-start

#empty
  display: flex
  flex-direction: column
  align-items: flex-start
  justify-content: center
  padding: 30pt 0

#create
  display: flex
  flex-direction: column
  color: white
  background-color: #3BB30B
  margin: 20pt 0 25pt 0
  padding: 5pt 35pt
  border-radius: 3pt
  text-decoration: none
  text-align: center
  font-weight: 600

#create:hover
  background-color: #2C800B

#disabled
  position: absolute
  width: 100%
  height: 100%
  top: 0
  left: 0
  background-color: rgba(255, 255, 255, 0.8)

#item
  display: flex
  margin: 20pt 0

#actions
  display: flex
  flex-direction: column
  justify-content: center
  white-space: nowrap

#actions > a
  margin-bottom: 5pt

#power
  font-size: 0.9em

#powergreen
  color: #3BB30B

#powerred
  color: #EA1E1E

#type
  color: #3BB30B

#shipping
  color: #2C800B
  font-size: 0.8em
  font-weight: 600

</style>
