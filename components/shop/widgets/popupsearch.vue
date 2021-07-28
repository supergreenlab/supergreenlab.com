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
    <div :id='$style.btnSearch' @click="showmodal()">Looking for something?</div>

    <div :id="$style.myModal" class="modal" v-if="modal">

      <div :class="$style.modalcontent">
        <input type="search" placeholder="Type to search">
        <span :class="$style.close" @click="showmodal()">&times;</span>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  data() {
    return {
      modal : false
    }
  },
  methods: {
    showmodal: function(){
      this.modal = !this.modal
    },
  }
}
</script>

<style module lang=stylus>
#container
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: 50pt

#btnSearch
  cursor: pointer
  text-transform: uppercase
  font-weight: bold
  background-color: #3BB30B
  text-align: center
  padding: 8pt 5pt
  border-radius: 5pt
  color: white
  text-decoration: none
  font-size: 1em
  margin: 4pt 0
  white-space: nowrap
  transition: opacity 0.2s

#btnSearch:hover
  background-color: #2F880B

#myModal
  z-index: 9500
  position: fixed
  left: 0
  top: 0
  width: 100%
  height: 100%
  overflow: auto
  background-color: rgb(0,0,0)
  background-color: rgba(0,0,0,0.4)

.modalcontent
  background-color: #fefefe
  display: flex
  justify-content: space-between
  margin: 15% auto
  padding: 20px
  border: 1px solid #888
  width: 50%

.modalcontent > input
  width : 100%
  font-size: 1.2em

.close
  color: #aaa
  float: right
  font-size: 28px
  font-weight: bold
  margin-left: 20px

.close:hover,
.close:focus
  color: #3bb30b
  text-decoration: none
  cursor: pointer

</style>
