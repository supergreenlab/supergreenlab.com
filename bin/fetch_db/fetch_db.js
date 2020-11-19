#!/bin/env node

const { fetchProducts } = require('./products.js')
const { fetchGuides } = require('./guides.js')

try {
  fetchProducts()
  fetchGuides()
} catch(e) {
  console.log(e)
}
