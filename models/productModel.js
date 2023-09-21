const {GeneralModel} = require("./generalModel");

class ProductModel extends GeneralModel {

  constructor(connection){
    super(connection);
    console.log('construct product')
  }

  async selectAll(){
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.query("SELECT * FROM products"));
    }
    catch(error){
      this.queryResult.error = error.sqlMessage;
    }
    return this.queryResult; 
  }

  async insert(content){
    // use a prepared statement to avoid SQL injection
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.execute(
        'INSERT INTO products (name) VALUES (?)', [content]));
    }
    catch(error){
      this.queryResult.error = error.sqlMessage;
    }
    return this.queryResult;
  }

  async update(id, content){
    // use a prepared statement to avoid SQL injection
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