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

      <Remote />
      <Devices />
      <Checklists />
      <Diary />
  
    </div>

    <Footer />
  </section>
</template>

<script>

import Header from '~/components/layout/header.vue'
import Top from '~/components/app/top.vue'
import Remote from '~/components/app/remote.vue'
import Devices from '~/components/app/devices.vue'
import Diary from '~/components/app/diary.vue'
import Checklists from '~/components/app/checklists.vue'
import Footer from '~/components/layout/footer.vue'

export default {
  components: {Header, Top, Remote, Devices, Diary, Checklists, Footer},
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

</style>
