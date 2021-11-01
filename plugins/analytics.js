/*
 * Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
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

import { chains } from '~/config/analytics.json'

export default (context, inject) => {
  const { app } = context
  const events = []
  let monitoringFns = []
  const $analytics = {}
  $analytics.trackEvent = (category, action, name, value) => {
    const evt = `${category};${action};${name || ''}`
    events.unshift(evt)
    if (events.length > 1000) events.pop()
    app.$matomo.trackEvent(category, action, evt, value)
    for (let mf of monitoringFns) {
      if (mf.current >= mf.events.length) continue
      if (new RegExp(mf.events[mf.current]).test(evt)) {
        mf.current++
        if (mf.current >= mf.events.length) {
          mf.fn()
        }
      }
    }
  }
  $analytics.monitorEvents = (events, fn) => {
    monitoringFns.push({ events, fn, current: 0 })
  }
  $analytics.removeEventMonitor = (fn) => {
    console.log('before remove', monitoringFns.length)
    monitoringFns = monitoringFns.filter(mf => mf.fn != fn)
    console.log('after remove', monitoringFns.length)
  }

  chains.forEach(c => $analytics.monitorEvents(c.events.split(',').map(s => s.trim()), () => {
    const evt = c.event.split(';')
    $analytics.trackEvent(evt[0], evt[1], evt[2] || '')
  }))

  context.$analytics = $analytics
  inject('analytics', $analytics)
}
