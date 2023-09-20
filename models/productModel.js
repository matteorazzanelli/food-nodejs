const {GeneralModel} = require("./generalModel");

class ProductModel extends GeneralModel {

  constructor(connection){
    super(connection);
    console.log('construct product')
  }

  async selectAll(){
    let result = {rows: undefined, fields:undefined, error:undefined};
    try{
      [result.rows, result.fields] = (await this.connection.query("select * from products"));
    }
    catch(error){
      result.error = error.sqlMessage
    }
    return result; 
  }
}

module.exports = {ProductModel};