const fs = require('fs/promises')

const { fetchTable, fetchAttachement, emptyAssetsDir, mkAssetsDir, noPic } = require('./utils.js')

const { FETCH_DEV_GUIDES } = process.env

module.exports.fetchGuides = async () => {
  await mkAssetsDir('guides')
  let guides = await fetchTable('Guides', ['slug', 'thumbnail', 'title', 'subtitle', 'text', 'requires', 'sections', 'name', 'media', 'nextslug', 'ready'])
  const guideSections = await fetchTable('GuideSections', ['slug', 'title', 'text', 'media', 'requires', 'order'])
  let picPromise = Promise.resolve()
  guides = guides.filter(g => !!FETCH_DEV_GUIDES || g.ready).map(g => {
    try {
      const { p, data } = fetchAttachement(picPromise, g.media[0], 'guides')
      picPromise = p
      g.media = data
    } catch(e) {
      g.media = noPic
    }
    g.sections = guideSections.filter(gs => g.sections.indexOf(gs.id) != -1).map(gs => {
      try {
        const { p, data } = fetchAttachement(picPromise, gs.media[0], 'guides')
        picPromise = p
        gs.media = data
      } catch(e) {
        gs.media = noPic
      }
      return gs
    }).sort((gs1, gs2) => gs1.order - gs2.order)
    return g
  })
  await picPromise
  for (i in guides) {
    const g = guides[i]
    await fs.writeFile(`config/guide-${g.slug}.json`, JSON.stringify(g))
  }
  await fs.writeFile(`config/guides.json`, JSON.stringify(guides))
}
