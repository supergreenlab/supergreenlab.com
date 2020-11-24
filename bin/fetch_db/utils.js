const fs = require('fs/promises')

const YAML = require('yaml')
const axios = require('axios')

const assetsPath = 'assets/img'

const Airtable = require('airtable')

const { AIRTABLE_BASE, AIRTABLE_APIKEY } = process.env
Airtable.configure({ apiKey: AIRTABLE_APIKEY })
const eshop = Airtable.base(AIRTABLE_BASE)

const fetchFile = async (url, dst) => {
  dst = `${assetsPath}/${dst}`
  console.log(`Fetching file ${url} to ${dst}`)
  try {
    if (await fs.access(dst) == null) {
      console.log(`${dst} already exists, skipping..`)
      return
    }
  } catch(e) {}
  const response = await axios.get(url, { responseType: 'arraybuffer' })
  await fs.writeFile(dst, response.data)
  console.log(`Fetched file ${url} to ${dst}`)
}

module.exports.emptyAssetsDir = async (dir) => {
  dir = `${assetsPath}/${dir}`
  await fs.rmdir(dir, { recursive: true })
  await fs.mkdir(dir)
}

module.exports.mkAssetsDir = async (dir) => {
  dir = `${assetsPath}/${dir}`
  try {
    await fs.mkdir(dir)
  } catch(e) {}
}

module.exports.fetchAttachement = (p, attachement, dir) => {
  if (attachement.type.indexOf('image/') == 0) {
    const ext = attachement.type.split('/')[1]
    const fileLarge = `${dir}/${attachement.id}.${ext}`, fileSmall = `${dir}/${attachement.id}_small.${ext}`
    p = p.then(async () => {
      await fetchFile(attachement.thumbnails.small.url, fileSmall)
      await fetchFile(attachement.thumbnails.large.url, fileLarge)
    })
    return { p, attachement, data: { fileLarge, fileSmall, type: attachement.type } }
  } else if (attachement.type.indexOf('video/') == 0) {
    const ext = attachement.type.split('/')[1]
    const filePath = `${dir}/${attachement.id}.${ext}`
    p = p.then(async () => {
      await fetchFile(attachement.url, filePath)
    })
    return { p, data: { filePath, type: attachement.type } }
  }

}

module.exports.fetchTable = (table, fields) => {
  console.log(`Fetching items from ${table}`)
  return new Promise((resolve, reject) => {
    const items = []
    eshop(table).select({
      fields,
    })
      .eachPage((records, fetchNextPage) => {
        records.forEach(record => {
          const item = Object.assign({id: record.id}, record.fields)
          items.push(item)
        })
        fetchNextPage()
      },
      (err) => {
        if (err) {
          console.log(err)
          reject(err)
          return
        }
        resolve(items)
      })
  })
}

module.exports.jsonOrYaml = (str) => {
  try {
    return JSON.parse(str)
  } catch(e) {
    try {
      return YAML.parse(str)
    } catch(e) {
      console.log(e)
      console.log(`str was ${str}`)
    }
  }
  return {}
}
