const fs = require('fs/promises')

const YAML = require('yaml')
const axios = require('axios')

const sharp = require('sharp')

const assetsPath = 'assets/img'
const staticPath = 'static'

const Airtable = require('airtable')

const { AIRTABLE_BASE, AIRTABLE_APIKEY } = process.env
Airtable.configure({ apiKey: AIRTABLE_APIKEY })
const eshop = Airtable.base(AIRTABLE_BASE)

const fetchFile = async (url, dst, path=assetsPath) => {
  dst = `${path}/${dst}`
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

module.exports.noPic = {
  fileLarge: 'nopic.svg',
  fileSmall: 'nopic.svg',
  fileFull: 'nopic.svg'
}

const emptyAssetsDir = async (dir) => {
  dir = `${assetsPath}/${dir}`
  await fs.rmdir(dir, { recursive: true })
  await fs.mkdir(dir)
}

module.exports.emptyAssetsDir = emptyAssetsDir

const mkAssetsDir = async (dir) => {
  dir = `${assetsPath}/${dir}`
  try {
    await fs.mkdir(dir)
  } catch(e) {}
}
module.exports.mkAssetsDir = mkAssetsDir

module.exports.mkStaticDir = async (dir) => {
  dir = `${staticPath}/${dir}`
  try {
    await fs.mkdir(dir)
  } catch(e) {}
}
module.exports.fetchAttachement = (p, attachement, dir) => {
  if (attachement.type.indexOf('image/') == 0) {
    let ext = attachement.type.split('/')[1]
    if (ext == 'svg+xml') ext = 'png'
    const thumbnails = attachement.thumbnails || {
      small: {url: attachement.url},
      large: {url: attachement.url},
      full: {url: attachement.url}
    }
    const fileLarge = `${attachement.id}.${ext}`,
      fileSmall = `${attachement.id}_small.${ext}`,
      fileFull = `${attachement.id}_full.${ext}`,
      finalFileLarge = `${attachement.id}.jpg`,
      finalFileSmall = `${attachement.id}_small.jpg`,
      finalFileFull = `${attachement.id}_full.jpg`
    p = p.then(async () => {
      await fetchFile(thumbnails.small.url, `tmp/${fileSmall}`)
      await fetchFile(thumbnails.large.url, `tmp/${fileLarge}`)
      await fetchFile(thumbnails.full.url, `tmp/${fileFull}`)

      console.log(`resizing:\n${dir}/${fileSmall} ${dir}/${fileLarge} ${dir}/${fileFull}`)
      await sharp(`${assetsPath}/tmp/${fileSmall}`).resize(100, 100, {fit: 'inside', withoutEnlargement: true}).flatten( { background: '#ffffff' } ).jpeg().toFile(`${assetsPath}/${dir}/${finalFileSmall}`)
      await sharp(`${assetsPath}/tmp/${fileLarge}`).resize(400, 400, {fit: 'inside', withoutEnlargement: true}).flatten( { background: '#ffffff' } ).jpeg().toFile(`${assetsPath}/${dir}/${finalFileLarge}`)
      await sharp(`${assetsPath}/tmp/${fileFull}`).resize(600, 600, {fit: 'inside', withoutEnlargement: true}).flatten( { background: '#ffffff' } ).jpeg().toFile(`${assetsPath}/${dir}/${finalFileFull}`)
    })

    return { p, attachement, data: { fileLarge: `${dir}/${finalFileLarge}`, fileSmall: `${dir}/${finalFileSmall}`, fileFull: `${dir}/${finalFileFull}`, type: attachement.type } }
  } else if (attachement.type.indexOf('video/') == 0) {
    const ext = attachement.type.split('/')[1]
    const filePath = `${dir}/${attachement.id}.${ext}`
    p = p.then(async () => {
      await fetchFile(attachement.url, filePath)
    })
    return { p, attachement, data: { filePath, type: attachement.type } }
  } else if (attachement.type == 'application/pdf') {
    const filePath = `${dir}/${attachement.id}.pdf`,
      fileLarge = `${dir}/${attachement.id}.png`,
      fileSmall = `${dir}/${attachement.id}_small.png`
    p = p.then(async () => {
      await fetchFile(attachement.url, filePath, staticPath)
      await fetchFile(attachement.thumbnails.small.url, fileSmall)
      await fetchFile(attachement.thumbnails.large.url, fileLarge)
    })
    return { p, attachement, data: { fileName: attachement.filename, fileLarge, fileSmall, filePath, type: attachement.type } }
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
