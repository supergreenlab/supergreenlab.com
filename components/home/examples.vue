<!--
      Copyright (C) 2020  SuperGreenLab <towelie@supergreenlab.com>
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
  <section v-touch:swipe='handleSwipe' :id='$style.container' ref="swiper" @swipe="handleSwipe">
    <div :id='$style.intro'>
      Checkout some of the amazing builds <b>made by the community</b>.
      From the fanciest to the cheapest, going through the most functional ones.
      All those builds have been made by our <b>community of hundreds of creative growers</b>.<br /><br />
      <b>Ordering a bundle</b> unlocks access to all those amazing individuals <b>willing to help</b> each other in the comfort of our <b>private discord server.</b>
      <h2>Join us now!</h2>
    </div>
    <div :id='$style.examples'>
      <div :class='$style.examplepair' :style='{"opacity": i == n ? 1 : 0}' v-for='(pair, i) in builds'>
        <div :class='$style.example' v-for='b in pair'>
          <video :class='$style.video' autoplay loop playsinline muted defaultMuted>
            <source :src='require(`~/assets/img/${b.video}`)' type="video/mp4">
            Your browser does not support the video tag.
          </video> 
          <div :class='$style.text'>
            <h2>{{ b.title }}</h2>
            <p>{{ b.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div :id='$style.pagination'>
      <div :class='$style.page' v-for='(p, i) in builds' @click='setPage(i)' :id='i == n ? $style.selected : ""'></div>
    </div>
  </section>
</template>

<script>
import { addEventListener, removeEventListener, innerWidth } from '~/lib/client-side.js'

export default {
  data() {
    return {
      n: 0,
      windowWidth: innerWidth(),
    }
  },
  created() {
    if (process.server) return
    this.interval = setInterval(() => {
      this.$data.n = (this.$data.n + 1) % this.builds.length
    }, 10000)
  },
  mounted() {
    this.$nextTick(() => {
      addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy() {
    removeEventListener('resize', this.onResize)
    if (this.interval) clearInterval(this.interval)
  },
  methods: {
    onResize() {
      this.$data.windowWidth = innerWidth()
      this.$data.n = this.$data.n % this.builds.length
    },
    setPage(n) {
      n = (n < 0 ? this.builds.length-1 : n) % this.builds.length
      this.$data.n = n
      if (this.interval) clearInterval(this.interval)
    },
    handleSwipe(e) {
      if (e == 'left') {
        this.setPage(this.$data.n + 1)
      } else if (e == 'right') {
        this.setPage(this.$data.n - 1)
      }
    }
  },
  computed: {
    builds() {
      const builds = [
        {
          title: 'The perfect "Work-from-home" setup to survive quarantine',
          video: 'deskfoot-squarred.mp4',
          description: 'From a discreet swedish cabinet under your desk with it’s second chamber above for a simple perpetual setup 🌿🌲'
        },
        {
          title: 'How fancy do you want your growbox?',
          video: 'fancy-squarred.mp4',
          description: 'Yes, even your family heirloom secretary desk can be given a second life and transformed into a connected growbox. True story! This growbox wins the 2020 SGL design&style award 🏅'
        },
        {
          title: 'Efficiency at it\'s finest',
          video: 'closet-squarred.mp4',
          description: 'To a full-sized wardrobe perpetual harvest setup This guy blew our minds btw, he got 1.614g/w (77g or 2.7oz with only 48w for bloom) 🤯',
        },
        {
          title: 'What.. I don\'t even..',
          video: 'tot-squarred.mp4',
          description: 'Really anything can be a growbox; take this super simple plastic tote that doesn’t take up much space - boom! You can get up to 50g of homegrown 🥦 each harvest!',
        },
      ]
      if (this.$data.windowWidth > 900) {
        return builds.reduce((acc, v, i, arr) => {
          if (i % 2 === 0)
            acc.push(arr.slice(i, i + 2));
          return acc;
        }, []);
      }
      return builds.map(b => [b])
    }
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  width: 100%
  color: #454545

#examples
  display: flex
  position: relative
  top: 30pt
  width: 100%
  max-width: 900pt
  height: 200pt
  @media only screen and (max-width: 900px)
    height: 300pt
 
.examplepair
  display: flex
  position: absolute
  width: 100%
  transition: opacity 0.9s

.example
  display: flex
  flex: 0.5
  margin: 5pt
  @media only screen and (max-width: 900px)
    flex: 1
    align-items: center
    flex-direction: column

.video
  width: 200pt
  height: 200pt
  @media only screen and (max-width: 900px)
    margin: 0 0 10pt 0

.text
  display: flex
  flex-direction: column
  margin: 0 10pt

.text h2
  font-family: Roboto
  margin-bottom: 10pt
  text-transform: uppercase

#pagination
  display: flex
  margin: 60pt 0 0 0
  
.page
  width: 9pt
  height: 9pt
  margin: 0 2.5pt
  border-radius: 4.5pt
  background-color: #dedede
  transition: background-color 0.2s
  cursor: pointer

#selected
  background-color: #ababab

#intro
  text-align: center
  width: 100%
  max-width: 500pt
  padding: 0 20pt

#intro b
  color: #3bb30b

#intro h2
  margin: 10pt 0 0 0
  color: #3bb30b

</style>
