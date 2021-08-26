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

import { products, sellingPoints, sellers, brandProducts, brands, regions, collections, collectionProducts , relatedProducts } from '~/config/products.json'

import { loadFromStorage, saveToStorage } from '~/lib/client-side.js'
// import Fuse from 'fuse.js'

const guessDefautRegion = () => {
  const off = new Date().getTimezoneOffset() / 60
  if (off <= 0 && off >= -3) {
    return regions.find(r => r.code == 'EU')
  } else if (off >= 3 && off <= 8) {
    return regions.find(r => r.code == 'NA')
  }
  return regions[0]
}

const STORAGE_ITEM='eshop6'

export const state = () => {
  let defaults = {
    offsetRegion: regions[0],
    region: regions[0],
    regions,
    products,
    sellingPoints,
    sellers,
    brandProducts,
    brands,
    collections,
    collectionProducts,
    relatedProducts,
  }
  return defaults
}

const storeState = (state) => {
  saveToStorage(STORAGE_ITEM, JSON.stringify(state))
}

//const arrayContained = (a1, a2) => a1.every(a => a2.indexOf(a) !== -1)
const arrayContained = (a1, a2) => a1.findIndex(a => a2.indexOf(a) !== -1) !== -1
const productsWithTypes = (state, types) => state.products.filter(p => arrayContained(Array.isArray(types) ? types : [types], p.type))

export const actions = {
  nuxtClientInit(context) {
    const saved = loadFromStorage(STORAGE_ITEM)
    if (saved) {
      context.commit('setState', JSON.parse(saved))
    } else {
      context.commit('setState', {
        offsetRegion: guessDefautRegion(),
        region: guessDefautRegion(),
      })
    }
  },
}

// const options=  {
//   isCaseSensitive: false,
//   includeScore: false,
//   shouldSort: true,
//   includeMatches: false,
//   findAllMatches: false,
//   minMatchCharLength: 1,
//   location: 0,
//   threshold: 0.6,
//   distance: 100,
//   useExtendedSearch: false,
//   ignoreLocation: false,
//   ignoreFieldNorm: false,
//   keys: [
//     "product.name",
//     "product.description"
//   ]
// }
// const fuse = new Fuse(products, options)


export const mutations = {
  setState(state, newState) {
    Object.assign(state, newState)
  },
  setRegion(state, region) {
    state.region = region
    storeState({
      offsetRegion: state.offsetRegion,
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
  sellingPointWithSlug: state => slug => state.sellingPoints.find(sp => sp.slug.toLowerCase() == slug.toLowerCase()),
  productWithSlug: state => slug => state.products.find(p => p.slug.toLowerCase() == slug.toLowerCase()),
  productsWithTypes: state => types => productsWithTypes(state, types),
  // productsWithCollections: state => collections => productsWithCollections(state, collections),
  productsWithCollections: (state, getters) => id => state.collections.filter(cp => cp.id == id).sort((cp1, cp2) => cp1.order - cp2.order),
  // productWithName: state => name => state.products.find(p => p.name.toLowerCase() == name.toLowerCase()),

  product: state => id => state.products.find(p => p.id == id),
  sellingPointWithID: state => id => state.sellingPoints.find(sp => sp.id == id),
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
  collection: (state, getters) => id => state.collections.filter(c => c.id == id).sort((c1, c2) => c1.order - c2.order).map(c => getters.product(c.Product[0])),

  regionTree: (state) => (region) => {
    const regionTree = (region, acc=[]) => {
      acc.push(region)
      // console.log(region)
      if (region.in) {
        // console.log(region.in)
        return regionTree(state.regions.find(r => r.id == region.in[0]), acc)
      }
      return acc
    }
    return regionTree(region)
  },

  sellingPoint: (state, getters) => sellingPoints => {
    const { region } = state
    const regions = getters.regionTree(region).map(r => r.id)
    for (let i in regions) {
      const region = regions[i]
      const sp = sellingPoints.find(sp => sp.regions.find(r => r.id == region))
      if (sp) return sp
    }
  },
  sellingPointForBrandProduct: (state, getters) => id => getters.sellingPoint(state.sellingPoints.filter(sp => sp.BrandProduct[0] == id)),
  sellingPointForProduct: (state, getters) => id => getters.sellingPoint(state.sellingPoints.filter(sp => sp.Product[0] == id)),

  availableRegions: (state, getters) => state.regions.filter(r => r.id == state.offsetRegion.id || (r.in && getters.regionTree(r).find(r2 => r2.id == state.offsetRegion.id))),

  relatedProducts: (state, getters) => id => state.relatedProducts.filter(rp => rp.to[0] == id).sort((rp1, rp2) => rp1.order - rp2.order),


}
