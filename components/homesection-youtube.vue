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
      <SectionTitle title='follow the guide to becoming'
                    green='a ninja grower'
                    title2='we publish guides on youtube'
                    smalltitle='and offer free 24/7/365 support'
                    separator='true'/>
    </div>
    <div :id='$style.body'>
      <div :class='$style.yt'>
        <h2>How to build an Automated LED Grow Box</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/DXwtIjdDvHs?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <nuxt-link  :id='$style.cta' :to='{path: "/", hash: "#micro-grow-bundle"}'>
          <b class="hvr-grow">Build yours now</b>
        </nuxt-link>
      </div>
      <div :class='$style.yt'>
        <h2>How to build the cheapest growbox ever</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/7cbxxOMGKCg?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <nuxt-link  :id='$style.cta' :to='{path: "/", hash: "#mono-box-bundle"}'>
          <b class="hvr-grow">Build yours now</b>
        </nuxt-link>
      </div>
      <h1></h1>
    </div>
  </section>
</template>

<script>
import SectionTitle from '~/components/sectiontitle.vue'

export default {
  components: {SectionTitle,},

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

.yt
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  flex-basis: 50%
  padding: 10pt
  @media only screen and (max-width: 600px)
    flex-basis: 100%

.yt > h2
  height: 50pt
  color: #717171
  margin: 10pt

.yt > iframe
  width: 560px
  height: 315px
  margin: 10pt 0 20pt 0
  @media only screen and (max-width: 600px)
    width: 100%

#cta
  display: flex
  flex-direction: column
  text-transform: uppercase
  color: white
  background-color: #3BB30B
  padding: 10pt 35pt
  border-radius: 3pt
  text-decoration: none
  text-align: center
  z-index: 100
  margin-bottom: 20pt
  font-size: 1.5em
  @media only screen and (max-width: 600px)
    font-size: 1.1em

#cta > small
  padding-top: 5pt
  font-weight: 300
  font-size: 1.1em

#cta > b
  font-weight: 600

</style>
