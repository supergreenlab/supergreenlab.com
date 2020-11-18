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

// return this.bundle.canorder && Object.keys(this.$store.state.checkout).findIndex((k) => typeof this.$store.state.checkout[k].value !== 'undefined' && !this.$store.state.checkout[k].value && !this.$store.state.checkout[k].optional) == -1

export const state = () => {
  let defaults = {
    cart: [],
  };
  if (window.localStorage.getItem('checkout')) {
    defaults = Object.assign(defaults, JSON.parse(window.localStorage.getItem('checkout')))
  }
  return defaults
};

const storeState = (state) => {
  window.localStorage.setItem('checkout', JSON.stringify(state))
}

export const actions = {
}

export const mutations = {
  addToCart(state, lineItems) {
    state.cart.push(lineItems)
    storeState(state)
  },
  setCart(state, lineItems) {
    state.cart = [lineItems]
    storeState(state)
  },
}

export const getters = {
  getTotalPrice: (state) => state.cart.reduce((p, t) => t + p.price, 0)
}
