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
    <h3>Box #{{ i }}</h3>
    <div :id='$style.empty'>
      No light selected for this box yet.
      <nuxt-link :id='$style.create' :to='`/designer/box/${i}`'>Create box</nuxt-link>
    </div>
    <div v-if='enabled == "false"' :id='$style.disabled'></div>
  </section>
</template>

<script>
export default {
  props: ['i', 'enabled'],
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
  align-self: start

#empty
  display: flex
  flex-direction: column
  align-items: start
  justify-content: center
  padding: 30pt 0

#create
  display: flex
  flex-direction: column
  color: white
  background-color: #3BB30B
  margin: 20pt 0 25pt 0
  padding: 5pt 35pt
  border-radius: 5pt
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

</style>
