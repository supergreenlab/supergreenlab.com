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
      <SectionTitle title='ALL-IN-ONE **FEATURE** SET'
                      center='true'
                      :border='false'/>
    </div>
    <div :class='$style.title'>
      <SectionTitle title='REMOTE **CONTROL** & **MONITORING**'
                      center='true'
                      :border='true'/>
    </div>

    <AppSection :icon='require("~/assets/img/app/icon-remote-control.svg")'
                title='Control your **SGL bundle**'
                subtitle='**Remote control** your ventilation, schedules and lights independently.'
                description='Got a full bundle with LEDs and ventilation control? The app will give you full **remote control** of your setup.
                &nbsp;
                You already have your own lights and ventilation non-SGL setup? No worries the app also works with other non-SGL devices 👌' />

    <AppSection :icon='require("~/assets/img/app/icon-monitor.svg")'
                title='MONITOR YOUR **ENVIRONMENT**'
                subtitle='Setup your min and max values and **receive notifications when your metrics are out of range.**'
                description='All SGL products come with sensors for monitoring and alerts. The app will show you **live values** and **backward history**.
                &nbsp;
                Thanks to the Checklist System, the sensor values can also be used to trigger reminders and alerts!' />

    <GreenGallery 
      :circle=true
      :items='[
        {
          pic: require("~/assets/img/app/pic-remote-monitoring.png"),
          title: "Remote **monitoring**",
          subtitle: "Temperature, humidity, VPD, CO2 and Weight!",
        },
        {
          pic: require("~/assets/img/app/pic-remote-control.png"),
          title: "Remote **control**",
          subtitle: "Ventilation, light, schedule, everything is remotely controlled!",
        },
      ]' />

    <AppSection :icon='require("~/assets/img/app/icon-timelapse.svg")'
                title='REMOTE **CAMERA** AND DAILY **TIMELAPSES**'
                subtitle='Keep an eye on your grow and see how you plant reacts!'
                description='Surprisingly enough, **a timelapse camera might be the most useful sensor** in a grow room.
                &nbsp;
                See how your plant communicates how it feels through it’s movements.
                &nbsp;
                Early detect potential upcoming issues **before they become a problem** by receiving daily and weekly timelapses of your plant!' />

    <AppSection :icon='require("~/assets/img/app/pic-thirst-detection.png")'
                title='Thirst and anomaly **detection**'
                subtitle='SGL is working on the first camera based issue detection for cannabis plants.'
                description='**COMING SOON**: Thanks to the few millions timelapse frames SGL has accumulated thanks to its community, we’re able to make smart movement analysis.
                &nbsp;
                This research will lead to smart alerts based on how your plant moves throughout the day.' />


  </section>
</template>

<script>

import SectionTitle from '~/components/widgets/sectiontitle.vue'
import AppSection from '~/components/app/appsection.vue'
import GreenGallery from '~/components/app/greengallery.vue'

export default {
  components: {SectionTitle, AppSection, GreenGallery, },
}

</script>

<style module lang=stylus>

#container
  display: flex
  align-items: center
  flex-direction: column
  margin: 50px 0

.title
  font-family: Roboto
  width: 100%
  margin: 30pt 0 30pt 0
  @media only screen and (max-width: 600px)
    margin: 0

</style>
