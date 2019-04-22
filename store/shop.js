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

export const state = () => ({
  leds: [
    {
      name: 'SGB 288.301B',
      price: 99.00,
      main: true,
      power: 'mw',
      icons: {
        white: '288-white.png',
        black: '288-black.png',
      },
      width: 35,
      height: 25,
    },
    {
      name: 'SGB 144.301B',
      price: 89.00,
      main: true,
      power: 'external',
      icons: {
        white: '144-white.png',
        black: '144-black.png',
      },
      width: 25,
      height: 23,
    },
    {
      name: 'SGB 72.301B',
      price: 34.99,
      power: 'controller',
      icons: {
        white: '72-white.png',
        black: '72-black.png',
      },
      width: 25,
      height: 11,
    },
    {
      name: 'SGB 36.301B',
      price: 24.99,
      power: 'controller',
      icons: {
        white: '36-white.png',
        black: '36-black.png',
      },
      width: 13,
      height: 11,
    },
  ]
})

const LED_SIZE_SPREAD = 1.5

const getNLedForSurface = (state, width, height, l) => Math.max(
  Math.min(width / (l.width * LED_SIZE_SPREAD), height / (l.height * LED_SIZE_SPREAD)),
  Math.min(width / (l.height * LED_SIZE_SPREAD), height / (l.width * LED_SIZE_SPREAD)),
)

export const getters = {
  getLedsToFit: (state) => (main, width, height, depth) => {
    width = parseInt(width)
    height = parseInt(height)
    depth = parseInt(depth)
    const leds = state.leds.map((l) => {
      const sideN = getNLedForSurface(state, height, depth, l),
            ceilingN = getNLedForSurface(state, width, depth, l),
            deepN = getNLedForSurface(state, width, height, l),
            maxN = Math.max(sideN, ceilingN, deepN)
      let res = Object.assign({}, l, {n: Math.floor(maxN)})
      if (sideN == maxN || deepN == maxN) res.scrog = 'vertical'
      else if (ceilingN == maxN) res.scrog = 'horizontal'
      return res
    })

    return leds.filter((l) => l.n >= 1 && ((!main && l.power == 'controller') || (main && l.power != 'controller')))
  }
}
