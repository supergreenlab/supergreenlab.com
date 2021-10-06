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
  <section>
    <div :id="$style.bodyResponsive" >
      <div :style="{transform: !showHeader ? 'translateY(-100%)' : 'translateY(0)'}">
        <div :id="$style.container">
          <Header/>
        </div>
        <div :id="$style.navbar">
          <NavBar :containers='containers' />
        </div>
        <div :id="$style.searchbar">
          <Search :onShowResults='onShowResults' />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Header from "~/components/layout/header.vue"
import NavBar from "~/components/shop/widgets/navbar.vue"
import Search from '~/components/shop/widgets/popupsearch.vue'

export default {
  components: { Header, NavBar, Search },
  props: ['containers', 'onShowResults',],
  data() {
    return {
      showHeader: true,
      lastScrollPosition: 0,
      scrollOffset: 100
    };
  },
  mounted() {
    this.lastScrollPosition = window.pageYOffset;
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  computed: {
  },
  methods: {
    onClick(e) {
      this.$matomo &&
        this.$matomo.trackEvent(
          "front-page-menu",
          "click",
          e.target.href.split("#")[1]
        );
    },
    onScroll() {
      if (window.pageYOffset < 0) {
        return;
      }
      if (Math.abs(window.pageYOffset - this.lastScrollPosition) < this.scrollOffset ) {
        return;
      }
      this.showHeader = window.pageYOffset < this.lastScrollPosition;
      this.lastScrollPosition = window.pageYOffset;
    }
  }
}
</script>

<style module lang=stylus>

#bodyResponsive
  width: 100%
  display: block

#bodyResponsive > div
  transition: transform 420ms linear
  height: 60pt
  @media only screen and (max-width: 900px)
    height: 52pt

#header
  height: 70pt
  @media only screen and (max-width: 900px)
    display: none

#container
  position: fixed
  top: 0
  left: 0
  z-index: 1000
  display: flex
  width: 100vw
  align-items: center
  justify-content: space-between
  padding: 0 0 0 10pt

.menu
  display: flex
  font-size: 0.8em
  margin-right: 10pt

.menu > div > a
  display: block
  color: #4c4c4c
  font-weight: 600
  cursor: pointer
  padding: 15pt 10pt
  text-decoration: none
  text-transform: uppercase
  font-size: 14px

.menu > div:hover
  background-color: #43b100bd

.menu > div.selected
  color: white
  background-color: #43b100bd

.logo
  font-size: 1.5em

.new
  color: red !important
  font-size: 0.8em

.selected
  border-bottom: 3pt solid #3bb30b

#navbar
  background-color: rgba(255, 255, 255, 0.8)
  position: fixed
  width: 100%
  top: 42pt
  @media only screen and (max-width: 900px)
    top: 37.8pt

#searchbar
  top: 57pt
  position: fixed
  width: 100%
  display: flex
  justify-content: center
  padding: 2pt 200pt
  @media only screen and (max-width: 1500px)
    top: 52.5pt
    padding: 0

</style>
