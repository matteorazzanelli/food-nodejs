
// load product model
console.log('---------------------')
const {dbConfig} = require('../config');
const {ProductModel} = require('../models/productModel');
const pm = new ProductModel(dbConfig);
console.log('---------------------')

const { GeneralController } = require('./generalController');

class ProductController extends GeneralController{

  listProducts = async (req, res) => {
    console.log('listProducts');
    const result = await pm.selectAll();
    this.setCode(result.error ? 403 : 200);
    this.setSuccess(!result.error);
    this.setContent(result.error ? "Access denied" : result.rows);
    return this.renderApi(res)
  }

  findProduct = (val) => {
    console.log('findProduct : ',val);
  }

  addProduct = (productInfo) => {
    console.log('add : ',productInfo);
  }

}

const productController = new ProductController();
module.exports = {productController};