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

export const state = () => ({
  unit: 'metric',
  boxes: [
    box_defaults(true),
    box_defaults(true),
    box_defaults(false),
  ],
})

const updateBox = (state, i, obj) => {
  const box = Object.assign({}, state.boxes[i], obj)
  state.boxes = Object.assign([], state.boxes, {[i]: box})
}

export const mutations = {
  update(state, { i, obj }) {
    updateBox(state, i, obj)
  },
  unit(state, { unit }) {
    state.unit = unit
  },
}

export const getters = {
  getBox: (state) => (i) => state.boxes[i],
}
