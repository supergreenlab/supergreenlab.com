<!--
      Copyright (C) 2020  SuperGreenLab <towelie@supergreenlab.com>
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
    {{ sellingPoint.slug }}
    {{ brandProduct.pics[0].fileLarge }}
    {{ product.name }}
  </section>
</template>

<script>
export default {
  computed: {
    sellingPoint() {
      const { slug } = this.$route.params
      return this.$store.getters['eshop/sellingPointWithSlug'](slug)
    },
    brandProduct() {
      return this.$store.getters['eshop/brandProduct'](this.sellingPoint.BrandProduct[0])
    },
    product() {
      return this.$store.getters['eshop/product'](this.sellingPoint.Product[0])
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex

</style>
