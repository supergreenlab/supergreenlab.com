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
    <div v-if='config.picture' :id="$style.pic" :style='{"background-image": `url(${require(`~/assets/img/${config.picture[0].fileFull}`)})`}'></div>
    <div :id='$style.text'>
      <h2 v-if='config.title' :id="$style.title">{{config.title}}</h2>
      <div v-if='config.description' :id="$style.description" v-html='$md.render(config.description)'></div>
    </div>
  </section>
</template>


<script>

export default {
  components: { },
  props: ['config'],
  data() {
    return {

    }
  },
  computed: {

  },
}

</script>

<style module lang=stylus>

#container
  display: flex
  margin: 0 10pt
  @media only screen and (max-width: 600px)
    flex-direction: column

#title
  font-family: Roboto
  text-transform: uppercase
  font-weight: bold
  margin-bottom: 10pt
  font-size: 2em
  color: #5E5E5E
  margin: 10pt 0 10pt 0
  @media only screen and (max-width: 600px)
    font-size: 1.5em

#pic
  width: 300pt
  height: 300pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  @media only screen and (max-width: 1100px) and (min-width: 600px)
    width: 200pt
    height: 200pt
  @media only screen and (max-width: 600px)
    width: 100%

#text
  flex: 1
  margin: 0 20pt
  @media only screen and (max-width: 600px)
    margin: 0 5pt

#description
  text-align: justify
  margin: 0 10pt
  color: #454545
  margin: 10pt 5pt
  @media only screen and (max-width: 600px)
    margin: 0 5pt

#description strong
  color: #3BB30B
  font-weight: 600

#description ul
  padding: 0
  list-style-type: none

#description ul li
  margin-bottom:7pt

#description ul li::before
  content: '- '
  color: #3bb30b
  font-weight: bold

</style>
