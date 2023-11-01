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
      <SectionTitle title='CHECKLISTS & **REMINDERS**'
                      center='true'
                      :border='true'/>
    </div>

    <AppSection :icon='require("~/assets/img/app/icon-checklists.svg")'
                title='CHECKLIST & **REMINDERS**'
                subtitle='Advanced reminder and checklist feature. Just like a real todo-list app, but dedicated to home-growers.'
                description='**Growing weed is a lot about not forgetting things.** That’s probably the most common cause of failure.
                &nbsp;
                The SGL app now integrates an advanced Checklist and Reminder system **that can monitor all aspects of your plant and its environment.**
                &nbsp;
                You can program you reminder with dates like any todo-list app, but you can also monitor your environment’s metrics and plant diary to trigger notifications just at the right time.' />

    <GreenGallery :items='[
      {
        pic: require("~/assets/img/app/pic-notification.png"),
        title: "**Reminder** notifications",
        subtitle: "Never forget anything with the reminder notifications.",
      },
      {
        pic: require("~/assets/img/app/pic-action-shortcut.png"),
        title: "**Action** shortcuts",
        subtitle: "Just tap the notification to enter a new watering entry.",
      },
    ]' />


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
