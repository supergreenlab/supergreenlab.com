const fs = require('fs/promises')

const { fetchTable, fetchAttachement, jsonOrYaml, emptyAssetsDir, mkAssetsDir } = require('./utils.js')

module.exports.fetchProducts = async () => {
  await mkAssetsDir('products')
  const products = await fetchTable('Products', ['slug', 'name', 'tagline', 'pics', 'description', 'bulletpoints', 'specs', 'SellingPoints', 'type'])
  const sellingPoints = await fetchTable('SellingPoints', ['url', 'regions', 'vendor', 'price', 'currency', 'outofstock', 'canorder', 'params', 'specs', 'BrandProduct'])
  const sellers = await fetchTable('Sellers', ['slug', 'name', 'logo', 'description', 'url', 'regions', 'type'])
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
    sellers,
    brandProducts,
    brands
  })
  await picPromise
  await fs.writeFile('config/products.json', productsJSON)
}
