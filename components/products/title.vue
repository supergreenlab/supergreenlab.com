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

#container > h1
  display: flex
  align-items: flex-end
  font-weight: 300
  text-transform: uppercase
  margin: 0

</style>
