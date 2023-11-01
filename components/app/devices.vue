<!--
      Copyright (C) 2023  SuperGreenLab <towelie@supergreenlab.com>
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
    <div :class='$style.title'>
      <SectionTitle title='COMPATIBLE **DEVICES**'
                    smalltitle='( Optional )'
                    center='true'
                    :border='true'/>
    </div>

    <div :id='$style.devices'>
      <div :class='$style.device'>
        <Device :pic='require("~/assets/img/app/pic-controller.png")'
                    name='SGL Controller'
                    description='At the heart of all our bundles, the SGL controller offers remote control as well as remote monitoring. **Detachable screen coming soon!**' />
      </div>
      <div :class='$style.device'>
        <Device :pic='require("~/assets/img/app/pic-supergreentips.png")'
                    name='SGL Tips'
                    description='The SGL Tips device will allow to connect your environment to the SuperGreenApp **without the need for a complete SGL bundle.**' />
      </div>
      <div :class='$style.device'>
        <Device :pic='require("~/assets/img/app/pic-camera.png")'
                    name='Raspberry PI + camera'
                    description='The best way to see how your plant actually feels. Receive daily and weekly timelapses of your plant.' />
      </div>
      <div :class='$style.device'>
        <Device :pic='require("~/assets/img/app/pic-sensors.png")'
                    name='Sensors!'
                    description='The SGL controller and SGL Tips devices are compatible with **temperature, humidity, CO2 sensors**. But also weight, because it’s a great way to detect dryness of your soil' />
      </div>

    </div>
  </section>
</template>

<script>

import SectionTitle from '~/components/widgets/sectiontitle.vue'
import Device from '~/components/app/device.vue'

export default {
  components: {SectionTitle, Device, },
}

</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column

.title
  font-family: Roboto
  width: 100%
  margin: 30pt 0 10pt 0
  @media only screen and (max-width: 600px)
    margin: 0

#devices
  display: flex
  flex-wrap: wrap
  width: 100%
  max-width: 750px

.device
  flex-basis: 50%
  margin: 20px 0

</style>
