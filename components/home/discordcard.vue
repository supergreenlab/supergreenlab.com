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
  <section>
    <div :id="$style.card" @click="toggleIt" >
      <div :id="$style.headerCard">
        <div :id="$style.headerText">
          <div :id="$style.emoji" :style='{"background-image": `url(${require(`~/assets/img/${channel.emoji}`)})`}'></div>
          <div v-html='$md.render(channel.title)'></div>
        </div>
        <span  :class="$style.arrow">
          <span :class="$style.leftBar" :style='{"transform": (OpenIt? "rotate(-45deg)" : "rotate(45deg)")}'></span>
          <span :class="$style.rightBar" :style='{"transform": (OpenIt? "rotate(45deg)" : "rotate(-45deg)")}'></span>
        </span>
      </div>
      <div :id="$style.text" v-html='$md.render(channel.text)' v-show="OpenIt"></div>
    </div>

  </section>
</template>

<script>

export default {
  props: ['channel'],
  data() {
    return {
      OpenIt: false
    }
  },
  methods: {
    toggleIt: function(){
      this.OpenIt = !this.OpenIt
    },
  }
}
</script>

<style module lang=stylus>


#card
  background-color: #2F3136
  color: white
  display: flex
  flex-direction: column
  margin: 5pt
  width: 200pt
  padding: 3pt
  border-radius: 3pt
  cursor pointer

#headerCard
  font-family: Roboto
  display: flex
  margin: 3pt
  justify-content: space-between

#headerText
  display: flex

#emoji
  width: 15pt
  height: 15pt
  background: no-repeat
  background-size: contain
  background-position: center
  margin-right: 2pt

#text
  background-color: #36393F
  padding: 5pt
  border-radius: 3pt
  display: flex
  flex-direction: column
  justify-content: space-around

.arrow
  width 1.25rem
  height 1.25rem
  display inline-block
  position relative
  margin 0 2pt

.leftBar
  top .5rem
  position absolute
  width .75rem
  height .1rem
  background-color white
  display inline-block
  transition all .2s ease
  left 0

.rightBar
  top .5rem
  position absolute
  width .75rem
  height .1rem
  background-color white
  display inline-block
  transition all .2s ease
  right 0

#text ol li
  margin: 15pt 0pt

</style>
