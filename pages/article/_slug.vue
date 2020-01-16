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
    <div :id='$style.header'>
      <Header responsiveHide='true' />
    </div>
    <div :id='$style.body'>
      <div :id='$style.toptitle'>
        <SectionTitle title='Title'
                      green='Subtitle' />
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import Header from '~/components/header.vue'
import SectionTitle from '~/components/sectiontitle.vue'
import Footer from '~/components/homesection-footer.vue'

export default {
  components: { Header, SectionTitle, Footer, },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
  min-height: 100vh
  padding-top: 80pt
  @media only screen and (max-width: 600pt)
    padding-top: 30pt

#header
  position: fixed
  width: 100%
  top: 0 
  left: 0
  z-index: 1000

#body
  width: 100%
  max-width: 800pt

#top
  display: flex
  flex-direction: column
  align-items: center
  width: 100%

#toptitle
  font-size: 1.5em
  margin: 20pt 0
  background-color: rgba(255, 255, 255, 0.5)



</style>
