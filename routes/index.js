const express = require('express')
const router = express.Router()

const products = require('./product-routes')
const users = require('./user-routes')

router
  .get('/products', products.index)
  .get('/products/:id', products.show)
  .post('/products', products.create)

router
  .get('/users', users.index)
  .get('/users/:id', users.show)
  .post('/users', users.create)
  

module.exports = router