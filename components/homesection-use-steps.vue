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
      <SectionTitle title='Setting up a grow space'
                    green='Has never been easier'/>
    </div>
    <video :id='$style.video' autoplay loop>
      <source src="/intro.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video> 
    <div :id='$style.steps'>
      <div :class='$style.step'>
        <Step n=1
              title='Get any furniture'
              text='Any sizes and shapes, our bundles are designed to adapt to all furnitures.'
              icon='furniture.svg'
              :vertical=1 />
      </div>
      <div :class='$style.step'>
        <Step n=2
              title='Install our bundle'
              text='Easy to install and configure, let yourself guided.'
              icon='screw.svg'
              :vertical=true />
      </div>
      <div :class='$style.step'>
        <Step n=3
              title='Start growing'
              text='24/7 support, join the community !'
              icon='plant.svg'
              :vertical=true />
      </div>
    </div>
  </section>
</template>

<script>
import SectionTitle from '~/components/sectiontitle.vue'
import Step from '~/components/homesection-step.vue'

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
  min-height: 100vh

#title
  margin: 0pt 0 50pt 0

#video
  height: 100%
  max-height: 600px
  width: 100%
  max-width: 800px
  margin: 0 0 40pt 0

#steps
  display: flex
  align-items: center
  justify-content: space-around
  margin: 0 40pt

.step
  flex-basis: 25%

</style>
