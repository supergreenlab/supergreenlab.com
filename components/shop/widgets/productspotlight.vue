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
  <section>
    <div :id="$style.container">
        <div :id="$style.title">{{ config.title }}</div>
        <div :id="$style.description">{{ config.description }}</div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['config']
}
</script>

<style module lang=stylus>

#container
  display: flex
  justify-content: center
  align-items: center

#title
  text-transform: uppercase
  font-weight: bold
  font-size: 1.5em
  color: #5E5E5E

#description
  color: #3bb30b

</style>
