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
      <h2>Welcome to</h2>
      <div :class='$style.logo'><Logo /></div>
      <div :class='$style.text'>Super<b>Green</b>Lab is a <b>community</b>  of <b>stealth growers</b>. <br>checkout our <b>dedicated grow lights</b> and <b>smart controller</b> and <b>join the community!</b></div>
      <div :class='$style.buttons' v-on:click='backToHome()'>Start growing</div>
  </section>
</template>

<script>
import Logo from '~/components/widgets/logo.vue'
export default {
  components: { Logo, },
  props: ['guide'],
  methods: {
    backToHome() {
      this.$router.push('/#top')
    }
  }
}
</script>

<style module lang=stylus>
#container
  background-color: #dedede
  width: 100%
  height: auto
  display: flex
  align-items: center
  flex-direction: column
  padding: 10pt 0

.buttons
  background-color: #3BB30B
  text-align: center
  padding: 10pt 15pt
  border-radius: 3pt
  color: white
  text-transform: uppercase
  text-decoration: none
  font-size: 1em
  white-space: nowrap
  font-weight: bold
  cursor: pointer

.logo
  font-size: 2.8em
  margin: 10pt
  @media only screen and (max-width: 600pt)
    font-size: 2.5em

.text
  text-align: center
  margin-bottom: 15pt
  font-size: 1.2em

.text > b
  color: #3bb30b

h2
  margin: 5pt


</style>
