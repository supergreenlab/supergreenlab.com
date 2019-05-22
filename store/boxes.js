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

const box_defaults = (main) => ({
  main,
  color: 'white',
  width: '',
  height: '',
  depth: '',
  leds: null,
})

const default_boxes = [
  box_defaults(true),
  box_defaults(false),
  box_defaults(false),
]

const stored = {
  controller: window.localStorage.getItem('controller') || 'controller',
  unit: window.localStorage.getItem('metric') || 'metric',
  boxes: JSON.parse(window.localStorage.getItem('boxes') || JSON.stringify(default_boxes)),
}

const storeState = (state) => {
  window.localStorage.setItem('controller', state.controller)
  window.localStorage.setItem('unit', state.unit)
  window.localStorage.setItem('boxes', JSON.stringify(state.boxes))
}

export const state = () => ({
  controller: stored.controller,
  unit: stored.unit,
  boxes: stored.boxes,
})

const updateBox = (state, i, obj) => {
  const box = Object.assign({}, state.boxes[i], obj)
  state.boxes = Object.assign([], state.boxes, {[i]: box})
}

export const mutations = {
  controller(state, { controller }) {
    store.controller = controller
  },
  update(state, { i, obj }) {
    updateBox(state, i, obj)
    storeState(state)
  },
  unit(state, { unit }) {
    state.unit = unit
    storeState(state)
  },
}

export const getters = {
  getBox: (state) => (i) => state.boxes[i],
  nBoxes: (state) => (main) => state.boxes.reduce((n, b) => b.leds && b.main == main ? n+1 : n, 0),
  nLeds: (state) => (main) => state.boxes.reduce((n, b) => b.leds && b.main == main ? n+b.leds.n : n, 0),
  ledPrice: (state) => (main) => state.boxes.reduce((n, b) => b.leds && b.main == main ? n+b.leds.n*b.leds.price : n, 0),
}
