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
                description='Got a full bundle with LEDs and ventilation control? The app will give you full **remote control** of your setup.
&nbsp;
    You already have your own lights and ventilation non-SGL setup? No worries the app also works with other non-SGL devices 👌'
                subtitle='**Remote control** your ventilation, schedules and lights independently.'/>
  </section>
</template>

<script>

import SectionTitle from '~/components/widgets/sectiontitle.vue'
import AppSection from '~/components/app/appsection.vue'

export default {
  components: {SectionTitle, AppSection, },
}

</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  margin: 50px 0

.title
  font-family: Roboto
  width: 100%
  margin: 30pt 0 30pt 0
  @media only screen and (max-width: 600px)
    margin: 0

</style>
