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
    <div :id='$style.logo'>
      <Logo subtitle='Growbox Designer' />
    </div>
    <div :id='$style.body'>
      <h3 :id='$style.header'>
        Welcome to SuperGreenLab,<br />
        we sell all you need to grow at home, from bare lights, to complete and automous kits.
      </h3>
      <p>
        <b>SuperGreenLab</b> has designed the <b>perfect</b> growing setup for <b>modern growers</b>.
      </p>
      <p>
        While <b>producing a lot of lights</b> (up to 200-220 lumens per watts), our led panels produce <b>very little heat</b>, which make them perfect for your <b>stealthy grow project</b>.
      </p>
      <p>
        Whether you’re a beginner, intermediate or advance grower, <b>we have what you need</b>:)
      </p>
      <p>
        Also, one of our main concern is <b>your success</b>, we're offering free <b>top-notch real time support</b>.<br />
        You can <b>join the support</b> <a href='https://discord.gg/crdYzgy'>discord server</a> now, <b>feel free to ask your questions</b> here, we and the community will be <b>glad to help</b>:)
      </p>
      <h3>Our products tailored to your needs and budget:</h3>
      <IntroSectionBareLeds />
      <IntroSectionSolo />
      <IntroSectionContinuous />
    </div>
  </section>
</template>

<script>
import Logo from '~/components/logo.vue'
import IntroSectionBareLeds from '~/components/introsection-bareleds.vue'
import IntroSectionSolo from '~/components/introsection-solo.vue'
import IntroSectionContinuous from '~/components/introsection-continuous.vue'

export default {
  components: { Logo, IntroSectionBareLeds, IntroSectionSolo, IntroSectionContinuous, },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
  min-height: 100vh

#logo
  margin: 5pt
  font-size: 1.5em
  align-self: flex-start

#header
  padding: 50pt 20pt
  font-weight: 300
  text-align: center
  font-size: 1.5em

#body
  padding: 0 30pt 0 30pt
  width: 100%
  max-width: 800pt

#body > p
  margin: 10pt 0

#body > h3
  margin: 25pt 0

#separator
  background-color: #ACACAC
  height: 2pt

</style>
