const fs = require('fs/promises')

const { fetchTable, fetchAttachement, jsonOrYaml, emptyAssetsDir, mkAssetsDir } = require('./utils.js')

module.exports.fetchProducts = async () => {
  await mkAssetsDir('products')
  await mkAssetsDir('sellers')
  await mkAssetsDir('brandproducts')
  await mkAssetsDir('brands')
  let products = await fetchTable('Products', ['slug', 'name', 'tagline', 'pics', 'description', 'bulletpoints', 'specs', 'SellingPoints', 'type'])
  let sellingPoints = (await fetchTable('SellingPoints', ['slug', 'url', 'regions', 'Product', 'Seller', 'price', 'currency', 'outofstock', 'canorder', 'params', 'specs', 'BrandProduct']))
  let sellers = await fetchTable('Sellers', ['slug', 'name', 'logo', 'description', 'url', 'regions', 'type', 'params'])
  let brandProducts = await fetchTable('BrandProducts', ['slug', 'name', 'description', 'pics', 'url', 'Brand'])
  let brands = await fetchTable('Brands', ['slug', 'name', 'description', 'logo', 'url'])

  let picPromise = Promise.resolve()
  sellingPoints = sellingPoints.map(sp => {
    sp.params = jsonOrYaml(sp.params || '{}')
    sp.specs = jsonOrYaml(sp.specs || '{}')
    return sp
  })
  products = products.map(p => {
    p.pics = p.pics.map((pic, i) => {
      const { p, data } = fetchAttachement(picPromise, pic, 'products')
      picPromise = p
      return data
    })
    p.specs = jsonOrYaml(p.specs || '{}')
    p.SellingPoints = sellingPoints.filter(v => p.SellingPoints.indexOf(v.id) != -1)
    return p
  })
  sellers = sellers.map(s => {
    s.params = jsonOrYaml(s.params || '{}')
    if (!s.logo) return s
    s.logo = s.logo.map((pic, i) => {
      const { p, data } = fetchAttachement(picPromise, pic, 'sellers')
      picPromise = p
      return data
    })
    return s
  })
  brandProducts = brandProducts.map(bp => {
    if (!bp.pics) return bp
    bp.pics = bp.pics.map((pic, i) => {
      const { p, data } = fetchAttachement(picPromise, pic, 'brandproducts')
      picPromise = p
      return data
    })
    return bp
  })
  brands = brands.map(b => {
    if (!b.logo) return b
    b.logo = b.logo.map((pic, i) => {
      const { p, data } = fetchAttachement(picPromise, pic, 'brands')
      picPromise = p
      return data
    })
    return b
  })
  await picPromise

  const productsJSON = JSON.stringify({
    sellingPoints,
    products,
    sellers,
    brandProducts,
    brands,
  })
  await fs.writeFile('config/products.json', productsJSON)
}
