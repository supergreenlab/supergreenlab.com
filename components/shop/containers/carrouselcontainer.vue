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
  <section :id="$style.container">
    <client-only>
      <VueSlickCarousel v-bind="settings">
        <slot></slot>
      </VueSlickCarousel>
    </client-only>

  </section>
</template>

<script>
export default {
  components: { Slick: () => (typeof window !== 'undefined') ? import('vue-slick-carousel') : 'undefined' },
  data() {
    return {
      settings: {
        arrows: true,
        dots: true,
        infinite: true,
        slidesToScroll: 1,
        rtl: true
      }
    };
  }
};
</script>

<style module lang="stylus">

#container
  width: 100vh
  flex: 1
  display: block

/* .slot
  text-decoration: underline
</style>
