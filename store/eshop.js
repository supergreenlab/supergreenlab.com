/*
 * Copyright (C) 2019  SuperGreenLab <towelie@supergreenlab.com>
 * Author: Constantin Clauzel <constantin.clauzel@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { products, sellers, brandProducts, brands } from '~/config/products.json'

export const state = () => ({
  products,
  sellers,
  brandProducts,
  brands
})

const arrayContained = (a1, a2) => a1.every(a => a2.indexOf(a) !== -1)
const productsWithTypes = (state, types) => state.products.filter(p => arrayContained(Array.isArray(types) ? types : [types], p.type))

export const getters = {
  bundles: state => {
    return productsWithTypes(state, 'SGL_BUNDLE')
  },
  leds: state => {
    return productsWithTypes(state, 'SGL_LED')
  },
  accessories: state => {
    return productsWithTypes(state, 'SGL_ACCESSORIES')
  },
  productWithSlug: state => slug => state.products.find(p => p.slug == slug),
  productsWithTypes: state => types => productsWithTypes(state, types),
  brandProduct: state => id => state.brandProducts.find(bp => bp.id == id),
  brand: state => id => state.brands.find(b => p.id == id),
  seller: state => id => state.sellers.find(s => s.id == id)
}
