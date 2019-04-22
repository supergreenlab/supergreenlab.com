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
    <div :id='$style.logo'>
      <Logo subtitle='Growbox designer' />
    </div>
    <div :id='$style.body'>
      <div :id='$style.choice'>
        <h2 v-on:click='switchbox(true)' :class='box.main ? $style.selected : ""'>Main box</h2>
        <h2 v-on:click='switchbox(false)' :class='!box.main ? $style.selected : ""'>Veg box <small>(optional)</small></h2>
      </div>
      <p v-if='box.main' :id='$style.intro'>
        The main box is all you need to grow, it can go from sprout to harvest.<br />
        Your mainbox will need a good amount of lights, which is calculated<br />
        based on the surface of your canopy.<br />
        You can easily have up to two main boxes for one veg box.<br />
        <br />
        Enter the size of your space below, it will tell you what lights and how many you’ll want.<br />
        <br />
        How it works: first it finds what type of scrogging you’ll have to do: vertical or horizontal,<br />
        and what led panels will be enough to cover the whole grow.
      </p>
      <p v-else :id='$style.intro'>
        The veg box is what will get you into the world of continuous supply.<br />
        Plants usually take between 3 and 4 months to go from sprout to harvest.<br />
        You can easily win 3 to 6 weeks by starting the next one before the previous one ended:)<br />
        Veg box use much less light and space, and plants in vegetative state produce zero smell,<br />
        all in all it means just a small 36 or 72 led panel is enough with a tiny computer fan,<br />
        carbon filter is not needed. And they’re directly powered by the controller, no power supply,<br />
        less shipping costs.<br />
        <br />
        This can totally be built inside a shoebox next to your mainbox.
      </p>
        <div :id='$style.form'>
          <div :id='$style.box'>
            <div :class='$style.units'>
              <CheckBox color='#3AB20B' label='Metric' :checked='unit == "metric"' v-on:click='changeUnit("metric")' />
              <CheckBox color='#C4C4C4' label='Imperial' :checked='unit == "imperial"' v-on:click='changeUnit("imperial")' />
            </div>
            <div :id='$style.fields'>
              <div :class='$style.field'>
                <span>Width: </span><input type='text' v-model='box.width' /><span>cm</span>
              </div>
              <div :class='$style.field'>
                <span>Height: </span><input type='text' v-model='box.height' /><span>cm</span>
              </div>
              <div :class='$style.field'>
                <span>Depth: </span><input type='text' v-model='box.depth' /><span>cm</span>
              </div>
            </div>
          </div>
          <div :id='$style.viewer'>
            <div :class='$style.units'>
              <CheckBox color='white' label='White' :checked='box.color == "white"' v-on:click='changeColor("white")' />
              <CheckBox color='black' label='Black' :checked='box.color == "black"' v-on:click='changeColor("black")' />
            </div>
            <div :id='$style.item'>
              <div :id='$style.itempic' :style='{"background-image": `url(${require("~/assets/img/144-black.png")})`}'></div>
              <div :id='$style.itemdescription'>
                <span :id='$style.itemname'>SGB 144.301B</span>
                <span :id='$style.itemn'>x<b>2</b> = <b>$199.99</b></span>
                <span :id='$style.power'>
                  Power included<br />
                  <span :id='$style.powergreen'>No seperate driver needed</span>
                </span>
              </div>
            </div>
            <span :id='$style.hint'>Vertical scrogging looks to be the most<br />appropriate here</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/logo.vue'
import CheckBox from '~/components/checkbox.vue'

export default {
  components: { Logo, CheckBox, },
  computed: {
    box() {
      return this.$store.getters['boxes/getBox'](0)
    },
    unit() {
      return this.$store.state.boxes.unit
    },
  },
  methods: {
    switchbox(main) {
      this.$store.commit('boxes/update', {i: 0, obj: {main}})
    },
    changeColor(color) {
      this.$store.commit('boxes/update', {i: 0, obj: {color}})
    },
    changeUnit(unit) {
      this.$store.commit('boxes/unit', {unit})
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  min-height: 100vh

#logo
  margin: 5pt
  font-size: 1.2em
  align-self: start

#choice
  display: flex
  margin 30pt 0

#choice > h2
  margin: 0 10pt 0 0
  cursor: pointer
  opacity: 0.3
  transform: scale(0.98)
  transition: transform 0.2s

#choice > h2:hover
  opacity: 0.5

#choice > h2 > small
  font-size: 0.8em
  font-weight: 300

#choice > .selected
  transform: scale(1)
  opacity: 1 !important

#intro
  margin: 20pt 0

#body
  flex: 1
  display: flex
  flex-direction: column

#form
  flex: 0.7
  display: flex

#box
  display: flex
  flex-direction: column
  margin-right: 50pt

.units
  display: flex
  align-self: flex-start
  margin 20pt 0

#fields
  display: flex
  flex-direction: column

.field
  margin: 4pt 0

.field > span:nth-of-type(1)
  display: inline-block
  width: 50pt

.field > span:nth-of-type(2)
  display: inline-block
  margin-left: 5pt

#hint
  color: red
  margin: 20pt 0 0 0
  text-align: center

#viewer
  display: flex
  flex-direction: column
  align-items: center

#item
  display: flex
  width: 100%

#itempic
  flex: 0.6
  margin-right: 10pt
  background-position: center
  background-repeat: no-repeat
  background-size: contain

#itemdescription
  flex: 1
  display: flex
  flex-direction: column

#itemdescription > span
  margin: 5pt 0

#itemname
  font-size: 1.1em

#itemn
  font-size: 1em

#itemn > b:nth-of-type(2)
  font-weight: 600

#power
  font-size: 0.9em

#powergreen
  color: #3BB30B

</style>
