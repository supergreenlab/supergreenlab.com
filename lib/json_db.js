/*
 * Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
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

const { products, sellingPoints, sellers, brandProducts, brands, regions, collections , relatedProducts } = require('~/config/products.json')

const arrayContained = (a1, a2) => a1.findIndex(a => a2.indexOf(a) !== -1) !== -1

const productsWithTypes = types => products.filter(p => arrayContained(Array.isArray(types) ? types : [types], p.type))

let fns = {
  productsWithTypes,
  bundles: () => productsWithTypes('SGL_BUNDLE'),
  leds: () => productsWithTypes('SGL_LED'),
  accessories: () => productsWithTypes('SGL_ACCESSORIES'),

  product: id => products.find(p => p.id == id),
  products: ids => ids.map(id => products.find(p1 => p1.id == id)),
  brandProduct: id => brandProducts.find(bp => bp.id == id),
  brand: id => brands.find(b => b.id == id),
  seller: id => sellers.find(s => s.id == id),
  variants: id => {
    let brandProduct = brandProducts.find(bp => bp.id == id)
    if (brandProduct.variantOf) {
      brandProduct = brandProducts.find(bp => bp.id == brandProduct.variantOf[0])
    }
    return [brandProduct].concat(brandProducts.filter(bp => bp.variantOf && bp.variantOf[0] == brandProduct.id))
  },
  collection: id => collections.find(c => c.id == id),
  collectionWithSlug: slug => collections.find(c => c.slug == slug),

  sellingPointWithSlug: slug => sellingPoints.find(sp => sp.slug.toLowerCase() == slug.toLowerCase()),
  sellingPointWithID: id => sellingPoints.find(sp => sp.id == id),
  productWithSlug: slug => products.find(p => p.slug.toLowerCase() == slug.toLowerCase()),
  productsWithTypes: types => productsWithTypes(types),

  productsForCollection: collection => collection.CollectionProducts.sort((cp1, cp2) => cp1.order - cp2.order).map(cp => products.find(p => cp.Product[0] == p.id)),

  relatedProducts: id => relatedProducts.filter(rp => rp.to[0] == id).sort((rp1, rp2) => rp1.order - rp2.order),
}

module.exports = fns
