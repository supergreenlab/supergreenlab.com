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
    <div :id='$style.pic' :style='{"background-image": `url(${require(`~/assets/img/${guide.thumbnail.fileLarge}`)})`}'></div>
    <div :id='$style.infos'>
      <h3>{{ guide.name }}</h3>
      <div v-html='$md.render(guide.text || "")'></div>
      <div>
        <nuxt-link :id='$style.button' :to='`/guide/${guide.slug}`'>{{ button || 'VIEW GUIDE' }}</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  props: ['guide', 'button'],
}

</script>

<style module lang=stylus>

#container
  display: flex
  margin: 10pt 0 20pt 0
  @media only screen and (max-width: 600pt)
    flex-direction: column
    align-items: center

#pic
  flex: 1
  max-width: 150px
  height: 150px
  margin: 0 10pt 0 0
  background-position: top
  background-size: contain
  background-repeat: no-repeat
  @media only screen and (max-width: 600pt)
    background-position: center
    width: 150px
    max-height: 150px
    flex: auto
    margin: 0 0 10pt 0

#infos
  display: flex
  flex: 1
  flex-direction: column
  color: #454545

#infos > p
  flex: 1

#infos > p strong
  color #3bb30b

#infos > h3
  margin: 0 0 10pt 0

#button
  display: inline-block
  background-color: #3BB30B
  text-align: center
  padding: 3pt 15pt
  border-radius: 3pt
  color: white
  text-decoration: none
  font-size: 1em
  margin: 10pt 0 0 0
  white-space: nowrap
  font-weight: bold

#button:hover
  background-color: #2F880B

</style>
