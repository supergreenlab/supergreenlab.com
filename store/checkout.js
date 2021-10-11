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
import { regionTree } from '~/lib/json_db.js'

import { products, sellingPoints, regions, } from '~/config/products.json'

// return this.bundle.canorder && Object.keys(this.$store.state.checkout).findIndex((k) => typeof this.$store.state.checkout[k].value !== 'undefined' && !this.$store.state.checkout[k].value && !this.$store.state.checkout[k].optional) == -1

const STORAGE_ITEM='checkout7'

export const state = () => {
  let defaults = {
    rates: [{"base":"EUR","rates":{"EUR":1,"USD":1.16005,"CAD":1.475991,"GBP":0.86364}},{"base":"USD","rates":{"EUR":0.862032,"USD":1,"CAD":1.27235,"GBP":0.744485}},{"base":"CAD","rates":{"EUR":0.677511,"USD":0.785947,"CAD":1,"GBP":0.585126}},{"base":"GBP","rates":{"EUR":1.15789,"USD":1.34321,"CAD":1.709034,"GBP":1}}],
    cart: [],
    promocodes: {},
    discounts: {},
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
    context.dispatch('loadExchangeRates')
  },
  async fetchPromocode(context, {sellerid, promocode}) {
    try {
      if (cancel) {
        cancel()
        cancel = null
      }
      const { data: discount } = await axios.get(`https://shopapi.supergreenlab.com/discount?code=${promocode}`, {
        cancelToken: new CancelToken((c) => {
          cancel = c
        })
      })
      cancel = null
      context.commit('setPromocode', { sellerid, promocode })
      context.commit('setDiscount', { sellerid, discount: discount.discount })
    } catch(e) {
      context.commit('setDiscount', { sellerid, discount: 0 })
    }
  },
  async loadExchangeRates(context) {
    const { data } = await axios.get('https://shopapi.supergreenlab.com/rates')
    context.commit('setRates', data)
  },
}

export const mutations = {
  setState(state, newState) {
    Object.assign(state, newState)
  },
  addToCart(state, { n, product, sellingPoint }) {
    const i = state.cart.findIndex(i => i.sellingPoint == sellingPoint.id)
    if (n <= 0 && i !== -1) {
      state.cart.splice(i, 1)
    } else if (i == -1 && n > 0) {
      state.cart.push({ n, product: product.id, sellingPoint: sellingPoint.id, checked: false })
    } else if (n > 0) {
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
  setPromocode(state, { sellerid, promocode }) {
    state.promocodes[sellerid] = promocode
    delete state.discounts[sellerid]
    storeState(state)
  },
  setDiscount(state, { sellerid, discount }) {
    state.discounts = { ...state.discounts, [sellerid]: discount }
    storeState(state)
  },
  setRates(state, rates) {
    state.rates = rates
    storeState(state)
  },
}

const convertCurrency = (price, currencyFrom, currencyTo, rates) => {
  const rate = rates.find(r => r.base == currencyFrom)
  return price * rate.rates[currencyTo]
}

export const getters = {
  promoDiscount: state => sellerId => {
    const discount = state.discounts[sellerId],
      promocode = state.promocodes[sellerId]
    if (!promocode || !discount) return {promocode: '', discount: 0}
    return {promocode, discount}
  },

  lineItemsPrice: (state, getters, rootState, rootGetters) => (lineItems) => {
    const sglSellerID = process.env.sglSellerID
    const sm = {
      'US$': 'USD',
      '€': 'EUR',
      'CA$': 'CAD',
      '£': 'GBP',
    }
    const region = rootState.eshop.region
    const result = {
      total: 0,
      totalWithoutDiscount: 0,
      discountPercent: 0,
      nItems: 0,

      currency: region.currency,
      strTotal: `${region.currency}0`,
      strTotalWithoutDiscount: `${region.currency}0`,
      
      totals: Object.values(sm).reduce((acc, s) => Object.assign(acc, {[s]: 0}), {}),
      totalsWithoutDiscounts: Object.values(sm).reduce((acc, s) => Object.assign(acc, {[s]: 0}), {}),

      freeShipping: true,
      converted: false,
      canorder: false,
      incTax: false,
      sglOnly: true,
    }
    lineItems.forEach(li => {
      const addVAT = !li.sellingPoint.inctax && region.vat
      var price = li.sellingPoint.price * li.n
      var priceWithoutDiscount = price
      const discount = getters.promoDiscount(li.sellingPoint.Seller).discount
      let discountAmount = 0
      if (li.sellingPoint.offer) {
        discountAmount = price * li.sellingPoint.offer/100
      } else if (discount && !li.sellingPoint.nopromo) {
        discountAmount = price * discount/100
      }

      result.nItems += li.n
      price -= discountAmount
      if (addVAT) {
        price += price * (region.vat/100)
        priceWithoutDiscount += priceWithoutDiscount * (region.vat/100)
      }

      result.totals[sm[li.sellingPoint.currency]] += price
      result.totalsWithoutDiscounts[sm[li.sellingPoint.currency]] += priceWithoutDiscount

      result.canorder = result.canorder || (li.sellingPoint.canorder && !li.sellingPoint.outofstock)
      result.incTax = result.incTax || addVAT
      result.sglOnly = result.sglOnly && li.sellingPoint.Seller[0] == sglSellerID
      result.freeShipping = result.freeShipping && li.sellingPoint.freeshipping
    })
    Object.keys(result.totals).forEach(k => {
      result.converted = result.converted || (k != sm[region.currency] && result.totals[k])
      result.total += convertCurrency(result.totals[k], k, sm[region.currency], state.rates)
    })
    Object.keys(result.totalsWithoutDiscounts).forEach(k => {
      result.totalWithoutDiscount += convertCurrency(result.totalsWithoutDiscounts[k], k, sm[region.currency], state.rates)
    })

    result.discountPercent = (result.totalWithoutDiscount - result.total) / result.totalWithoutDiscount * 100

    if (result.currency == '€') {
      result.strTotal = `${result.total.toFixed(2)}${result.currency}`
      result.strTotalWithoutDiscount = `${result.totalWithoutDiscount.toFixed(2)}${result.currency}`
    } else {
      result.strTotal = `${result.currency}${result.total.toFixed(2)}`
      result.strTotalWithoutDiscount = `${result.currency}${result.totalWithoutDiscount.toFixed(2)}`
    }
    return result
  },

  cart: (state, getters, rootState, rootGetters) => state.cart.map(li => {
    return Object.assign({}, li, {
      product: products.find(p => p.id == li.product),
      sellingPoint: sellingPoints.find(sp => sp.id == li.sellingPoint),
    })
  }).filter(li => li.product != null && li.sellingPoint != null)
}
