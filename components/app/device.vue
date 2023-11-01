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
    <div :id='$style.piccontainer'>
      <img :src='pic' />
    </div>
    <b>{{ name }}</b>
    <p v-html='$md.render(description)'></p>
  </section>
</template>

<script>

import SectionTitle from '~/components/widgets/sectiontitle.vue'

export default {
  props: [ 'pic', 'name', 'description', ],
  components: {},
}

</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  text-align: center

#container img
  width: 200px

#container > p
  max-width: 300px

#piccontainer
  display: flex
  flex-direction: column
  justify-content: flex-end
  height: 200px
  padding-bottom: 20px

</style>
