const fs = require('fs/promises')

const { fetchTable, fetchAttachement, emptyAssetsDir, mkAssetsDir } = require('./utils.js')

module.exports.fetchGuides = async () => {
  await mkAssetsDir('guides')
  let guides = await fetchTable('Guides', ['slug', 'thumbnail', 'title', 'subtitle', 'text', 'requires', 'sections', 'name', 'media', 'next'])
  const guideSections = await fetchTable('GuideSections', ['slug', 'title', 'text', 'media', 'requires', 'order'])
  let picPromise = Promise.resolve()
  guides = guides.map(g => {
    try {
      const { p, data } = fetchAttachement(picPromise, g.media[0], 'guides')
      picPromise = p
      g.media = data
    } catch(e) {
      console.log(e)
    }
    g.introduction = g.text
    g.sections = guideSections.filter(gs => g.sections && g.sections.indexOf(gs.id) != -1).map(gs => {
      try {
        const { p, data } = fetchAttachement(picPromise, gs.media[0], 'guides')
        picPromise = p
        gs.media = data
      } catch(e) {
        console.log(e)
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
}
