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
                    green='and stealthy builds'/>
    </div>
    <div :id='$style.video'>
      <iframe width="500" height="500" src="https://www.youtube.com/embed/-FM1Fq-HFvs?autoplay=1&loop=1&playlist=-FM1Fq-HFvs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
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

#title
  margin: 80pt 0 50pt 0

#video
  margin: 0 0 40pt 0

</style>
