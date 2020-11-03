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
    {{ slug }}
    <a href='javascript:void(0);' @click='addToCartClicked'><b>ADD TO CART</b></a><br />
    <p>Our bundles are shipped discreet</p>
  </section>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      n: 0,
    }
  },
  methods: {
    addToCartClicked() {
      this.$matomo && this.$matomo.trackEvent('bundle', 'addtocartclicked', this.$props.slug)
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  justify-content: flex-end
  text-align: right
  color: #3bb30b;
  font-weight: 600;
  @media only screen and (max-width: 600px)
    align-self: flex-end

#container > a
  display: block
  align-self: flex-end
  background-color: #3BB30B
  padding: 8pt 25pt
  border-radius: 5pt
  color: white
  text-decoration: none
  font-size: 22px
  margin: 4pt 0

#container > a:hover
  background-color: #2F880B

#container > a > b
  font-weight: 600

</style>
