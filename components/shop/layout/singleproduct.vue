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
    <div :class="$style.singleproduct">
      <ProductList ref='homepage-furniture' :products='furnitures' :center=true :maxItems=1 />
    </div>
  </section>
</template>

<script>
import ProductList from '~/components/products/productlist.vue'

export default {
  components: { ProductList },

  computed: {
    furnitures() {
      return this.$store.getters['eshop/collection']('homepage-furniture')
    },
  }
}

</script>

<style module lang=stylus>

#container
  width: 220px
  display: flex
  flex-direction: column


</style>
