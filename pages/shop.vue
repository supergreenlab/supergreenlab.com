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
  <section :id="$style.container">
    <div id='header'>
      <div :id='$style.header'>
        <Header/>
      </div>
      <div :id='$style.content'>
        <div>
          Left column
        </div>
        <div>center</div>
        <div>Right column</div>
      </div>
    </div>
  </section>
</template>

<script>
import Header from '~/components/shop/layout/header.vue'


export default{
  components: {Header,}
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center

#header
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 1000

#content
  position relative
  display: flex
  justify-content: space-around
  height: 3000px
  width: 100%
  background-color: green
</style>
