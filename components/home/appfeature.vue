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
    <div :class="$style.colC">
      <div v-for="appfeature in appfeatures" :key="appfeature.id">
        <AppFeatureCard :appfeature='appfeature' />
      </div>
    </div>
    <div :class="$style.colC">
      <div v-for="appfeature in appfeatures2" :key="appfeature.id">
        <AppFeatureCard :appfeature='appfeature' />
      </div>
    </div>
    <div :class="$style.colC">
      <div v-for="appfeature in appfeatures3" :key="appfeature.id">
        <AppFeatureCard :appfeature='appfeature' />
      </div>
    </div>
    <div :id="$style.manymore">And many <strong>more...</strong></div>
  </section>
</template>

<script>
import AppFeatureCard from '~/components/home/appfeaturecard.vue'
import { appfeatures } from '~/config/appfeatures.json'

export default {
components: { AppFeatureCard },
 computed: {
   appfeatures() {
     return appfeatures.slice(0, 4)
   },
   appfeatures2() {
     return appfeatures.slice(4, 8)
   },
   appfeatures3() {
     return appfeatures.slice(8, 12)
   }
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-wrap: wrap
  width: 100%
  max-width: 700pt
  justify-content: center
  margin-bottom: 20pt


.colC
  display: flex
  flex-direction: column

#manymore
  text-align: right
  font-weight: bold
  font-size: 1em
  width: 88%
  @media only screen and (max-width: 600px)
    width: 200pt

#manymore strong
  color: #3BB30B

</style>
