const fs = require('fs/promises')

const { fetchTable, fetchAttachement, emptyAssetsDir } = require('./utils.js')

module.exports.fetchGuides = async () => {
  try {
    await fs.rm('config/guides.json')
  } catch(e) {}
  try {
    await emptyAssetsDir('guides')
  } catch(e) {}

  const guides = await fetchTable('Guides', ['slug', 'thumbnail', 'title', 'subtitle', 'introduction', 'requires', 'sections', 'name', 'medias'])
  const guideSections = await fetchTable('GuideSections', ['slug', 'title', 'text', 'media', 'requires'])
  let picPromise = Promise.resolve()
  const guidesJSON = JSON.stringify({
    guides: guides.map(g => {
    g.sections = guideSections.filter(gs => g.sections.indexOf(gs.id) != -1).map(gs => {
      const { p, data } = fetchAttachement(picPromise, gs.media[0], 'guides')
      picPromise = p
      gs.media = data
      return gs
    })
    return g
    })
  })
  await picPromise
  await fs.writeFile('config/guides.json', guidesJSON)
}
