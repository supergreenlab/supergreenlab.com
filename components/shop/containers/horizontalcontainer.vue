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
    <div v-if='config.title' :id='$style.title'>
      <SectionTitle v-if='config.title'
                    :title='config.title'
                    center='true'
                    border='true'/>
    </div>
    <div :id='$style.header'>
      <div v-if='config.picture.length' :id="$style.pic" :style='{"background-image": `url(${require(`~/assets/img/${config.picture[0].fileFull}`)})`}'></div>
      <div v-if='config.description' :id='$style.text'>
        <div :id="$style.description" v-html='$md.render(config.description)'></div>
      </div>
    </div>
    <div :id='$style.horizontalContainer'>
      <slot></slot>
    </div>
  </section>
</template>

<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'

export default {
  components: { SectionTitle, },
  props: ['config',],
}

</script>


<style module lang=stylus>

#container
  display: flex
  flex-direction: column

#header
  display: flex
  margin: 5pt 10pt

#title
  font-family: Roboto
  margin: 30pt 0 30pt 0
  @media only screen and (max-width: 600px)
    margin: 0 0 10pt 0

#pic
  width: 100pt
  height: 100pt
  background-position: center
  background-size: cover
  background-repeat: no-repeat
  @media only screen and (max-width: 600px)
    width: 75pt
    height: 75pt

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

#horizontalContainer
  margin-top: 20pt
  margin-bottom: 20pt
  width: 100%
  display: flex

</style>
