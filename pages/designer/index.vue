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
      <Logo subtitle='Growbox Designer' />
    </div>
    <div :id='$style.header'>
      Welcome to the grow box designer, this tool will help you pick the right bundle for the job.
    </div>
    <div :id='$style.body'>
      <h2>SuperGreenLab’s bundles</h2>
      <p>
        Our bundles allow you to build an automated growbox out of any furniture, or even a cardboard box!<br />
        They can adapt to wide variety of spaces and volumes, this page will help you pick the right one.
      </p>
      <h3>What's included in the kit:</h3>
      <BundleParts 
        image='controller.png'
        title='SuperGreenController v2.0'>
        <b>Features:</b><br />
        - Various pre-configured environment settings (veg/bloom/clones)<br />
        - Compatible with existing grow hardware, even from other manufacturers (LEDs, HPS, etc.)*<br />
        - 3x independent fan controllers for ventilation<br />
        - 3x sensor ports for remote monitoring and alerting<br />
        - 6 independent LED channels<br />
        - Wi-Fi Enabled for remote control.<br />
        - Automatic blower control (coming soon) for humidity and temperature.
      </BundleParts>
      <BundleParts 
        image='mobile.png'
        title='SuperGreenApp'>
        <b>Features:</b><br />
        - Shareable setup presets (so you know what worked on what strain, and share it)<br />
        - Liveview (separate hardware needed), allows to see problems
          coming before they happen through timelapses.<br />
        - Sensors output displayed as graphs (3 days of data)
          so you know what happened when you were asleep.<br />
        - Blower control (night and day schedules)<br />
        - Independent light controls<br />
        - Multi box display<br />
        - Veg and Bloom schedules pre-configured (night or day shift for electricity prices)
      </BundleParts>
      <BundleParts 
        image='sht21.png'
        title='SHT21 Temperature and humidity sensor'>
        All kits come with a SHT21 temperature and humidity sensor, to ensure a sensible growing environment.
        All values from the sensors are accessible from the app remotely
        (wifi connection required), and allows the system to send alerts when things go wrong.
      </BundleParts>
      <BundleParts 
        image='ventilation.png'
        title='Ventilation'>
        All kits come with 1x 24V 0.8A blower for filters, and 2x 24V CPU-fans, for boxes that
        don’t need a filter (ie veg boxes)
      </BundleParts>
      <BundleParts 
        image='power.png'
        title='Power Supply'>
        All kits come with the controller’s main power supply, which can power up to four SGB.36
        or two SGB.72 (the veg lights)*.<br />
        <br />
        All self-powered led panels also come with their own power supply, except the SGB.288
        that requires an external Meanwell driver that has to be purchased separately.<br />
        <small>(we’ll tell you which, and how to plug)</small>
      </BundleParts>
      <BundleParts 
        image='lights.png'
        title='Lights'>
        We have a whole product line of led panels, going from 36 to 288 leds,
        all equipped with Samsung lm301b leds.<br />
        <br />
        They’re all full spectrum, so they can all be used either for either veg or bloom.
        The smallest ones can be directly powered by the controller itself, no need to get an
        additional power supply.<br />
        <br />
        Medium (144 leds) are powered by a classic 24v power supply, that comes with it.
        The big ones (288 leds) are powered by classical meanwell drivers, that have to be purchased separately.
      </BundleParts>
      <div :id='$style.separator'></div>
      <p>
        These are just the included parts for all kits. Now you’ll need lights.<br />
        Lights are divided in two categories, vegetation lights and bloom lights.<br />
        They can both do veg and bloom, they are full-spectrum LEDs.<br />
        The main difference is that veg lights don’t require external power<br />
        and they can be plugged directly to your controller.<br />
      </p>
      <div :id='$style.designer'>
        <div :id='$style.boxes'>
          Alright, now let’s design your grow box!
          <nuxt-link :id='$style.cta' to='/designer/box'>start</nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/logo.vue'
import BundleParts from '~/components/bundleparts.vue'

export default {
  components: { Logo, BundleParts, },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
  min-height: 100vh

#logo
  margin: 5pt
  font-size: 1.5em
  align-self: flex-start

#header
  padding: 50pt 20pt
  font-weight: 300
  text-align: center
  font-size: 1.5em

#body
  padding: 0 30pt 0 30pt
  width: 100%
  max-width: 600pt

#body > p
  font-size: 0.9em
  margin: 10pt 0

#body > h3
  margin: 25pt 0

#separator
  background-color: #ACACAC
  height: 2pt

#designer
  margin: 40pt 0 20pt 0

#designer > h2
  margin: 20pt 0

#boxes
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  margin: 40pt 0 40pt 0

#cta
  display: flex
  flex-direction: column
  text-transform: uppercase
  color: white
  background-color: #3BB30B
  margin: 40pt 0
  padding: 5pt 35pt
  border-radius: 5pt
  text-decoration: none
  text-align: center
  font-size: 1.2em
  font-weight: 400

#cta:hover
  background-color: #2C800B

</style>
