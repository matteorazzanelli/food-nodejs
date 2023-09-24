const express = require('express');
const router = express.Router();

const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes')

// using specific routes middleware for products and users
router
  .get('/', ()=>{console.log('-------->HOME<----------')})
  .use('/products', productRoutes)
  .use('/users', userRoutes)
  .use('/orders', orderRoutes);

module.exports = router;