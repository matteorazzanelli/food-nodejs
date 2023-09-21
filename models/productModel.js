const {GeneralModel} = require("./generalModel");

class ProductModel extends GeneralModel {

  constructor(connection){
    super(connection);
    console.log('construct product')
  }

  async selectAll(){
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.query("select * from products"));
    }
    catch(error){
      this.queryResult.error = error.sqlMessage;
    }
    return this.queryResult; 
  }

  async update(id, content){
    // use a prepared statement
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.execute(
        'UPDATE products SET `name` = ? WHERE `id` = ?', [content, id]));
    }
    catch(error){
      this.queryResult.error = error.sqlMessage;
    }
    return this.queryResult;
  }
}

module.exports = {ProductModel};