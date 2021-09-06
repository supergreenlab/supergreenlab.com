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
    <div :id='$style.icon' :style='{"background-image": `url(${require(`~/assets/img/${icon}`)})`}'></div>
    <h1>{{ title }}</h1>
  </section>
</template>

<script>
export default {
  props: ['icon', 'title',],
}
</script>

<style module lang=stylus>

#container
  font-family: Roboto
  display: flex
  width: 100%
  justify-content: center
  align-items: center
  padding: 10pt 0
  margin-top: 40pt
  border-top: 5px solid #3bb30b
  border-bottom: 1px solid #eee
  color: #5D5D5D
  @media only screen and (max-width: 600px)
    font-size: 0.8em

#icon
  width: 50pt
  height: 50pt
  margin: 0 15pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  @media only screen and (max-width: 600px)
    width: 30pt
    height: 30pt
    margin: 0 8pt

</style>
