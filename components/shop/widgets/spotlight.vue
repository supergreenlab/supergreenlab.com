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
    <div :id="$style.spotlight"></div>
    <div :id="$style.minispot">
      <div :class="$style.minispot"></div>
      <div :class="$style.minispot"></div>
      <div :class="$style.minispot"></div>
    </div>

  </section>
</template>

<script>
export default {

}
</script>

<style module lang=stylus>

#container
  width: 100%
  height: 550px
  display: flex
  justify-content: center
  align-items: center

#spotlight
  background-color: lightblue
  width: 40%
  height: 490px

#minispot
 display: flex
 flex-direction: column
 justify-content: space-around

.minispot
  width: 150px
  height: 150px
  background-color: lightblue
  margin: 10px

</style>
