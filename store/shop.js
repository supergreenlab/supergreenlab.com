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

import { leds } from '../config/leds.json'

export const state = () => ({
	leds,
})

const LED_SIZE_SPREAD = 1.6

const getNLedForSurface = (state, width, height, l) => Math.max(
  Math.min(width / (l.width * LED_SIZE_SPREAD), height / (l.height * LED_SIZE_SPREAD)),
  Math.min(width / (l.height * LED_SIZE_SPREAD), height / (l.width * LED_SIZE_SPREAD)),
)

export const getters = {
  getLedsToFit: (state) => (main, width, height, depth, scrog) => {
    width = parseInt(width)
    height = parseInt(height)
    depth = parseInt(depth)
    const leds = state.leds.map((l) => {
      const sideN = (scrog && scrog == 'horizontal') ? 0 : getNLedForSurface(state, height, depth, l),
            ceilingN = (scrog && scrog == 'vertical') ? 0 : getNLedForSurface(state, width, depth, l),
            deepN = (scrog && scrog == 'horizontal') ? 0 : getNLedForSurface(state, width, height, l),
            maxN = main ? Math.max(sideN, ceilingN, deepN) : ceilingN
      let res = Object.assign({}, l, {n: maxN < 1 ? 0 : Math.round(maxN)})
      if (ceilingN == maxN) res.scrog = 'horizontal'
      else if (sideN == maxN || deepN == maxN) res.scrog = 'vertical'
      return res
    })

    return leds.filter((l) => l.n >= 1 && !(l.max && l.hidemax && l.n >= l.max) && ((!main && l.power == 'controller') || (main && l.power != 'controller')))
  }
}
