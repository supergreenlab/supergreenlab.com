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

import { loadFromStorage, saveToStorage } from '~/lib/client-side.js'
import { guides } from '~/config/guides.json'

const STORAGE_ITEM='guides3'

export const state = () => {
  let defaults = {
  };
  [].concat(guides).concat(...guides.map(g => g.sections)).forEach(gs => Object.assign(defaults, { [gs.slug]: {
    checked: false,
  }}));

  return defaults
};

const storeState = (state) => {
  saveToStorage(STORAGE_ITEM, JSON.stringify(state))
}

export const actions = {
  nuxtClientInit(context) {
    const saved = loadFromStorage(STORAGE_ITEM)
    if (saved) {
      context.commit('setState', JSON.parse(saved))
    }
  },
}

export const mutations = {
  setState(state, newState) {
    Object.assign(state, newState)
  },
  checkSection(state, { slug, checked }) {
    state[slug].checked = checked
    storeState(state)
  },
}

export const getters = {
}
