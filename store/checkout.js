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

import Vue from 'vue'
import axios from 'axios'

import { loadFromStorage, saveToStorage } from '~/lib/client-side.js'

// return this.bundle.canorder && Object.keys(this.$store.state.checkout).findIndex((k) => typeof this.$store.state.checkout[k].value !== 'undefined' && !this.$store.state.checkout[k].value && !this.$store.state.checkout[k].optional) == -1

const STORAGE_ITEM='checkout3'

export const state = () => {
  let defaults = {
    cart: [],
    promocode: {value: '', valid: true, optional: true,},
    discount: {value: 0, valid: true, optional: true},
  };
  return defaults
};

const storeState = (state) => {
  saveToStorage(STORAGE_ITEM, JSON.stringify(state))
}

let cancel
const CancelToken = axios.CancelToken
export const actions = {
  nuxtClientInit(context) {
    const saved = loadFromStorage(STORAGE_ITEM)
    if (saved) {
      context.commit('setState', JSON.parse(saved))
    }
  },
  async fetchPromocode(context, {code}) {
    try {
      if (cancel) {
        cancel()
        cancel = null
      }
      const { data: discount } = await axios.get(`https://shopapi.supergreenlab.com/discount?code=${code}`, {
        cancelToken: new CancelToken((c) => {
          cancel = c
        })
      })
      cancel = null
      context.commit('setPromocode', code)
      context.commit('setDiscount', discount.discount)
    } catch(e) {
      context.commit('setDiscount', 0)
    }
  },
}

export const mutations = {
  setState(state, newState/*{ cart, promocode, discount }*/) {
    Object.assign(state, newState)
      /*state.cart.push(...cart)
    state.promocode = promocode
    state.discount = discount*/
  },
  addToCart(state, { n, product, sellingPoint }) {
    const i = state.cart.findIndex(i => i.sellingPoint == sellingPoint.id)
    if (n <= 0 && i !== -1) {
      state.cart.splice(i, 1)
    } else if (i == -1) {
      state.cart.push({ n, product: product.id, sellingPoint: sellingPoint.id, checked: false })
    } else {
      Vue.set(state.cart, i, Object.assign({}, state.cart[i], { n } ))
    }
    storeState(state)
  },
  setCart(state, lineItems) {
    state.cart = [lineItems]
    storeState(state)
  },
  checkLineItem(state, { lineItem: { sellingPoint }, checked=true }) {
    const i = state.cart.findIndex(li => li.sellingPoint == sellingPoint.id)
    Vue.set(state.cart, i, Object.assign({}, state.cart[i], { checked } ))
    storeState(state)
  },
  setPromocode(state, promocode) {
    state.promocode.value = promocode
    state.discount.value = 0
    storeState(state)
  },
  setDiscount(state, discount) {
    state.discount.value = discount
    storeState(state)
  },
}

export const getters = {
  promoDiscount: state => sellingPoint => {
    if (sellingPoint.Seller[0] != 'recT9nIg4ahFv9J29') return {promocode: '', discount: 0}
    const discount = state.discount.value,
      promocode = state.promocode.value
    if (!promocode || !discount) return {promocode: '', discount: 0}
    return {promocode, discount}
  },

  lineItemsPrice: (state, getters, rootState, rootGetters) => (lineItems, promo=true, number=false) => {
    if (!lineItems || lineItems.length == 0) return 0
    const regionTree = (region, acc=[]) => {
      acc.push(region)
      if (region.in) {
        return regionTree(rootState.eshop.regions.find(r => r.id == region.in[0]), acc)
      }
      return acc
    }

    const region = rootState.eshop.region
    let vat = 0
    if (lineItems[0].sellingPoint.Seller[0] == 'recT9nIg4ahFv9J29' && regionTree(region).find(r => r.code == 'EU') && region.code != 'UK') {
      vat = 21
    }
    const currency = lineItems[0].sellingPoint.currency
    const totalWithPromo = lineItems.filter(({ sellingPoint }) => !sellingPoint.offer).reduce((acc, lineItem) => acc + (lineItem.sellingPoint.price * lineItem.n), 0) || 0
    const totalWithoutPromo = lineItems.filter(({ sellingPoint }) => sellingPoint.offer).reduce((acc, lineItem) => acc + (lineItem.sellingPoint.price * lineItem.n), 0) || 0
    let discount = 0
    if (promo) {
      discount = getters.promoDiscount(lineItems[0].sellingPoint).discount
    }
    if (number) {
      return Math.floor((totalWithoutPromo + (totalWithPromo - totalWithPromo * discount / 100)) * (1 + vat / 100) * 100) / 100
    }
    return `${currency}${((totalWithoutPromo + (totalWithPromo - totalWithPromo * discount / 100)) * (1 + vat / 100)).toFixed(2)}`
  },

  cart: (state, getters, rootState, rootGetters) => state.cart.map(li => {
    return Object.assign({}, li, {
      product: rootState.eshop.products.find(p => p.id == li.product),
      sellingPoint: rootState.eshop.sellingPoints.find(sp => sp.id == li.sellingPoint),
    })
  })
}
