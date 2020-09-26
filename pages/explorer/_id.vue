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
  <section :id="$style.container">
    <div id='header_wrapper'>
      <div :id='$style.header'>
        <Header responsiveHide='true' />
      </div>
    </div>
    <div :id='$style.body'>
      <div>
        <h4>Redirecting to the public plant..</h4>
      </div>
    </div>
  </section>
</template>

<script>
import Header from '~/components/header.vue'

export default {
  components: {Header,},
  mounted() {
    setTimeout(() => {
      const { id } = this.$route.params
      document.location.href = `sglapp://supergreenlab.com/public/plant?id=${id}`
    }, 1000)
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column

#header
  position: fixed
  width: 100%
  top: 0 
  left: 0
  z-index: 1000

#body
  display: flex
  flex: 1
  top: 0
  left: 0
  position: absolute
  width: 100vw
  height: 100vh
  align-items: center
  justify-content: center
  text-align: center

</style>
