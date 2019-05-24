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
      <div :id='$style.choice' v-if='controller'>
        <CheckBox :color='box.main ? "#3AB20B" : "#C4C4C4"' :checked='box.main' v-on:click='switchbox(true)' /><h2 v-on:click='switchbox(true)' :class='box.main ? $style.selected : ""'>Main box</h2>
        <CheckBox v-if='nVegBoxes == 0' :color='!box.main ? "#3AB20B" : "#C4C4C4"' :checked='!box.main' v-on:click='switchbox(false)' /><h2 v-if='nVegBoxes == 0' v-on:click='switchbox(false)' :class='!box.main ? $style.selected : ""'>Veg box <small>(optional)</small></h2>
      </div>
      <div :id='$style.choice' v-else>
        <h2 :class='$style.selected'>Main box</h2>
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
            <h4 :id='$style.title'>Enter the dimensions of your box</h4>
            <div :class='$style.units'>
              <CheckBox :color='unit == "metric" ? "#3AB20B" : "#C4C4C4"' label='Metric' :checked='unit == "metric"' v-on:click='setUnit("metric")' />
              <CheckBox :color='unit == "imperial" ? "#3AB20B" : "#C4C4C4"' label='Imperial' :checked='unit == "imperial"' v-on:click='setUnit("imperial")' />
            </div>
            <div :id='$style.fields'>
              <div :class='$style.field'>
                <span>Width: </span><input type='text' v-model='width' /><span>{{ unit == 'metric' ? "cm" : "in" }}</span>
                <p :class='$style.error' v-if='width && !(/^\d+$/.test(width))'>enter a valid number</p>
              </div>
              <div :class='$style.field + " " + (!box.main ? $style.disabled : "")'>
                <span>Height: </span><input :disabled='!box.main' type='text' v-model='height' /><span>{{ unit == 'metric' ? "cm" : "in" }}</span>
                <p :class='$style.error' v-if='height && !(/^\d+$/.test(height))'>enter a valid number</p>
                <p v-if='!box.main' :id='$style.vegdisclaimer'>Veg boxes have there lights on top</p>
              </div>
              <div :class='$style.field'>
                <span>Depth: </span><input type='text' v-model='depth' /><span>{{ unit == 'metric' ? "cm" : "in" }}</span>
                <p :class='$style.error' v-if='depth && !(/^\d+$/.test(depth))'>enter a valid number</p>
              </div>
            </div>
            <h4 :id='$style.title'>Type of scrogging</h4>
            <div :class='$style.units'>
              <CheckBox :color='scrog == "horizontal" ? "#3AB20B" : "#C4C4C4"' label='Horizontal' :checked='scrog == "horizontal"' v-on:click='setScrog("horizontal")' />
              <CheckBox :color='scrog == "vertical" ? "#3AB20B" : "#C4C4C4"' label='Vertical' :checked='scrog == "vertical"' v-on:click='setScrog("vertical")' />
              <CheckBox :color='scrog == "" ? "#3AB20B" : "#C4C4C4"' label='No idea' :checked='scrog == ""' v-on:click='setScrog("")' nomarginright='true' />
            </div>
          </div>
          <div v-if='leds.length' :id='$style.viewer'>
            <h4 :id='$style.title'>Choose your light</h4>
            <div :class='$style.units'>
              <CheckBox color='white' label='White' :checked='box.color == "white"' v-on:click='setColor("white")' />
              <CheckBox color='black' label='Black' :checked='box.color == "black"' v-on:click='setColor("black")' />
            </div>
            <div :id='$style.leds' v-for='(led, i) in leds'>
              <div :id='$style.led'>
                <CheckBox color='#c4c4c4' :checked='box.leds && led.name == box.leds.name' v-on:click='setLeds(led)' />
                <Item
                  :icon='led.icons[box.color]'
                  :name='led.name'
                  :n='Math.floor(led.n)'
                  :total='`$${Math.round(led.price * Math.floor(led.n) * 100) / 100}`'>
                  {{ led.scrog }}
                  <span  v-if='led.power == "external"' :id='$style.power'>
                    Power included<br />
                    <span :id='$style.powergreen'>No seperate driver needed</span>
                    <span v-if='led.power == "mw"' :id='$style.powerred'>Seperate driver needed</span>
                  </span>
                  <span  v-if='led.power == "mw"' :id='$style.power'>
                    Power <b>NOT</b> included<br />
                    <span :id='$style.powerred'>Seperate driver needed</span>
                  </span>
                  <span :id='$style.shipping'>
                    SHIPPING SUMMER 2019
                  </span>
                </Item>
              </div>
              <h2 v-if='i != leds.length - 1'>OR</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nuxt-link to='/designer/box' :id='$style.cta' :class='box.leds == null ? $style.disabled : $style.enabled' href='javascript:void(0)'>{{ box.leds ? "Save" : "Cancel" }}</nuxt-link>
  </section>
</template>

<script>
import Logo from '~/components/logo.vue'
import CheckBox from '~/components/checkbox.vue'
import Item from '~/components/item.vue'

export default {
  components: { Logo, CheckBox, Item, },
  data() {
    return {
      scrog: '',
    }
  },
  computed: {
    controller() {
      return this.$store.state.boxes.controller
    },
    width: {
      get() {
        return this.box.width
      },
      set(width) {
        this.$store.commit('boxes/update', {i: this.i, obj: {width}})
      },
    },
    height: {
      get() {
        return this.box.height
      },
      set(height) {
        this.$store.commit('boxes/update', {i: this.i, obj: {height}})
      },
    },
    depth: {
      get() {
        return this.box.depth
      },
      set(depth) {
        this.$store.commit('boxes/update', {i: this.i, obj: {depth}})
      },
    },
    box() {
      return this.$store.getters['boxes/getBox'](this.i)
    },
    unit() {
      return this.$store.state.boxes.unit
    },
    i() {
      return this.$route.params.id - 1
    },
    nVegBoxes() {
      return this.$store.getters['boxes/nBoxes'](false)
    },
    leds() {
      let conv = 1.0
      if (this.unit == 'imperial') conv = 2.54
      return this.$store.getters['shop/getLedsToFit'](this.box.main, this.box.width * conv, this.box.height * conv, this.box.depth * conv, this.$data.scrog)
    },
  },
  methods: {
    switchbox(main) {
      this.$store.commit('boxes/update', {i: this.i, obj: {main, leds: null}})
    },
    setLeds(leds) {
      this.$store.commit('boxes/update', {i: this.i, obj: {leds}})
    },
    setColor(color) {
      this.$store.commit('boxes/update', {i: this.i, obj: {color}})
    },
    setUnit(unit) {
      this.$store.commit('boxes/unit', {unit})
    },
    setScrog(scrog) {
      this.$data.scrog = scrog
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
  padding: 0 30pt
  @media only screen and (max-width: 500px)
    padding: 0 10pt

#logo
  margin: 5pt
  font-size: 1.5em
  align-self: flex-start

#title
  align-self: flex-start
  margin-top: 10pt

#choice
  display: flex
  margin 50pt 0 10pt 0

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
  margin: 0 10pt
  width: 100%
  max-width: 600pt

#form
  flex: 0.7
  display: flex
  @media only screen and (max-width: 800px)
    flex: 1
    flex-direction: column

#box
  display: flex
  flex-direction: column
  margin-right: 50pt
  flex: 0.9

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
  width: 10pt

#hint
  color: red
  margin: 20pt 0 0 0
  text-align: center

#viewer
  display: flex
  flex-direction: column
  align-items: center
  flex: 1

#leds
  width: 100%

#led
  display: flex
  width: 100%

#power
  font-size: 0.9em

#powergreen
  color: #3BB30B

#powerred
  color: #EA1E1E

#vegdisclaimer
  font-size: 0.7em

.error
  color: red
  font-size: 0.8em
  text-align: right

#cta
  display: flex
  flex-direction: column
  text-transform: uppercase
  color: white
  margin: 40pt 0
  padding: 5pt 35pt
  border-radius: 3pt
  text-decoration: none
  text-align: center
  font-size: 1.2em
  font-weight: 400
  align-self: center

#cta.enabled
  background-color: #3BB30B

#cta.enabled:hover
  background-color: #2C800B
  
.disabled
  opacity: 0.4

#cta.disabled
  background-color: #c4c4c4

@keyframes blinker {
  50% {
    opacity: 0.4;
  }
}

#shipping
  color: #2C800B
  font-size: 0.8em
  font-weight: 600
  animation: blinker 1s linear infinite;

</style>
