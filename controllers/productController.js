
// load product model
console.log('---------------------')
const {dbConfig} = require('../config');
const {ProductModel} = require('../models/productModel');
const pm = new ProductModel(dbConfig);
console.log('---------------------')

const listProducts = async (req, res) => {
  console.log('listProducts');
  const result = await pm.selectAll();
  const statusCode = result.error ? 403 : 200;
  const success = result.error ? false : true;
  const msg = result.error ? "Access denied" : result.rows;
  return res.status(statusCode).json({success: success, msg: msg});
}

const findProduct = (val) => {
  console.log('findProduct : ',val);
}

const addProduct = (productInfo) => {
  console.log('add : ',productInfo);
}

module.exports = {
  listProducts,
  findProduct,
  addProduct
}