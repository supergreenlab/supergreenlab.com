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
    <div :class='$style.control' @click='change(value-1)'>-</div>
    <div :id='$style.value'>
      {{ value }}
    </div>
    <div :class='$style.control' @click='change(value+1)'>+</div>
  </section>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    change(v) {
      this.$emit('change', v)
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  align-items: center
  justify-content: center
  font-size: 2em
  border: 1px solid #454545
  border-radius: 5px

#container > div
  flex: 1

.control
  cursor: pointer
  padding: 10pt

</style>
