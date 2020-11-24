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
      <SectionTitle title='Introducing more flexible'
                    green='and aesthetic builds'
                    separator='true'/>
    </div>
    <video :id='$style.video' autoplay loop playsinline muted defaultMuted>
      <source src="/stealth.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video> 
  </section>
</template>

<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import Step from '~/components/home/step.vue'

export default {
  components: { SectionTitle, Step, },
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

#video
  height: 100%
  max-height: 600px
  max-width: 600px
  margin: 0 0 40pt 0
  @media only screen and (max-width: 600pt)
    width: 100%
  @media only screen and (min-width: 600pt)
    box-shadow: -1px 1px 5px #888

</style>
