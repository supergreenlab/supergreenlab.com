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
    <div :id='$style.label'>{{ label }} <span v-if='!optional'>*</span></div>
    <input type='text' :name='name' :value='value' @input='onInput' @change='onChange' />
  </section>
</template>

<script>
export default {
  props: ['label', 'value', 'name', 'optional',],
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
    },
    onChange(e) {
      this.$emit('input', e.target.value);
    },
  },
}
</script>

<style module lang=stylus>

#container
  width: 100%

#label
  margin: 0 0 5pt 0
  font-weight: 600
  font-size: 1.1em
  color: #454545

#label > span
  color: red

#container > input
  width: 100%
  border: 1pt solid #ABABAB
  font-weight: 400
  color: #454545

</style>
