const fs = require('fs/promises')
const merge = require('deepmerge')

const { fetchTable, fetchAttachement, jsonOrYaml, emptyAssetsDir, mkAssetsDir, noPic } = require('./utils.js')

module.exports.fetchProducts = async () => {
  await mkAssetsDir('products')
  await mkAssetsDir('sellers')
  await mkAssetsDir('brandproducts')
  await mkAssetsDir('brands')
  await mkAssetsDir('regions')
  let products = await fetchTable('Products', ['slug', 'name', 'tagline', 'pics', 'description', 'bulletpoints', 'SellingPoints', 'type'])
  let sellingPoints = (await fetchTable('SellingPoints', ['slug', 'url', 'regions', 'Product', 'Seller', 'price', 'currency', 'outofstock', 'canorder', 'params', 'BrandProduct']))
  let sellers = await fetchTable('Sellers', ['slug', 'name', 'logo', 'description', 'url', 'regions', 'type', 'params'])
  let brandProducts = await fetchTable('BrandProducts', ['slug', 'name', 'tagline', 'description', 'bulletpoints', 'pics', 'url', 'Brand', 'specs', 'variantOf'])
  let brands = await fetchTable('Brands', ['slug', 'name', 'description', 'logo', 'url'])
  let regions = await fetchTable('Regions', ['code', 'name', 'flag', 'level', 'in'])

  let picPromise = Promise.resolve()
  const regionLevels = ['world', 'continent', 'country', 'city']
  regions = regions.map(r => {
    try {
      const { p, data } = fetchAttachement(picPromise, r.flag[0], 'regions')
      r.flag = data
      picPromise = p
    } catch(e) {
      r.flag = noPic
    }
    return r
  }).sort((r1, r2) => {
    const l1 = r1.level[0], l2 = r2.level[0]
    if (regionLevels.indexOf(l1) != regionLevels.indexOf(l2)) return regionLevels.indexOf(l1) - regionLevels.indexOf(l2)
    return r1.code.localeCompare(r2.code)
  })
  sellers = sellers.map(s => {
    s.params = jsonOrYaml(s.params || '{}')
    s.logo = (s.logo || []).map((pic, i) => {
      try {
        const { p, data } = fetchAttachement(picPromise, pic, 'sellers')
        picPromise = p
        return data
      } catch(e) {
        return noPic
      }
    })
    return s
  })
  brands = brands.map(b => {
    b.logo = (b.logo || []).map((pic, i) => {
      try {
        const { p, data } = fetchAttachement(picPromise, pic, 'brands')
        picPromise = p
        return data
      } catch(e) {
        return noPic
      }
    })
    return b
  })
  brandProducts = brandProducts.map(bp => {
    bp.specs = jsonOrYaml(bp.specs || '{}')
    bp.pics = (bp.pics || []).map((pic, i) => {
      try {
        const { p, data } = fetchAttachement(picPromise, pic, 'brandproducts')
        picPromise = p
        return data
      } catch(e) {
        return noPic
      }
    })
    return bp
  }).map(bp => {
    if (!bp.variantOf) return bp
    const variantOf = brandProducts.find(bp2 => bp2.id == bp.variantOf[0])
    bp.name = bp.name || variantOf.name
    bp.tagline = bp.tagline || variantOf.tagline
    bp.description = bp.description || variantOf.description
    bp.bulletpoints = bp.bulletpoints || variantOf.bulletpoints
    bp.specs = merge(variantOf.specs, bp.specs)
    bp.pics = variantOf.pics
    return bp
  })
  sellingPoints = sellingPoints.map(sp => {
    sp.params = jsonOrYaml(sp.params || '{}')
    return sp
  })
  products = products.filter(p => p.SellingPoints).map(p => {
    p.pics = (p.pics || []).map((pic, i) => {
      try {
        const { p, data } = fetchAttachement(picPromise, pic, 'products')
        picPromise = p
        return data
      } catch(e) {
        return noPic
      }
    })
    p.specs = jsonOrYaml(p.specs || '{}')
    p.SellingPoints = sellingPoints.filter(v => p.SellingPoints.indexOf(v.id) != -1)
    const bps = Object.keys(p.SellingPoints.reduce((acc, sp) => { acc[sp.BrandProduct[0]] = true; return acc }, {}))
    if (bps.length == 1) {
      const bp = brandProducts.find(bp => bp.id == bps[0])
      p.name = bp.name
      p.tagline = bp.tagline
      p.description = bp.description
      p.bulletpoints = bp.bulletpoints
      p.specs = bp.specs
      p.pics = bp.pics
    }
    return p
  })
  await picPromise

  const productsJSON = JSON.stringify({
    sellingPoints,
    products,
    sellers,
    brandProducts,
    brands,
    regions,
  })
  await fs.writeFile('config/products.json', productsJSON)
}
