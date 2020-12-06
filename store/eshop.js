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

import { products, sellingPoints, sellers, brandProducts, brands, regions } from '~/config/products.json'

const guessDefautRegion = () => {
  const off = new Date().getTimezoneOffset() / 60
  if (off <= 0 && off >= -3) {
    return regions.find(r => r.code == 'EU')
  } else if (off >= 3 && off <= 8) {
    return regions.find(r => r.code == 'NA')
  }
  return regions[0]
}

const STORAGE_ITEM='eshop2'

export const state = () => {
  let defaults = {
    region: guessDefautRegion(),
    regions,
    products,
    sellingPoints,
    sellers,
    brandProducts,
    brands
  }
  const saved = window.localStorage.getItem(STORAGE_ITEM)
  if (saved) {
    defaults = Object.assign({}, defaults, JSON.parse(saved))
  }
  return defaults
}

const storeState = (state) => {
  window.localStorage.setItem(STORAGE_ITEM, JSON.stringify(state))
}

//const arrayContained = (a1, a2) => a1.every(a => a2.indexOf(a) !== -1)
const arrayContained = (a1, a2) => a1.findIndex(a => a2.indexOf(a) !== -1) !== -1
const productsWithTypes = (state, types) => state.products.filter(p => arrayContained(Array.isArray(types) ? types : [types], p.type))

export const mutations = {
  setRegion(state, region) {
    state.region = region
    storeState({
      region
    })
  },
}

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
  sellingPointWithSlug: state => slug => state.sellingPoints.find(sp => sp.slug == slug),
  productWithSlug: state => slug => state.products.find(p => p.slug == slug),
  productsWithTypes: state => types => productsWithTypes(state, types),

  product: state => id => state.products.find(p => p.id == id),
  brandProduct: state => id => state.brandProducts.find(bp => bp.id == id),
  brand: state => id => state.brands.find(b => b.id == id),
  seller: state => id => state.sellers.find(s => s.id == id),
  variants: state => id => {
    let brandProduct = state.brandProducts.find(bp => bp.id == id)
    if (brandProduct.variantOf) {
      brandProduct = state.brandProducts.find(bp => bp.id == brandProduct.variantOf[0])
    }
    return [brandProduct].concat(state.brandProducts.filter(bp => bp.variantOf && bp.variantOf[0] == brandProduct.id))
  },

  sellingPoint: state => sellingPoints => {
    const { region } = state
    const regionTree = (region, acc=[]) => {
      acc.push(region)
      if (region.in) {
        return regionTree(state.regions.find(r => r.id == region.in[0]), acc)
      }
      return acc
    }
    const regions = regionTree(region).map(r => r.id)
    for (let i in regions) {
      const region = regions[i]
      const sp = sellingPoints.find(sp => sp.regions.find(r => r.id == region))
      if (sp) return sp
    }
  },
  sellingPointForBrandProduct: (state, getters) => id => getters.sellingPoint(state.sellingPoints.filter(sp => sp.BrandProduct[0] == id)),
  sellingPointForProduct: (state, getters) => id => getters.sellingPoint(state.sellingPoints.filter(sp => sp.Product[0] == id)),
}
