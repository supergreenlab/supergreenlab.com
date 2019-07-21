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
      <SectionTitle title='Welcome back !'
                    green='Take this promocode:' />
      <h3>-10% with</h3>
      <h1>SGL_LOVE</h1>
      <a :id='$style.cta' href='javascript:void(0)' @click='close'>
        <b>OK</b>
      </a>
      <a :id='$style.discord' href='https://discord.gg/z86RNjq' target='_blank'>
        Got questions ?<br />Ask us anything on discord:)
      </a>
    </div>
  </section>
</template>

<script>
import SectionTitle from '~/components/sectiontitle.vue'

export default {
  props: ['onClose',],
  components: { SectionTitle ,},
  created() {
    this.$matomo && this.$matomo.trackEvent('popup', 'shown')
  },
  methods: {
    close() {
      this.$props.onClose()
      this.$matomo && this.$matomo.trackEvent('popup', 'close')
    },
    cancelClick(e) {
      e.stopPropagation()
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  align-items: center
  justify-content: center
  position: fixed
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  background-color: rgba(255, 255, 255, 0.5)
  z-index: 10000

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
  @media only screen and (max-width: 600px)
    width: 100vw
    height: 100vh

#popup > h1
  color: #5E5E5E
  font-size: 4em
  margin-top: 0

#popup > h3
  color: #3BB30B
  font-size: 2em
  margin-top: 20pt

#cta
  display: flex
  flex-direction: column
  text-transform: uppercase
  color: white
  background-color: #3BB30B
  padding: 8pt 35pt
  border-radius: 3pt
  text-decoration: none
  text-align: center
  z-index: 100
  margin-bottom: 20pt
  font-size: 1.5em
  @media only screen and (max-width: 600px)
    font-size: 1.1em

#discord
  text-align: center
  white-space: nowrap

</style>
