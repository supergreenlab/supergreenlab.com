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
    <div :id='$style.title'>
      <SectionTitle title=''
                    green='- Spare parts -' />
    </div>
    <div :id='$style.body'>
      <div v-for='led in leds' :class='$style.led'>
        <Item :promodiscount='promodiscount' v-bind='led' />
      </div>
    </div>
  </section>
</template>

<script>
import SectionTitle from '~/components/sectiontitle.vue'
import Item from '~/components/homesection-sparepartsitem.vue'

export default {
  props: ['promodiscount',],
  components: {SectionTitle, Item,},
	computed: {
		leds() {
			return leds
		},
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center

#title
  width: 100%
  margin: 0pt 0 50pt 0

#body
  display: flex
  flex-wrap: wrap
  align-items: center
  justify-content: center

.led
  flex-basis: 33%
  padding: 20pt 30pt
  @media only screen and (max-width: 600px)
    flex-basis: 100%

</style>
