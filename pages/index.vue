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
      <div id='top'></div>
      <Top />
      <div :class='$style.separator'></div>
      <UseSteps />
      <div :class='$style.separator'></div>
      <Stealth />
      <div :class='$style.separator'></div>
      <BundleIntro />
      <div :class='$style.separator'></div>
      <div :id='$style.shop'></div>
      <div :id='$style.title'>
        <SectionTitle title='Welcome to the shop'
                      green='Checkout our bundles'/>
      </div>
      <div id='mono'></div>
      <Bundle
        title='MONO BOX BUNDLE'
        subtitle='192 leds, 1 controller'
        icon='tvstand.png'
        :bullets='[
          "Perfect kit for <b>first-timers</b> or <b>small setups</b>.",
          "<b>Easy setup</b> with just one <b>all-in-one</b> led panel",
          "Harvest every <b>3 months</b>",
          "Can fit from a <b>nightstand</b> to a <b>small wardrobe</b>",
          "<b>all included</b>: power supply, sensor and ventilation",
        ]'
        url='https://shop.supergreenlab.com/pages/loading-cart#29107264880688:1'
        price='$249'
        bigleds='1'
        smallleds='0'
        tinyleds='0'
        ventilation='1'
        sensor='1'
        />
      <div :class='$style.separator'></div>
      <div id='multi'></div>
      <Bundle
        title='MULTI BOX BUNDLE'
        subtitle='Harvests come twice faster !'
        icon='office.png'
        :bullets='[
          "Start the <b>next batch</b> before end of bloom",
          "<b>Easy setup</b> with just <b>two all-in-one led</b> panel",
          "Harvest every <b>1 and 1/2 months</b>",
          "Can fit from a <b>nightstand</b> to a <b>small wardrobe</b>",
          "<b>all included</b>: power supply, sensor and ventilation",
        ]'
        url='https://shop.supergreenlab.com/pages/loading-cart#29107272089648:1'
        price='$349'
        :right=1
        bigleds='1'
        smallleds='0'
        tinyleds='2'
        ventilation='2'
        sensor='2'
        />
      <div :class='$style.separator'></div>
      <div id='closet'></div>
      <Bundle
        title='CLOSET BUNDLE'
        subtitle='Grow huge plants, harvest often'
        icon='dombas.png'
        :bullets='[
          "<b>High efficiency</b> setup",
          "<b>Harvest up to every 3 weeks</b>",
          "from a <b>wardrobe</b> to a <b>closet</b>",
          "<b>all included</b>: power supply, sensor and ventilation",
        ]'
        url='https://shop.supergreenlab.com/pages/loading-cart#29107330154544:1'
        price='$599'
        bigleds='2'
        smallleds='2'
        tinyleds='0'
        ventilation='2'
        sensor='2'
        />
      <div :class='$style.separator'></div>
      <div id='micro'></div>
      <Bundle
        title='MICRO GROW BUNDLE'
        subtitle='6 tiny led panels for canna scientists'
        icon='triforce.png'
        :bullets='[
          "Perfect kit for <b>experimenters</b> and <b>breeders</b>",
          "<b>6 tiny led panels</b> for 0 limitations",
          "Can fit from a <b>nightstand</b> to a <b>shoebox</b>",
          "<b>all included</b>: power supply, sensor and ventilation",
        ]'
        url='https://shop.supergreenlab.com/pages/loading-cart#29107273826352:1'
        price='$299'
        :right=1
        bigleds='0'
        smallleds='0'
        tinyleds='6'
        ventilation='1'
        sensor='1'
        />
    </div>
    <Footer />
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
import Footer from '~/components/homesection-footer.vue'

export default {
  components: { Header, SectionTitle, Top, UseSteps, Stealth, BundleIntro, Bundle, Footer, },
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
  width: 100%
  max-width: 900pt

#title
  margin: 20pt 0 20pt 0

.separator
  height: 2pt
  margin: 30pt 0
  background-color: #efefef

#shop
  height: 150pt
  background-image: url('~assets/img/shop.svg')
  background-position: center
  background-repeat: no-repeat
  background-size: contain

</style>
