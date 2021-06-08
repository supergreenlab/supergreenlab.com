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
    <div :id='$style.subscribe'>
      <div :id='$style.title'>
       {{ config.title }}
      </div>
      <!-- Check overlay-major and promocode -->
      <div :id='$style.content'>
        {{ config.description }}
      </div>
      <div :id='$style.btnSubscribe' @click="toggleClass()">
        Subscribe
      </div>
      <Modal v-if="showModal" @close="toggleClass()" />
    </div>
  </section>
</template>

<script>
import Modal from '~/components/shop/widgets/modal.vue'

export default {
  props: ['config',],
  components: {Modal},
  data() {
    return{
      showModal: false
    }
  },
  methods: {
    toggleClass: function(){
      this.showModal = !this.showModal
    }
  }
}
</script>

<style module lang=stylus>
#container
  height: 220px
  /* @media only screen and (max-width: 600px)
    height: 320px
    display: flex
    justify-content: center */

#subscribe
  text-align: center
  height: 200px
  margin: 10px
  justify-content: center
  display: flex
  flex-direction: column
  align-items: center
  /* @media only screen and (max-width: 600px)
    width: 300px
    height: 300px */

#btnSubscribe
  cursor: pointer
  width: 170px
  margin: 10pt
  background-color: #3BB30B
  text-align: center
  padding: 3pt 15pt
  border-radius: 3pt
  color: white
  text-transform: uppercase
  text-decoration: none
  font-size: 1em
  white-space: nowrap
  font-weight: bold

</style>
