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
  <section :id="$style.body">
    <div :id="$style.container">
      <div :class="$style.logo">
        <Logo subtitle="Growshop." />
      </div>
      <div :class="$style.menu">
        <div>
          <nuxt-link
            :class="$route.path.includes('/cart') ? $style.selected : ''"
            to="/cart"
            >Cart<span v-if="nCartItems != 0"
              >({{ nCartItems }})</span
            ></nuxt-link
          >
        </div>
      </div>
    </div>
    <div
      :id="$style.containerresponsive"
      :style="{
        transform: !showHeader ? 'translateY(-100%)' : 'translateY(0)'
      }"
    >
      <div :class="$style.logo">
        <Logo subtitle="Growshop." />
      </div>
      <div :class="$style.menu">
        <div>
          <nuxt-link
            :class="$route.path.includes('/cart') ? $style.selected : ''"
            to="/cart"
            >Cart<span v-if="nCartItems != 0"
              >({{ nCartItems }})</span
            ></nuxt-link
          >
        </div>
      </div>
    </div>
    <div :id="$style.navbar">
      <NavBar />
    </div>
    <div
      :id="$style.navbarresponsive"
      :style="{
        transform: !showHeader ? 'translateY(-50px)' : 'translateY(0)'
      }"
    >
      <NavBar />
    </div>
  </section>
</template>

<script>
import Logo from "~/components/widgets/logo.vue";
import SearchBar from "~/components/shop/widgets/searchbar.vue";
import NavBar from "~/components/shop/widgets/navbar.vue";

export default {
  components: { Logo, SearchBar, NavBar },
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
    page() {
      return this.$route.name;
    },
    nCartItems() {
      return this.$store.state.checkout.cart.reduce((acc, i) => acc + i.n, 0);
    }
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
      if (
        Math.abs(window.pageYOffset - this.lastScrollPosition) <
        this.scrollOffset
      ) {
        return;
      }
      this.showHeader = window.pageYOffset < this.lastScrollPosition;
      this.lastScrollPosition = window.pageYOffset;
    }
  }
};
</script>

<style module lang="stylus">

#body
  height: 83px
  background-color: rgba(255, 255, 255, 0.8)
  @media only screen and (max-width: 600px)
    background-color: transparent

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
  @media only screen and (max-width: 600px)
    display: none

#containerresponsive
  display: none
  @media only screen and (max-width: 600px)
    position: fixed
    background-color: rgba(255, 255, 255, 0.8)
    top: 0
    left: 0
    z-index: 1000
    display: flex
    width: 100vw
    align-items: center
    justify-content: space-between
    font-size: 1.2em
    padding: 5pt
    height: 50px
    transition: transform 420ms linear

#searchbar
  width: 100%
  margin: 0px 20px 0px
  @media only screen and (max-width: 600px)
    display: none

#responsivesearch
  display: none
  width: 100%
  @media only screen and (max-width: 600px)
    top: 50px
    display: flex
    position: fixed
    width: 100%
    padding-left: 2pt
    padding-right: 2pt
    transition: transform 420ms linear

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
  position: fixed
  width: 100%
  top: 53px
  @media only screen and (max-width: 600px)
    display: none

#navbarresponsive
  display: none
  @media only screen and (max-width: 600px)
    display: block
    width: 100%
    position: fixed
    background-color: rgba(255, 255, 255, 0.8)
    transition: transform 420ms linear
    top: 83px
</style>
