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
    <ProductList :location='location' :id='$style.productlist' :products='products' :center=false />
    <SmallProductList :location='location' :id='$style.smallproductlist' :products='products' />
  </section>
</template>

<script>
import ProductList from '~/components/products/productlist.vue'
import SmallProductList from '~/components/products/smallproductlist.vue'

export default {
  props: ['products', 'center', 'maxItems', 'location',],
  components: { ProductList ,SmallProductList},
}
</script>

<style module lang=stylus>

#productlist
  @media only screen and (max-width: 900px)
    display: none

#smallproductlist
  display: none
  @media only screen and (max-width: 900px)
    display: block
</style>
