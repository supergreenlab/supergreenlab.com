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
  <section :id='$style.container' :class='responsiveHide ? $style.responsiveHide : ""'>
    <div :id='$style.logo'>
      <Logo subtitle='Growshop.' />
    </div>
    <a v-if='!nomenu' :id='$style.burgerMenu' @click='toggleClass()'>
      <span :class="$style.burgerBar" :id='$style.topBar' :style='{"transform": (!isActive? "" : "rotate(135deg)"), "background":  (!isActive? "" : "#3BB30B"), "margin-top":  (!isActive? "" : "0.4em")}' ></span>
      <span :class="$style.burgerBar" :id='$style.middleBar' :style='{"opacity": (!isActive? "1" : "0")}'></span>
      <span :class="$style.burgerBar" :id='$style.bottomBar' :style='{"transform": (!isActive? "" : "rotate(-135deg)"), "background":  (!isActive? "" : "#3BB30B"), "margin-top":  (!isActive? "" : "0.4em")}'></span>
    </a>
    <div v-if='!nomenu' :id='$style.menu' :style='{"right": (!isActive? "-200pt" : "0pt")}'>
      <div><nuxt-link @click.native='onClick' :class='$route.path.includes("/app") ? $style.selected : ""' to='/app'>App</nuxt-link></div>
      <div><nuxt-link @click.native='onClick' :class='$route.path.includes("/shop") ? $style.selected : ""' to='/shop'>Shop</nuxt-link></div>
      <!--<div><nuxt-link @click.native='onClick' :class='$route.path.includes("/product/sgl-2x-sticker-sheets-tomtomtom-01") ? $style.selected : ""' to='/product/sgl-2x-sticker-sheets-tomtomtom-01'>Stickers!</nuxt-link></div>-->
      <div><nuxt-link @click.native='onClick' :class='$route.path.includes("/bundle/micro-box-bundle") ? $style.selected : ""' to='/bundle/micro-box-bundle'>Ninja bundle</nuxt-link></div>
      <div><nuxt-link @click.native='onClick' :class='$route.path.includes("/bundle/my-first-stealth-grow-box") ? $style.selected : ""' to='/bundle/my-first-stealth-grow-box'>Nano bundle <span :class='$style.new'>New!</span></nuxt-link></div>
      <div><nuxt-link @click.native='onClick' :class='$route.path.includes("/guides") ? $style.selected : ""' to='/guides'>Guides</nuxt-link></div>
      <div><a @click='onClick' href='https://discord.gg/YPwAWNh' target='_blank'>Support</a></div>
      <!--<div><a @click='onClick' href='https://growmies.supergreenlab.com' target='_blank'>Affiliate</a></div>-->
      <div><nuxt-link @click.native='onClick' :class='$route.path.includes("/cart") ? $style.selected : ""' to='/cart'>Cart<span v-if='nCartItems != 0'>({{ nCartItems}})</span></nuxt-link></div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/widgets/logo.vue'

export default {
  data() {
    return{
      isActive: false
    }
  },
  components: { Logo, },
  props: ['responsiveHide', 'nomenu'],
  computed: {
    page() {
      return this.$route.name
    },
    nCartItems() {
      return this.$store.state.checkout.cart.reduce((acc, i) => acc + i.n, 0)
    }
  },
  methods: {
    toggleClass: function(){
      this.isActive = !this.isActive
    },
    onClick(e) {
      const url = new URL(e.target.href)
      try {
        const pathNameParts = url.pathname.split('/')
        this.$analytics.trackEvent('header-menu', 'click', pathNameParts[pathNameParts.length-1])
      } catch(e) {}
    },
  },
}

</script>

<style module lang=stylus>

#container
  position: fixed
  top: 0
  left: 0
  z-index: 1000
  display: flex
  width: 100vw
  background-color: white
  align-items: center
  justify-content: space-between
  padding: 0 0 0 10pt
  @media only screen and (max-width: 900px)
    font-size: 1.2em
    padding: 5pt

#burgerMenu
  font-family: Roboto
  display: none
  width: 20pt
  height: 20pt
  margin-top: 5pt
  @media only screen and (max-width: 900px)
   display: block

#menu
  font-family: Roboto
  display: flex
  font-size: 0.8em
  margin-right: 10pt
  @media only screen and (max-width: 900px)
   flex-direction: column
   position: absolute
   top: 38.5pt
   min-height: 100vh
   min-width: 25vh
   right: 0pt
   background: white
   margin-right: 0pt
   transition: all 0.420s

#menu > div > a
  display: block
  color: #4c4c4c
  font-weight: 600
  cursor: pointer
  padding: 15pt 10pt
  text-decoration: none
  text-transform: uppercase
  font-size: 14px

#menu > div:hover
  background-color: #43b100bd

#menu > div.selected
  color: white
  background-color: #43b100bd

#logo
  font-size: 1.5em

.burgerBar
  width: 22px
  height: 4px
  border-radius: 30px
  background: #5D5D5D
  position: absolute
  transition: all 0.420s

#middleBar
  display: block
  margin-top: 0.4em

#bottomBar
  margin-top: 0.8em

.new
  color: red !important
  font-size: 0.8em

.selected
  border-bottom: 3pt solid #3bb30b

</style>
