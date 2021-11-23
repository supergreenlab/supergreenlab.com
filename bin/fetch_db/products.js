const fs = require('fs/promises')
const merge = require('deepmerge')

const { fetchTable, fetchAttachement, jsonOrYaml, emptyAssetsDir, mkAssetsDir, mkStaticDir, noPic } = require('./utils.js')

module.exports.fetchProducts = async () => {
  await mkAssetsDir('tmp')
  await mkAssetsDir('products')
  await mkAssetsDir('collections')
  await mkAssetsDir('sellers')
  await mkAssetsDir('brandproducts')
  await mkAssetsDir('brands')
  await mkAssetsDir('regions')
  await mkAssetsDir('files')
  await mkStaticDir('files')

  //await emptyAssetsDir('tmp')

  let products = (await fetchTable('Products', ['slug', 'name', 'tagline', 'pics', 'description', 'bulletpoints', 'SellingPoints', 'type', 'ready', 'links'])).filter(p => p.ready)
  let sellingPoints = (await fetchTable('SellingPoints', ['slug', 'url', 'region', 'Product', 'Seller', 'price', 'currency', 'outofstock', 'canorder', 'params', 'BrandProduct', 'ready', 'offer', 'offertext', 'inctax', 'nopromo', 'freeshipping'])).filter(sp => sp.ready)
  sellingPoints.sort((sp1, sp2) => sp1.price - sp2.price)
  let sellers = await fetchTable('Sellers', ['slug', 'name', 'logo', 'description', 'url', 'regions', 'type', 'params'])
  let brandProducts = (await fetchTable('BrandProducts', ['slug', 'name', 'tagline', 'description', 'bulletpoints', 'pics', 'url', 'Brand', 'specs', 'variantOf', 'ready', 'stls'])).filter(bp => bp.ready)
  let brands = await fetchTable('Brands', ['slug', 'name', 'description', 'logo', 'url'])
  let regions = await fetchTable('Regions', ['code', 'name', 'flag', 'level', 'in', 'currency', 'vat'])
  let collectionProducts = await fetchTable('CollectionProducts', ['slug', 'Product', 'order'])
  let collections = await fetchTable('Collections', ['slug', 'name','picture', 'CollectionProducts', 'description'])
  let relatedProducts = await fetchTable('RelatedProducts', ['slug', 'to', 'product', 'order', 'text'])
  let bookmarks = await fetchTable('Bookmarks', ['slug', 'title', 'description', 'icon', 'url'])
  let files = await fetchTable('Files', ['slug', 'file', 'pic', 'name', 'description', 'BrandProducts',])

  const regionTree = (region, acc=[]) => {
    acc.push(region)
    if (region.in) {
      return regionTree(regions.find(r => r.id == region.in[0]), acc)
    }
    return acc
  }

  let picPromise = Promise.resolve()

  files = files.map(f => {
    try {
      const { p, data } = fetchAttachement(picPromise, f.file[0], 'files')
      picPromise = p
      f.file = data
    } catch(e) {
      throw e
    }

    try {
      const { p, data } = fetchAttachement(picPromise, f.pic[0], 'files')
      picPromise = p
      f.pic = data
    } catch(e) {
      f.pic = noPic
    }

    return f
  })

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
    bp.stls = (bp.stls || []).map(s => files.find(f => f.id == s))
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
  })
  brandProducts = brandProducts.map(bp => {
    if (!bp.variantOf) return bp
    const variantOf = brandProducts.find(bp2 => bp2.id == bp.variantOf[0])
    bp.name = (bp.name || "").trim() || variantOf.name
    bp.tagline = (bp.tagline || "").trim() || variantOf.tagline
    bp.description = (bp.description || "").trim() || variantOf.description
    bp.bulletpoints = (bp.bulletpoints || "").trim() || variantOf.bulletpoints
    bp.specs = merge(variantOf.specs, bp.specs)
    bp.pics = variantOf.pics
    return bp
  })
  sellingPoints = sellingPoints.map(sp => {
    sp.params = jsonOrYaml(sp.params || '{}')
    sp.region =  regionTree(regions.find(r => r.id == sp.region))
    return sp
  })
  products = products.filter(p => p.SellingPoints).map(p => {
    p.links = (p.links || []).map(l => bookmarks.find(b => b.id == l))
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
    const bps = Object.keys(p.SellingPoints.reduce((acc, sp) => {
      const bp = brandProducts.find(bp => bp.id == sp.BrandProduct[0])
      if (bp.variantOf) {
        acc[bp.variantOf[0]] = true
      } else {
        acc[sp.BrandProduct[0]] = true
      }
      return acc
    }, {}))
    if (bps.length == 1) {
      const bp = brandProducts.find(bp => bp.id == bps[0])
      p.name = (p.name || "").trim() || bp.name
      p.tagline = (p.tagline || "").trim() || bp.tagline
      p.description = (p.description || "").trim() || bp.description
      p.bulletpoints = (p.bulletpoints || "").trim() || bp.bulletpoints
      p.pics = bp.pics
      p.specs = bp.specs
    }
    return p
  })

  collections = collections.map(c => {
    c.CollectionProducts = collectionProducts.filter(u => c.CollectionProducts.indexOf(u.id) != -1)
    c.picture = (c.picture || []).map(a => {
      try {
        const { p, data } = fetchAttachement(picPromise, a, 'collections')
        picPromise = p
        return data
      } catch(e) {
        return noPic
      }
    })
    return c
  })

  await picPromise

  const productsJSON = JSON.stringify({
    sellingPoints,
    products,
    sellers,
    brandProducts,
    brands,
    regions,
    collections,
    relatedProducts,
    bookmarks,
  })
  await fs.writeFile('config/products.json', productsJSON)
  //await emptyAssetsDir('tmp')
}
