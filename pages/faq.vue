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
  <div :id='$style.container'>
    <div :id='$style.header'>
      <Header responsiveHide='true' />
    </div>
    <div :id='$style.body'>
      <div v-for='(f, i) in faq' :key='i'>
        <h2 :class='$style.question'>{{ f.q }}</h2>
        <p :class='$style.answer' v-html='f.a'></p>
      </div>
    </div>
  </div>
</template>

<script>
import { faq } from '~/config/faq.json'

import Header from '~/components/layout/header.vue'

export default {
  components: {Header,},
  computed: {
    faq: () => faq
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  color: #5d5d5d

#body
  padding: 50pt 30pt

.question
  margin: 20pt 0

.answer
  font-size: 1.2em

</style>
