<!--
      Copyright (C) 2020  SuperGreenLab <towelie@supergreenlab.com>
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
    <img src='~assets/img/cart/icon-cart.svg' />
    <h1>{{ title }}</h1>
  </section>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  border-bottom: 2px solid #9a9a9a
  @media only screen and (max-width: 600pt)
    font-size: 0.8em

#container > img
  margin: 5pt 10pt 5pt 0
  @media only screen and (max-width: 600pt)
    width: 20pt
    height: 20pt

#container > h1
  display: flex
  align-items: flex-end
  font-weight: 300
  text-transform: uppercase
  margin: 0

</style>
