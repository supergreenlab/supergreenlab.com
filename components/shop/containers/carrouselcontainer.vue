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
    <VueSlickCarousel v-bind="settings">
      <slot></slot>
    </VueSlickCarousel>
  </section>
</template>

<script>
export default {
  props: ['config',],
  components: { Slick: () => (typeof window !== 'undefined') ? import('vue-slick-carousel') : 'undefined' },
  data() {
    return {
      settings: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3500,
        autoplaySpeed: 3500,
      }
    };
  }
};
</script>

<style module lang=stylus>

#container
  margin-top: 20pt
  margin-bottom: 20pt
  position: relative


</style>
