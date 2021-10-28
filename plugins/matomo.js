import { chains } from '~/config/analytics.json'

export default ({ app }) => {
  const getCookies = () => {
    return document.cookie.split(';').map(function(c) {
      return c.trim().split('=').map(decodeURIComponent);
    }).reduce(function(a, b) {
      try {
        a[b[0]] = JSON.parse(b[1]);
      } catch (e) {
        a[b[0]] = b[1];
      }
      return a;
    }, {});
  }

  const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const events = []
  let monitoringFns = []
  const trackEvent = app.$matomo.trackEvent
  app.$matomo.trackEvent = (category, action, name, value) => {
    const evt = `${category};${action};${name || ''}`
    events.unshift(evt)
    if (events.length > 1000) events.pop()
    trackEvent(category, action, evt, value)
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
  app.$matomo.monitorEvents = (events, fn) => {
    monitoringFns.push({ events, fn, current: 0 })
  }
  app.$matomo.removeEventMonitor = (fn) => {
    console.log('before remove', monitoringFns.length)
    monitoringFns = monitoringFns.filter(mf => mf.fn != fn)
    console.log('after remove', monitoringFns.length)
  }

  chains.forEach(c => app.$matomo.monitorEvents(c.events.split(',').map(s => s.trim()), () => {
    const evt = c.event.split(';')
    app.$matomo.trackEvent(evt[0], evt[1], evt[2] || '')
  }))

  window.onload = () => {
    let { sglid } = getCookies()
    if (!sglid) {
      sglid = uuidv4()
      var exdate=new Date()
      exdate.setDate(exdate.getDate() + 3650)
      document.cookie=`sglid=${sglid}; domain=.supergreenlab.com; path=/; expires=${exdate.toUTCString()}`;
    }
    app.$matomo.setUserId(sglid)
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('ref')) {
      app.$matomo.trackEvent('affiliate', 'visit', urlParams.get('ref'))
    }
  }
}
