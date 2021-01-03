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
      <SectionTitle v-if='!showTypeForm'
                    title='Welcome back:)'
                    green='Sorry for the interruption!' />
      <div v-if='showTypeForm' :id='$style.typeform'>
        <div class="typeform-widget" :onSubmit="onSubmit" data-url="https://form.typeform.com/to/n2oKQ2?typeform-medium=embed-snippet" data-transparency="50" data-hide-headers=true data-hide-footer=true style="width: 100%; height: 500px;"></div>
      </div>
      <div v-if='!showTypeForm' :id='$style.typeformintro'>
        <h3>Can you help us improve</h3>
        <h2>SuperGreenLab?</h2>
      </div>
      <div v-if='!showTypeForm' :id='$style.ctas'>
        <a :id='$style.ctano' href='javascript:void(0)' @click='no'>
          Nope
        </a>
        <a :id='$style.ctayes' class="hvr-curl-bottom-left" href='javascript:void(0)' @click='takeSurvey'>
          <b>TAKE THE SURVEY</b>
          <small>And get a 5% promocode</small>
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
  data() {
    return {
      showTypeForm: false,
    }
  },
  components: { SectionTitle ,},
  created() {
  },
  methods: {
    close() {
      this.$props.onClose()
    },
    ok() {
      this.close()
      this.$store.dispatch('storefront/setPromocode', {code: 'SGL_LOVE'})
    },
    takeSurvey() {
      this.$data.showTypeForm = true
      setTimeout(this.loadTypeform, 200)
    },
    no() {
      this.close()
    },
    cancelClick(e) {
      e.stopPropagation()
    },
    showChat(e) {
      $crisp.push(["set", "session:event", ["show_chat"]])
    },
    onSubmit() {
      this.ok()
    },
    loadTypeform() {
      var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/";
      if(!gi.call(d,id)) {
        js=ce.call(d,"script");
        js.id=id;
        js.src=b+"embed.js";
        q=gt.call(d,"script")[0];
        q.parentNode.insertBefore(js,q)
      }
    }
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
    padding: 40pt 10pt 10pt 10pt
    width: 100vw
    height: 100vh

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

#typeformintro
  flex: 1
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  text-align: center
  margin: 30pt 0

#typeformintro > h2
  color: #5E5E5E
  font-size: 2.3em
  margin-top: 20pt

#typeformintro > h3
  color: #3BB30B
  font-size: 2em
  margin-top: 0

#typeform
  flex: 1
  min-width: 400pt
  @media only screen and (max-width: 600px)
    min-width: 100%

</style>
