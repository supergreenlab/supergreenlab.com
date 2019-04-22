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
    <div :id='$style.body'>
      <div :id='$style.intro'>
        <h2>Growbox designer</h2>
        <p>
          We'll start by the main boxes.<br /><br />
            And then the veg box, which is optionnal, but allows to double the frequency of your harvests, so you can avoid having too much at once, but still have continuous supply.<br />
          You can easily have one veg box for two Main boxes.
        </p>
      </div>
      <Box i='1' />
      <Box i='2' enabled=false />
      <Box i='3' enabled=false />
    </div>
  </section>
</template>

<script>
import Logo from '~/components/logo.vue'
import Box from '~/components/box.vue'

export default {
  components: { Logo, Box, },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  min-height: 100vh

#logo
  margin: 5pt
  font-size: 1.2em
  align-self: start

#intro
  padding: 50pt 0
  font-weight: 300

#intro > h2
  margin: 40pt 0 40pt 0

#body
  padding: 0 30pt 0 30pt
  max-width: 600pt

</style>
