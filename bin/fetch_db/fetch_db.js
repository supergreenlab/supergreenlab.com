#!/usr/bin/env node

const { fetchProducts } = require('./products.js')
const { fetchGuides } = require('./guides.js')
const { fetchWidgets } = require('./widgets.js')

try {
  fetchProducts()
  fetchGuides()
  fetchWidgets()
} catch(e) {
  console.log(e)
}
