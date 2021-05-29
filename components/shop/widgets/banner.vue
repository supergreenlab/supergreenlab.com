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
    <div :id="$style.test">
      {{ picture }}
      {{ link }}
    </div>
  </section>
</template>

<script>

export default {

}
</script>

<style module lang=stylus>
#container
  height: 220px
  width: 100%
  @media only screen and (max-width: 600px)
    height: 320px
    display: flex
    justify-content: center

#test
  font-family: plumeAd
  font-size: 2.7em
  color: white
  -webkit-text-stroke: 0.5px #3BB30B
  text-align:center
  height: 200px
  background-color: yellow
  margin: 10px
  @media only screen and (max-width: 600px)
    width: 300px
    height: 300px

</style>
