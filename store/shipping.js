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
  };
  if (window.localStorage.getItem('shipping')) {
    defaults = Object.assign(defaults, JSON.parse(window.localStorage.getItem('shipping')))
  }
  return defaults
};

const storeState = (state) => {
  window.localStorage.setItem('shipping', JSON.stringify(state))
}

export const actions = {
}

export const mutations = {
  updateShipping(state, params) {
    state[params.key] = Object.assign({}, state[params.key], {value: params.value})
    storeState(state)
  },
}

export const getters = {
}
