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
      <SectionTitle title='SHIPPING RESUMED!'
                    green='Thank you all for your support!'
                    smalltitle="The loooooong wait is over! We're now shipping worlwide, 24h after you order."/>
    </div>
		<div :id='$style.carousel'>
			<agile autoplay pause-on-dots-hover :autoplay-speed="5000">
				<div :class='$style.pic' :style='{"background-image": `url(${require("~/assets/img/new-sgl-1.jpg")})`}'></div>
				<div :class='$style.pic' :style='{"background-image": `url(${require("~/assets/img/new-sgl-2.jpg")})`}'></div>
				<div :class='$style.pic' :style='{"background-image": `url(${require("~/assets/img/new-sgl-3.jpg")})`}'></div>
				<div :class='$style.pic' :style='{"background-image": `url(${require("~/assets/img/new-sgl-4.jpg")})`}'></div>
			</agile>
		</div>
	</section>
</template>

<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import Step from '~/components/home/step.vue'

export default {
  components: { SectionTitle, Step, },
  methods: {},
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center
  margin-bottom: 20pt

#title
  width: 100%
  margin: 0pt 0 50pt 0
  padding: 0 30pt

#carousel
  width: 100vw
  max-width: 530px

.pic
  width: 100vw
  max-width: 530px
  height: 100vw
  max-height: 530px
  background-position: bottom
  background-size: contain
  background-repeat: no-repeat

</style>
