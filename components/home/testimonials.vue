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
      <SectionTitle title='Join the community'
                    green='of happy growers'
                    separator='true'/>
    </div>
    <div :id='$style.steps'>
      <div :class='$style.step'>
        <Step title='gmamazgoodies'
              text="<i>&quot;Best of luck to all of your future endeavors. If it wasn't for your SGL Board my homegrown wouldn't be this successful.&quot;</i>"
              icon='gmamazgoodies.jpg'
              :center=1
              :vertical=true
              :nohorizontal=true
              textheight='140pt'/>
      </div>
      <div :class='$style.step'>
        <Step title='yung_gravity'
              text='<i>&quot;These lights put off a huge punch, with hardly any heat at all, my plants Love the spectrums..  this is an easy all on one set up - with the best customer service hands down. You cant go wrong:) and i have one of every product!&quot;</i>'
              icon='yung.jpg'
              :center=1
              :vertical=true
              :nohorizontal=true
              textheight='170pt'  />
      </div>
      <div :class='$style.step'>
        <Step title='sawyer_grow'
              text="<i>&quot;Been using the product for months now and keep being surprise.
              I have been growing for long time but i'm doing some micro grow since few months and the LED results and capabilities are amazing. Great product and great team and a strong community.&quot;</i>"
              icon='sawyer_grow.jpg'
              :center=1
              :vertical=true
              :nohorizontal=true
              textheight='140pt'  />
      </div>
    </div>
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

#steps
  display: flex
  align-items: center
  justify-content: space-around
  margin: 0 40pt 30pt 40pt
  max-width: 900pt
  @media only screen and (max-width: 600px)
    flex-direction: column

.step
  flex-basis: 25%
  @media only screen and (max-width: 600px)
    margin-bottom: 20pt

</style>
