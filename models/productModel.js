const {GeneralModel} = require("./generalModel");

class ProductModel extends GeneralModel {

  constructor(connection){
    super(connection);
    console.log('product model')
  }
  
}

module.exports = {ProductModel};