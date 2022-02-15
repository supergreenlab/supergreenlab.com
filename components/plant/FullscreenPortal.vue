<!--
      Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
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
  <portal to='root'>
    <section :id='$style.container' @click='onClose'>
      <slot />
    </section>
  </portal>
</template>

<script>
export default {
  props: ['onClose'],
  head: {
    bodyAttrs: {
      class: 'noscroll'
    }
  }
}
</script>

<style module lang=stylus>

#container
  z-index: 10000
  display: flex
  align-items: center
  justify-content: center
  position: fixed
  top: 100px
  left: 50px
  height: calc(100vh - 150px)
  width: calc(100vw - 100px)
  background-color: rgba(0, 0, 0, 0.5)
  @media only screen and (max-width: 600px), screen and (max-height: 500px)
    top: 0
    left: 0
    height: 100vh
    width: 100vw

</style>
