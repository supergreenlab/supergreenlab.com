#!/usr/bin/env node

const { fetchProducts } = require('./products.js')
const { fetchGuides } = require('./guides.js')
const { fetchWidgets } = require('./widgets.js')
const { fetchAnalytics } = require('./analytics.js')

try {
  fetchProducts()
  fetchGuides()
  fetchWidgets()
  fetchAnalytics()
} catch(e) {
  console.log(e)
}
