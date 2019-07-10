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
    <div :id='$style.header'>
      <Header />
    </div>
    <div :id='$style.body'>
      <Top />
      <UseSteps />
      <Stealth />
      <BundleIntro />
      <div :id='$style.title'>
        <SectionTitle title='And come in all'
                      green='shapes and size'/>
      </div>
      <Bundle
        title='SOLO BOX KIT'
        icon='tvstand.png'
        :bullets='[
          "Perfect kit for <b>first-timers</b> or <b>small setups</b>.",
          "<b>Easy setup</b> with just one <b>all-in-one</b> led panel",
          "Harvest every <b>3 months</b>",
          "Can fit from a <b>nightstand</b> to a <b>small wardrobe</b>",
          "<b>all included</b>: power supply, sensor and ventilation",
        ]'
        price='$199'
        />
      <Bundle
        title='MULTI BOX KIT'
        icon='office.png'
        :bullets='[
          "Start the <b>next batch</b> before end of bloom",
          "<b>Easy setup</b> with just <b>two all-in-one led</b> panel",
          "Harvest every <b>1 and 1/2 months</b>",
          "Can fit from a <b>nightstand</b> to a <b>small wardrobe</b>",
          "<b>all included</b>: power supply, sensor and ventilation",
        ]'
        price='$249'
        :right=1
        />
      <Bundle
        title='GROW ROOM KIT'
        icon='dombas.png'
        :bullets='[
          "<b>High efficiency</b> setup",
          "<b>Harvest up to every 3 weeks</b>",
          "from a <b>wardrobe</b> to a <b>closet</b>",
          "<b>all included</b>: power supply, sensor and ventilation",
        ]'
        price='$400'
        />
      <Bundle
        title='MICRO GROW KIT'
        icon='triforce.png'
        :bullets='[
          "Perfect kit for <b>experimenters</b> and <b>breeders</b>",
          "<b>6 tiny led panels</b> for 0 limitations",
          "Can fit from a <b>nightstand</b> to a <b>shoebox</b>",
          "<b>all included</b>: power supply, sensor and ventilation",
        ]'
        price='$249'
        :right=1
        />
    </div>
  </section>
</template>

<script>
import Header from '~/components/header.vue'
import Top from '~/components/homesection-top.vue'
import UseSteps from '~/components/homesection-use-steps.vue'
import Stealth from '~/components/homesection-stealth-build.vue'
import BundleIntro from '~/components/homesection-bundle-intro.vue'
import Bundle from '~/components/homesection-bundle.vue'
import SectionTitle from '~/components/sectiontitle.vue'

export default {
  components: { Header, SectionTitle, Top, UseSteps, Stealth, BundleIntro, Bundle, },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center

#header
  position: fixed
  width: 100%
  top: 0 
  left: 0
  z-index: 1000

#body
  max-width: 900pt

#title
  margin: 20pt 0 50pt 0

</style>
