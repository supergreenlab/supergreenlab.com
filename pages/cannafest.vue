<!--
      Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
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
    <Header responsiveHide='true' />
    <iframe class="airtable-embed" src="https://airtable.com/embed/shr6sLd8wRKIf9nO7?backgroundColor=green" frameborder="0" onmousewheel="" width="100%" height="100%" style="background: transparent; margin: 10pt"></iframe>
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'

export default {
  components: { Header, },
  head() {
    return {
      title: 'SuperGreenLab X Cannafest',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Cannafest giveaway special:)'
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
  height: 100vh
  flex-direction: column
  justify-content: center
  align-items: center

#typeform
  width: 100%
  height: 100%

</style>
