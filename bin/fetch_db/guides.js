const fs = require('fs/promises')

const { fetchTable, fetchAttachement, emptyAssetsDir, mkAssetsDir, mkStaticDir, noPic } = require('./utils.js')

const { FETCH_DEV_GUIDES } = process.env

module.exports.fetchGuides = async () => {
  await mkAssetsDir('guides')
  await mkAssetsDir('links')
  await mkStaticDir('guides')

  let guides = await fetchTable('Guides', ['slug', 'thumbnail', 'title', 'subtitle', 'text', 'requires', 'sections', 'name', 'media', 'nextslug', 'ready', 'first', 'relatedGuides', 'links', 'attachements','order', 'duration', 'difficulty','author','credit', 'createdat'])
  const guideSections = await fetchTable('GuideSections', ['slug', 'title', 'text', 'media', 'requires', 'order', 'links', 'attachements', 'showdone', 'author', 'credit',])
  let bookmarks = await fetchTable('Bookmarks', ['slug', 'title', 'description', 'icon', 'url'])

  let picPromise = Promise.resolve()
  guides = guides.filter(g => !!FETCH_DEV_GUIDES || g.ready).map(g => {
    g = Object.assign({}, g)
    g.attachements = (g.attachements || []).map(a => {
      try {
        const { p, data } = fetchAttachement(picPromise, a, 'guides')
        picPromise = p
        return data
      } catch(e) {
        return noPic
      }
    })
    try {
      const { p, data } = fetchAttachement(picPromise, g.media[0], 'guides')
      picPromise = p
      g.media = data
    } catch(e) {
      g.media = noPic
    }
    try {
      const { p, data } = fetchAttachement(picPromise, g.thumbnail[0], 'guides')
      picPromise = p
      g.thumbnail = data
    } catch(e) {
      g.thumbnail = noPic
    }
    return g
  })
  const guidesWithSections = guides.filter(g => !!FETCH_DEV_GUIDES || g.ready).map(g => {
    g = Object.assign({}, g)
    g.links = (g.links || []).map(l => bookmarks.find(b => b.id == l))

    g.sections = guideSections.filter(gs => (g.sections || []).indexOf(gs.id) != -1).map(gs => {
      gs = Object.assign({}, gs)
      gs.attachements = (gs.attachements || []).map(a => {
        try {
          const { p, data } = fetchAttachement(picPromise, a, 'guides')
          picPromise = p
          return data
        } catch(e) {
          return noPic
        }
      })
      try {
        const { p, data } = fetchAttachement(picPromise, gs.media[0], 'guides')
        picPromise = p
        gs.media = data
      } catch(e) {
        gs.media = noPic
      }
      gs.links = (gs.links || []).map(l => bookmarks.find(b => b.id == l))
      return gs
    }).sort((gs1, gs2) => gs1.order - gs2.order)
    return g
  })
  const guidesWithLiteSections = guides.filter(g => !!FETCH_DEV_GUIDES || g.ready).map(g => {
    g = Object.assign({}, g)
    g.sections = guideSections.filter(gs => (g.sections || []).indexOf(gs.id) != -1).map(gs => {
      return {
        id: gs.id,
        slug: gs.slug,
        showdone: gs.showdone,
      }
    })
    return g
  })
  bookmarks = bookmarks.map(b => {
    try {
      const { p, data } = fetchAttachement(picPromise, b.icon[0], 'links')
      picPromise = p
      b.icon = data
    } catch(e) {
      b.icon = noPic
    }
    return b
  })
  await picPromise
  for (i in guidesWithSections) {
    const g = guidesWithSections[i]
    await fs.writeFile(`config/guide-${g.slug}.json`, JSON.stringify(g))
  }
  await fs.writeFile(`config/guides.json`, JSON.stringify({ guides: guidesWithLiteSections, bookmarks }))
}
