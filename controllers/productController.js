
// load product model
const {dbConfig} = require('../config');
const {ProductModel} = require('../models/productModel');
// pass db connection as constructor parameter
const pm = new ProductModel(dbConfig);

const { GeneralController } = require('./generalController');

class ProductController extends GeneralController{

  listProducts = async (res) => {
    console.log('list all products');
    const result = await pm.selectAll();
    this.setCode(!result.error ? 200 : 403);
    this.setSuccess(!result.error);
    this.setContent(result.error ?? result.rows);
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