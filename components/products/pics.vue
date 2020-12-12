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
  <section :id='$style.container'>
    <div v-for='(p, i) in pics' :key='p.fileLarge' :class='$style.icon' :style='{"background-image": `url(${require(`~/assets/img/${p.fileLarge}`)})`, opacity: n == i ? 1 : 0}' @click='toggleZoom'></div>
    <div v-if='!hideArrow && pics.length > 1' :id='$style.leftarrow' @click='previous'></div>
    <div v-if='!hideArrow && pics.length > 1' :id='$style.rightarrow' @click='next'></div>
    <portal v-if='showZoom' to='root'>
      <div :id='$style.fullscreen' @click='toggleZoom'>
        <div :id='$style.iconfullscreen' :style='{"background-image": `url(${require(`~/assets/img/${pics[n].fileFull}`)})`}'></div>
      </div>
    </portal>
  </section>
</template>

<script>
export default {
  props: ['pics', 'hideArrow',],
  data() {
    return {
      showZoom: false,
      zoomPic: '',
      n: 0,
    }
  },
  created() {
    if (process.server) return
    this.interval = setInterval(() => {
      this.$data.n = (this.$data.n+1) % this.$props.pics.length
    }, 3000)
  },
  destroyed() {
    if (this.interval) clearInterval(this.interval)
  },
  methods: {
    toggleZoom(url) {
      this.$data.zoomPic = url
      this.$data.showZoom = !this.$data.showZoom
    },
    next() {
      this.$data.n = (this.$data.n+1) % this.$props.pics.length
      if (this.interval) clearInterval(this.interval)
      this.interval = null
    },
    previous() {
      this.$data.n = (this.$data.n-1)
      if (this.$data.n < 0) this.$data.n = this.$props.pics.length-1
      if (this.interval) clearInterval(this.interval)
      this.interval = null
    },
  },

}
</script>

<style module lang=stylus>

#container
  position: relative
  width: 100%
  height: 100%
  cursor: pointer
  /*@media only screen and (max-width: 600px)
    margin: 20pt 0pt 20pt 0pt*/

.icon
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  transition: opacity 1s

#leftarrow, #rightarrow
  width: 30pt
  height: 30pt
  position: absolute
  top: calc(50% - 15pt)
  background-position: center
  background-size: contain
  background-repeat: no-repeat

#leftarrow
  left: 5pt
  background-image: url('~assets/img/leftarrow.png')

#rightarrow
  right: 5pt
  background-image: url('~assets/img/rightarrow.png')

#fullscreen
  position: fixed
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  display: flex
  align-items: center
  justify-content: center
  background-color: white

#iconfullscreen
  height: 90%
  width: 90%
  margin: 0 15pt 0 0
  background-position: center
  background-size: contain
  background-repeat: no-repeat

</style>
