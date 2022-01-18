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
  <section :id='$style.container' @click='close'>
    <div :id='$style.popup' @click='cancelClick'>
      <div :id='$style.close' @click='close'>X</div>
      <div :id='$style.body'>
        <BlockGuide location='popup' />
      </div>
    </div>
  </section>
</template>

<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import BlockGuide from '~/components/home/blockguide.vue'

export default {
  props: ['onClose',],
  data() {
    return {
      showTypeForm: false,
    }
  },
  head: {
    bodyAttrs: {
      class: 'noscroll'
    }
  },
  components: { SectionTitle, BlockGuide, },
  created() {
    this.$analytics.trackEvent('guidepopup', 'shown')
  },
  methods: {
    close() {
      this.$props.onClose()
      this.$analytics.trackEvent('guidepopup', 'close')
    },
    cancelClick(e) {
      e.stopPropagation()
    },
    showChat(e) {
      $crisp.push(["set", "session:event", ["show_chat"]])
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  position: fixed
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  background-color: rgba(255, 255, 255, 0.5)
  z-index: 10000
  @media only screen and (min-width: 1400px)
    align-items: center
    justify-content: center

#popup
  display: flex
  position: relative
  flex-direction: column
  align-items: center
  justify-content: center
  background-color: white
  padding: 30pt 60pt 10pt 60pt
  border-radius: 5pt
  border: 4pt solid #3BB30B
  @media only screen and (max-width: 1400px)
    padding: 30pt 10pt 10pt 10pt
    width: 100vw
    height: 100vh

#close
  color: #3bb30b
  font-size: 1.5em
  position: absolute
  top: 10pt
  right: 10pt
  font-weight: 600
  cursor: pointer

#body
  flex: 1
  overflow-y: auto

</style>
