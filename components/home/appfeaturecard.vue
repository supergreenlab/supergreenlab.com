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
    <div :id="$style.card"  @click="toggle">
      <div :id="$style.headerCard">
        <div :id="$style.headerText">
          <div :id="$style.iconContainer" :style='{"border-bottom-left-radius": (Open? "5pt" : "0")}'>
            <div :id="$style.CircleIconContainer">
              <div :id="$style.icon" :style='{"background-image": `url(${require(`~/assets/img/${appfeature.icon}`)})`}'></div>
            </div>
          </div>
          <div v-html='$md.render(appfeature.title)'></div>
        </div>
        <span  :class="$style.arrow">
          <span :class="$style.leftBar" :style='{"transform": (Open? "rotate(45deg)" : "rotate(-45deg)")}'></span>
          <span :class="$style.rightBar" :style='{"transform": (Open? "rotate(-45deg)" : "rotate(45deg)")}'></span>
        </span>
      </div>
      <div :id="$style.text" v-html='$md.render(appfeature.text)' :style='{"display": (Open? "none" : "flex")}'></div>
    </div>
  </section>
</template>

<script>

export default {
  props: ['appfeature'],
  data() {
    return {
      Open: true
    }
  },
  methods: {
    toggle: function(){
      this.Open = !this.Open
    },
  }
}
</script>

<style module lang=stylus>

#card
  border: solid 0.2px #CACACA
  color: #323232
  display: flex
  flex-direction: column
  margin: 5pt
  width: 200pt
  border-radius: 5pt

#card strong
  color: #3BB30B

#headerCard
  display: flex
  justify-content: space-between
  align-items: center

#headerText
  display: flex
  align-items: center

#CircleIconContainer
  background-color: white
  width: 30pt
  height: 30pt
  border-radius: 20pt
  display: flex
  justify-content: center
  align-items: center

#iconContainer
  background-color:  #132F45
  display: flex
  align-items: center
  justify-content: center
  width: 50pt
  height: 40pt
  margin-right: 5pt
  border-top-left-radius: 5pt


#icon
  width: 20pt
  height: 20pt
  background: no-repeat
  background-size: contain
  background-position: center

#text
  /* border: solid 0.2px #CACACA */
  padding: 5pt
  border-radius: 3pt
  height: 100%
  /* display: flex */
  flex-direction: column
  justify-content: center

#text p
  margin: 5pt 0

.arrow
  width: 1.25rem
  height: 1.25rem
  display: inline-block
  position: relative
  margin: 0 10pt
  cursor: pointer

.leftBar
  top: .5rem
  position: absolute
  width: .75rem
  height: .1rem
  background-color: #132F45
  display: inline-block
  transition: all .2s ease
  left: 0

.rightBar
  top: .5rem
  position: absolute
  width: .75rem
  height: .1rem
  background-color: #132F45
  display: inline-block
  transition: all .2s ease
  right: 0

#text ol li
  margin: 15pt 0pt

</style>
