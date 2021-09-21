const fs = require('fs/promises')

const { fetchTable, fetchAttachement, emptyAssetsDir, mkAssetsDir, mkStaticDir, noPic } = require('./utils.js')

const { FETCH_DEV_GUIDES } = process.env

module.exports.fetchWidgets = async () => {
  await mkAssetsDir('widgets')
  let widgets = await fetchTable('Widgets', ['slug', 'component', 'title', 'description', 'collections', 'picture', 'link', 'products', 'producttypes', 'plantid', 'guide','date', 'expiration'])
  let shop = await fetchTable('Shop', ['slug', 'menu', 'title', 'description', 'picture', 'location', 'component', 'widgets', 'order', 'test',])

  let picPromise = Promise.resolve()
  widgets = widgets.map(w => {
    w.picture = (w.picture || []).map(a => {
      try {
        const { p, data } = fetchAttachement(picPromise, a, 'widgets')
        picPromise = p
        return data
      } catch(e) {
        return noPic
      }
    })
    return w
  })

  shop = shop.map(s => {
    s.picture = (s.picture || []).map(a => {
      try {
        const { p, data } = fetchAttachement(picPromise, a, 'widgets')
        picPromise = p
        return data
      } catch(e) {
        return noPic
      }
    })
    return s
  })

  await fs.writeFile(`config/widgets.json`, JSON.stringify({ widgets, shop }))
}
