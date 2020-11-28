const fs = require('fs/promises')

const { fetchTable, fetchAttachement, jsonOrYaml, emptyAssetsDir, mkAssetsDir } = require('./utils.js')

module.exports.fetchProducts = async () => {
  await mkAssetsDir('products')
  await mkAssetsDir('sellers')
  await mkAssetsDir('brandproducts')
  await mkAssetsDir('brands')
  const products = await fetchTable('Products', ['slug', 'name', 'tagline', 'pics', 'description', 'bulletpoints', 'specs', 'SellingPoints', 'type'])
  const sellingPoints = await fetchTable('SellingPoints', ['url', 'regions', 'Seller', 'price', 'currency', 'outofstock', 'canorder', 'params', 'specs', 'BrandProduct'])
  const sellers = await fetchTable('Sellers', ['slug', 'name', 'logo', 'description', 'url', 'regions', 'type', 'params'])
  const brandProducts = await fetchTable('BrandProducts', ['slug', 'name', 'description', 'pics', 'url', 'brand'])
  const brands = await fetchTable('Brands', ['slug', 'name', 'description', 'logo', 'url'])
  let picPromise = Promise.resolve()
  const productsJSON = JSON.stringify({
    products: products.map(p => {
      p.pics = p.pics.map((pic, i) => {
        const { p, data } = fetchAttachement(picPromise, pic, 'products')
        picPromise = p
        return data
      })
      p.specs = jsonOrYaml(p.specs || '{}')
      p.SellingPoints = sellingPoints.filter(v => p.SellingPoints.indexOf(v.id) != -1).map(sp => {
        sp.params = jsonOrYaml(sp.params || '{}')
        sp.specs = jsonOrYaml(sp.specs || '{}')
        return sp
      })
      return p
    }),
    sellers: sellers.map(s => {
      s.params = jsonOrYaml(s.params || '{}')
      if (!s.logo) return s
      s.logo = s.logo.map((pic, i) => {
        const { p, data } = fetchAttachement(picPromise, pic, 'sellers')
        picPromise = p
        return data
      })
      return s
    }),
    brandProducts: brandProducts.map(bp => {
      if (!bp.pics) return bp
      bp.pics = bp.pics.map((pic, i) => {
        const { p, data } = fetchAttachement(picPromise, pic, 'brandproducts')
        picPromise = p
        return data
      })
      return bp
    }),
    brands: brands.map(b => {
      if (!b.logo) return b
      b.logo = b.logo.map((pic, i) => {
        const { p, data } = fetchAttachement(picPromise, pic, 'brands')
        picPromise = p
        return data
      })
      return b
    }),
  })
  await picPromise
  await fs.writeFile('config/products.json', productsJSON)
}
