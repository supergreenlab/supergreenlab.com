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
    <div :id='$style.title'>
      <SectionTitle title='Our bundles are'
                    green='all included'/>
    </div>
    <div :id='$style.steps'>
      <div :class='$style.step'>
        <Step n=1
              title='Best in class LEDs'
              text='While providing optimum lighting for <b>all stages of you plants</b>’ growth, they produce <b>very little heat</b>.<br />Which makes them perfect for all range of spaces. <b>Even the stealthiest</b>.'
              icon='light.svg' />
      </div>
      <div :class='$style.step'>
        <Step n=2
              title='Ventilation'
              text='All our kits <b>come with ventilation</b>, which ensures <b>heat and humidity</b> control, as well as <b>odor filtering</b>.'
              icon='ventilation.svg' />
      </div>
      <div :class='$style.step'>
        <Step n=3
              title='Sensors'
              text='Kits include a <b>temperature</b> and <b>humidity</b> sensor.<br /><b>Keep and eye</b> on your grow environment, even <b>when you’re not home</b> !'
              icon='sensor.svg' />
      </div>
      <div :class='$style.step'>
        <Step n=4
              title='Free app'
              text='<b>Monitoring</b>, <b>live view</b>, <b>fine-tuning</b>, the free companion app will <b>guide you to harvest</b> !'
              icon='app.svg' />
      </div>
    </div>
  </section>
</template>

<script>
import SectionTitle from '~/components/sectiontitle.vue'
import Step from '~/components/homesection-step.vue'

export default {
  components: { SectionTitle, Step, },
}

</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center

#steps
  display: flex
  align-items: center
  justify-content: space-around
  flex-wrap: wrap
  margin-bottom: 80pt

.step
  flex-basis: 40%
  margin-top: 20pt

</style>
