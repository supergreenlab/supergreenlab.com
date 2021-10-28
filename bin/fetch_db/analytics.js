const fs = require('fs/promises')
const merge = require('deepmerge')

const { fetchTable, } = require('./utils.js')

module.exports.fetchAnalytics = async () => {
  let chains = await fetchTable('AnalyticsChains', ['slug', 'events', 'event'])
  await fs.writeFile('config/analytics.json', JSON.stringify({
    chains,
  }))
}
