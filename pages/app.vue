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
    <div id='header_wrapper'>
      <div :id='$style.header'>
        <Header/>
      </div>
    </div>

    <div :id='$style.content'>
      <Top />

      <Menu />
      <div id='remote'></div>
      <Remote />
      <div id='devices'></div>
      <Devices />
      <div id='checklists'></div>
      <Checklists />
      <div id='diary'></div>
      <Diary />
  
      <div :class='$style.title'>
        <SectionTitle title='**AVAILABLE** ON:'
                      center='true'
                      :border='true'/>
      </div>

      <div :id='$style.install'>
        <Install />
      </div>


    </div>

    <Footer />
  </section>
</template>

<script>

import SectionTitle from '~/components/widgets/sectiontitle.vue'
import Header from '~/components/layout/header.vue'
import Top from '~/components/app/top.vue'
import Menu from '~/components/app/menu.vue'
import Remote from '~/components/app/remote.vue'
import Devices from '~/components/app/devices.vue'
import Diary from '~/components/app/diary.vue'
import Checklists from '~/components/app/checklists.vue'
import Footer from '~/components/layout/footer.vue'
import Install from '~/components/app/install.vue'

export default {
  components: { SectionTitle, Header, Top, Menu, Remote, Devices, Diary, Checklists, Footer, Install, },
  head() {
    return {
      title: 'SuperGreenApp - The best growing app: Remote control & monitoring, Checklists & reminders, pinlocked grow diary and community sharing.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Whether you’re new to growing and need help, or are an advance grower that want to experiment with advanced technics, the SuperGreenLab app can help.

          On top of it’s remote control and monitoring features, the SuperGreenLab app also features an advanced checklist/reminder system.

          By monitoring your diary and environment the app will give your notifications to never mess up your grow.`
        },
      ],
    }
  },
}

</script>

<style module lang=stylus>

#container
  display: flex
  width: 100vw
  flex-direction: column
  align-items: center
  margin-top: 60px
  color: #414141
  max-width: 100vw
  overflow-x: hidden

#container h1
  font-family: Roboto

#header
  position: fixed
  width: 100vw
  top: 0
  left: 0
  z-index: 1000

#content
  display: flex
  flex-direction: column
  align-items: center
  min-height: 100vh
  width: 100%

.title
  font-family: Roboto
  width: 100%
  margin: 30pt 0 30pt 0
  @media only screen and (max-width: 600px)
    margin: 0

#install
  margin: 50px 0 80px 0

</style>
