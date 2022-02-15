<!--
      Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
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
  <FullscreenPortal :onClose='onClose'>
    <div :id='$style.container' @click='onClick'>
      <div :id='$style.buttons'>
      </div>
      <div :id='$style.mediaviewer' ref='mediaviewer'>
        <MediaViewer :medias='medias' size='contain' :height='height' />
      </div>
      <div :id='$style.close' @click='onClose'></div>
    </div>
  </FullscreenPortal>
</template>

<script>
export default {
  props: ['medias', 'onClose',],
  data() {
    return {
      height: '500px',
    }
  },
  mounted() {
    setTimeout(() => {
      this.updateHeight()
    }, 0)
    this.interval = setInterval(this.updateHeight, 500)
  },
  destroyed() {
    clearInterval(this.interval)
  },
  methods: {
    updateHeight() {
      const height = this.$refs.mediaviewer.getBoundingClientRect().height
      this.$data.height = `${height-(this.$props.medias.length > 1 ? 20 : 5)}px`
    },
    onClick(e) {
      e.preventDefault()
      e.stopImmediatePropagation()
      return false
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  width: 100%
  height: 100%
  background-color: white
  padding: 20px
  border-radius: 5px

#mediaviewer
  flex: 1
  display: flex

#close
  position: absolute
  top: 10px
  right: 10px
  width: 40px
  height: 40px
  background-image: url('~/assets/img/icon_close.svg')
  background-size: contain
  background-position: center
  background-repeat: no-repeat
  cursor: pointer

</style>
