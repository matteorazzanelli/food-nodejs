const express = require('express');
const router = express.Router();

const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');

// using specific routes middleware for products and users
router
  .get('/', ()=>{console.log('-------->HOME<----------')})
  .use('/products', productRoutes)
  .use('/users', userRoutes);

module.exports = router;