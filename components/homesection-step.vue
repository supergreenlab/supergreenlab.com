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
  <section :id='$style.container' :style='{"flex-direction": vertical ? "column" : ""}'>
    <div :id='vertical ? $style.iconv : $style.iconh' :style='{"background-image": `url(${require(`~/assets/img/${icon}`)})`}'></div>
    <div :id='$style.body'>
      <h1>{{ n }}</h1>
      <p :id='$style.title'>
        {{ title }}
      </p>
      <p :id='$style.text' v-html='text'></p>
    </div>
  </section>
</template>

<script>
export default {
  props: ['n', 'title', 'text', 'icon', 'vertical', ],
}
</script>

<style module lang=stylus>

#container
  display: flex 

#iconv, #iconh
  background-position: center
  background-size: contain
  background-repeat: no-repeat

#iconv
  width: 100%
  height: 150pt

#iconh
  flex: 0.3
  margin-right: 20pt

#body
  flex: 0.7

#title
  margin-bottom: 5pt
  font-size: 1.1em
  font-weight: 400

#body > h1
  margin-top: 0
  font-size: 3em

</style>
