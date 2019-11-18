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

import axios from 'axios'

export const state = () => {
  let defaults = {
    firstname: {value: '', valid: false,},
    lastname: {value: '', valid: false,},
    phone: {value: '', valid: false,},
    email: {value: '', valid: false,},
    country: {value: '', valid: false,},
    city: {value: '', valid: false,},
    company: {value: '', valid: false, optional: true,},
    address1: {value: '', valid: false,},
    address2: {value: '', valid: false, optional: true,},
    province: {value: '', valid: false,},
    zip: {value: '', valid: false,},
    promocode: {value: '', valid: true, optional: true,},
    discount: {value: 0, valid: true, optional: true},
    color: 'white',
    cart: [],
  }
  if (window.localStorage.getItem('checkout')) {
     defaults = Object.assign(defaults, JSON.parse(window.localStorage.getItem('checkout')))
  }

  return defaults
}

const storeState = (state) => {
  window.localStorage.setItem('checkout', JSON.stringify(state))
}

export const actions = {
  async setPromocode(context, {code}) {
    try {
      const { data: discount } = await axios.get(`https://shopapi.supergreenlab.com/discount?code=${code}`)
      context.commit('setPromocode', code)
      context.commit('setDiscount', discount.value)
    } catch(e) {
      context.commit('setDiscount', 0)
    }
  },
}

export const mutations = {
  updateCheckout(state, params) {
    state[params.key] = Object.assign({}, state[params.key], {value: params.value})
    storeState(state)
  },
  addToCart(state, lineItems) {
    state.cart.push(lineItems)
    storeState(state)
  },
  setCart(state, lineItems) {
    state.cart = [lineItems]
    storeState(state)
  },
  setPromocode(state, promocode) {
    state.promocode.value = promocode
    storeState(state)
  },
  setDiscount(state, discount) {
    state.discount.value = discount
    storeState(state)
  },
}
