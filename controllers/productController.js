
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

  modifyProduct = async (id, content, res) => {
    console.log('modify product');
    const result = await pm.update(id, content);
    this.setCode(result.rows.affectedRows>0 ? 200 : 404);
    this.setSuccess(result.rows.affectedRows>0);
    this.setContent(result.rows.affectedRows>0 ? result.rows : "Product not found");
    return this.renderApi(res)
  }

}

const productController = new ProductController();
module.exports = {productController};