const {GeneralModel} = require("./generalModel");

class OrderModel extends GeneralModel {

  constructor(connection){
    super(connection);
    console.log('construct order')
  }

  async selectAll(){
    // no need of prepared statement here
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.query("SELECT * FROM orders"));
    }
    catch(error){
      this.queryResult.error = error.sqlMessage;
    }
    return this.queryResult; 
  }

  

  async delete(id){
    // use a prepared statement to avoid SQL injection
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.execute(
        'DELETE FROM orders WHERE `id` = ?', [id]));
    }
    catch(error){
      this.queryResult.error = error.sqlMessage;
    }
    return this.queryResult;
  }
}

module.exports = {OrderModel};