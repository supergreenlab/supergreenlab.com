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
      <div :class='$style.yt' v-for='v in videos'>
        <div :class='$style.thumbnail'>
          <Thumbnail @click='clickVideo' @mouseover='hoverVideo(v.title)' :asset='v.icon' :url='v.link' />
        </div>
        <div :class='$style.text'>
          <a @click='clickLink(v.title)' :href='v.link' target='_blank'>
            <h2>{{ v.title }}</h2>
            <p>{{ v.description }}</p>
            <small>{{ v.link }}</small>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import Thumbnail from '~/components/home/thumbnail.vue'

export default {
  components: {SectionTitle, Thumbnail, },
  computed: {
    videos() {
      return [
        {
          title: 'How to build an Automated LED Grow Box',
          description: 'Using a swedish furniture and a ninja bundle from our shop you can easily get yourself a stealthy and cheap nano growbox for your personal need. The controller can also manage a second side box for vegging your next grow, so you can harvest every 2 months (depending which strain) instead of every 4 months (typical complete cycle duration).',
          icon: 'yt-thumbnail-automated-led-grow-box.jpg',
          link: 'https://www.youtube.com/watch?v=DXwtIjdDvHs',
        },
        {
          title: 'How to build the cheapest growbox ever',
          description: 'Thanks to the low heating led panels, you could even make a grow box out of a cardboard box. Cardboard actually has great properties when it comes to humidity and temperature. We\'ve done a few grows in various cardboard grow box designs, and it surprisingly ended up being one of the best and easiest way to get started.',
          icon: 'yt-thumbnail-cheapest-growbox-ever.jpg',
          link: 'https://www.youtube.com/watch?v=7cbxxOMGKCg',
        }
      ]
    }
  },
  methods: {
    hoverVideo(name) {
      this.$matomo.trackEvent('Homepage navigation', 'Homepage hover', 'Homepage Hover MoreFromYT Video', name)
    },
    clickVideo(name) {
      this.$matomo.trackEvent('Homepage navigation', 'Homepage click', 'Homepage Click MoreFromYT Thumbnail', name)
    },
    clickLink(name) {
      this.$matomo.trackEvent('Homepage navigation', 'Homepage click', 'Homepage Click MoreFromYT Link', name)
    }
  },
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
  @media only screen and (max-width: 600px)
    font-size: 1.1em

.text small
  text-decoration: underline

.text p
  margin: 5pt 0

.text a
  display: block
  text-decoration: none
  color: #454545

.thumbnail
  width: 250px
  height: 140px
  @media only screen and (max-width: 600px)
    width: 100%
    height: 200px
    margin: 10pt 0

</style>
