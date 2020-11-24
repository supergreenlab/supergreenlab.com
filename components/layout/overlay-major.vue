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
    <div :id='$style.popup' @click='cancelClick'>
      <SectionTitle title='Welcome to SuperGreenLab !'
                    green='' />
      <div :id='$style.disclaimer'>
        By proceeding, you explicitly agree that you are acting in coordinance with<br />
        local, state, and federal laws. SuperGreenLab will not be liable for<br />
        consequences surrounding the legality of how the lights or grow bundle are used. 
      </div>
      <div :id='$style.cookies'>
        By pressing "ENTER" you also accept our <nuxt-link to='/cookies'>cookie policies</nuxt-link>
      </div>
      <div :id='$style.ctas'>
        <a :id='$style.ctano' href='javascript:void(0)' @click='no'>
          Nope
        </a>
        <a :id='$style.ctayes' class="hvr-curl-bottom-left" href='javascript:void(0)' @click='ok'>
          <b>Enter</b>
        </a>
      </div>
      <a :id='$style.discord' class="hvr-grow" href='javascript:void(0)' @click='showChat'>
        Got questions ?<br />Ask us anything on the chat:)
      </a>
      or send us an email at
      <a :id='$style.discord' href='mailto:towelie@supergreenlab.com'>towelie@supergreenlab.com</a>
    </div>
  </section>
</template>

<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'

export default {
  props: ['onClose',],
  components: { SectionTitle ,},
  created() {
    this.$matomo && this.$matomo.trackEvent('disclaimer', 'shown')
  },
  methods: {
    close(ok) {
      this.$props.onClose(ok)
      this.$matomo && this.$matomo.trackEvent('disclaimer', 'close')
    },
    ok() {
      this.close(true)
      this.$matomo && this.$matomo.trackEvent('disclaimer', 'ok')
    },
    no() {
      this.close(false)
      this.$matomo && this.$matomo.trackEvent('disclaimer', 'nok')
    },
    showChat(e) {
      $crisp.push(["set", "session:event", ["show_chat"]])
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

#ctas
  display: flex
  @media only screen and (max-width: 600px)
    flex-direction: column

#ctano, #ctayes
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  text-transform: uppercase
  color: white
  background-color: #3BB30B
  padding: 8pt 35pt
  border-radius: 3pt
  text-decoration: none
  z-index: 100
  margin-bottom: 20pt
  font-size: 1.5em
  @media only screen and (max-width: 600px)
    font-size: 1.1em

#ctano
  font-size: 1.2em
  background-color: #F78181
  margin-right: 5pt

#discord
  text-align: center
  white-space: nowrap
  text-decoration: none;
  color: green;

#cookies
  margin: 10pt 0

#disclaimer
  text-align: center
  font-size: 1.1em
  margin: 20pt 0

</style>
