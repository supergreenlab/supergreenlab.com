<!--
      Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
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
  <div :id="$style.container">
    <div v-for="(initialValue, key) in feedEntry.params.initialValues"
         v-if="initialValue !== feedEntry.params.values[key]"
         :class="$style.value">
      <span>channel</span>
      <span :class="$style.channel">{{key + 1}}</span>
      <span>{{initialValue}}%&nbsp;&#10132;&nbsp;{{feedEntry.params.values[key]}}%</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    feedEntry: {
      type: Object,
      required: true,
      default: {}
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: inline-flex
  flex-wrap: wrap
  justify-content: center

.value
  display: flex
  flex-direction: column
  align-items: center
  margin: 10px

.channel
  font-size: 35px
  color: gray

</style>
