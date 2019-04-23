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
    <div :id='$style.image'>
      <img :src='require(`~/assets/img/${image}`)' />
    </div>
    <div :id='$style.body'>
      <h4>{{ title }}</h4>
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: ['image', 'title',],
}
</script>

<style module lang=stylus>

#container
  display: flex
  margin: 20pt 0
  @media only screen and (max-width: 600px)
    flex-direction: column

#image
  display: flex
  align-items: center
  justify-content: center

#image > img
  margin-right: 20pt
  max-width: 100pt
  @media only screen and (max-width: 600px)
    margin-right: 0
    margin-bottom: 20pt

#body > h4
  margin-bottom: 10pt
  font-weight: 400
  font-size: 1.1em

</style>
