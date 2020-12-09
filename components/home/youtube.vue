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
      <h2>More from our Youtube channel</h2>
    </div>
    <div :id='$style.body'>
      <div :class='$style.yt'>
        <div :class='$style.thumbnail' :style='{"background-image": `url(${require("~/assets/img/yt-thumbnail-automated-led-grow-box.jpg")})`}'><img src='~assets/img/youtube-play.png' /><a href='https://www.youtube.com/watch?v=DXwtIjdDvHs' target='_blank'></a></div>
        <div :class='$style.text'>
          <h2>How to build an Automated LED Grow Box</h2>
          <p>Using a swedish furniture and a ninja bundle from our shop you can easily get yourself a stealthy and cheap nano growbox for your personal need. The controller can also manage a second side box for vegging your next grow, so you can harvest every 2 months (depending which strain) instead of every 4 months (typical complete cycle duration).</p>
        </div>
      </div>
      <div :class='$style.yt'>
        <div :class='$style.thumbnail' :style='{"background-image": `url(${require("~/assets/img/yt-thumbnail-cheapest-growbox-ever.jpg")})`}'><img src='~assets/img/youtube-play.png' /><a href='https://www.youtube.com/watch?v=7cbxxOMGKCg' target='_blank'></a></div>
        <div :class='$style.text'>
          <h2>How to build the cheapest growbox ever</h2>
          <p>Thanks to the low heating led panels, you could even make a grow box out of a cardboard box. Cardboard actually has great properties when it comes to humidity and temperature. We've done a few grows in various cardboard grow box designs, and it surprisingly ended up being one of the best and easiest way to get started.</p>
        </div>
      </div>
      <h1></h1>
    </div>
  </section>
</template>

<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'

export default {
  components: {SectionTitle,},

}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  align-items: center
  justify-content: center
  color: #454545

#title
  margin: 10pt 0 20pt 0

#body
  display: flex
  align-items: center
  width: 100%
  max-width: 900pt
  @media only screen and (max-width: 600px)
    flex-direction: column

.yt
  display: flex
  width: 100%
  padding: 10pt
  @media only screen and (max-width: 600px)
    align-items: center
    justify-content: center
    flex-direction: column

.text
  display: flex
  flex: 1
  flex-direction: column
  align-items: space-between
  padding: 0 10pt

.text h2
  margin-bottom: 5pt
  @media only screen and (max-width: 600px)
    font-size: 1.1em

.thumbnail
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 250px
  height: 140px
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  @media only screen and (max-width: 600px)
    width: 210px
    height: 120px
    margin: 10pt 0

.thumbnail > img
  transition: opacity 0.2s
  @media only screen and (max-width: 600px)
    max-width: 25%

.thumbnail:hover > img
  opacity: 90%

.thumbnail > a
  display: block
  position: absolute
  width: 100%
  height: 100%

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
