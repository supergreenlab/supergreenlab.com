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
      <SectionTitle title='**GROW** DIARY'
                      center='true'
                      :border='true'/>
    </div>

    <AppSection :icon='require("~/assets/img/app/icon-diary.svg")'
                title='PIN-LOCKED GROW **DIARY**'
                subtitle='Keep track of your past grows to make sure you get better results each times.'
                description='The app comes with a its own **diary features**, you can keep track of your lights and ventilation settings change throughout your grow for future reference.
                &nbsp;
                Keep track of your waterings and the nutrient mix you did.
                &nbsp;
                You can also **take notes and pictures** of the different steps and actions you took.The app has dedicated diary cards for various training actions, like defoliation, bending, topping etc...
                &nbsp;
                The app will also keep track of the current phase of your plant, whether it’s in veg or bloom etc... and for how long.
                &nbsp;
                **And of course the app can be pinlocked 🔒**' />

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
  flex-direction: column

.title
  font-family: Roboto
  width: 100%
  margin: 30pt 0 30pt 0
  @media only screen and (max-width: 600px)
    margin: 0

</style>
