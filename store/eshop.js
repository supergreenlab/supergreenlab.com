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

import { accessories } from '~/config/eshop/sgl/accessories.json'
import { bundles } from '~/config/eshop/sgl/bundles.json'
import { leds } from '~/config/eshop/sgl/leds.json'

export const state = () => ({
  sgl: {
    bundles: bundles.map(o => Object.assign(o, {type: 'sgl_bundle'})),
    leds: leds.map(o => Object.assign(o, {type: 'sgl_led'})),
    accessories: accessories.map(o => Object.assign(o, {type: 'sgl_accessory'})),
  },
})

export const actions = {
}

export const mutations = {
}
