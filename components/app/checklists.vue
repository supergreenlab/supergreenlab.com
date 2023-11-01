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

    <GreenGallery :circle=true :items='[
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

    <AppSection :icon='require("~/assets/img/app/icon-growing-lessons.svg")'
                title='FREE GROWING **LESSONS**'
                subtitle='The SGL app comes with a free checklist tutoring system.
                The app will send you notifications when there is something you should know.'
                description='While the app allows your create your own perfect grow recipe with the checklist system, **we also provide ready-to-use checklist collections.**
                &nbsp;
                Usable for beginner and advanced growers, you will find checklist collections for all levels.
                &nbsp;
                From the simple **“Daily checks”** to more advanced use cases like **“How to grow organically”** or **“How to make feminized seeds”**, the checklist collections can be a life saver for your plant.' />

    <GreenGallery :items='[
      {
        pic: require("~/assets/img/app/pic-checklist-1.png"),
        title: "The right tips at the **right time**",
        subtitle: "No need to read all the how-to-grow guides anymore. The app monitors your activity in your diary and give you useful tips.",
      },
      {
        pic: require("~/assets/img/app/pic-checklist-2.png"),
        title: "Get answers **before you ask**",
        subtitle: "With all its pre-programmed checklist items, the app will be able to send you contextualized notifications based on your diary and environment metrics.",
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
