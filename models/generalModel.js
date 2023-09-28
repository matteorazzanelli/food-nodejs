
class GeneralModel {
  constructor(connection){
    this.connection = connection.promise();
    this.queryResult =  {
      rows: undefined, 
      fields:undefined, 
      error:undefined
    };
    console.log('general model');
  }

  async selectAll(table){
    // no need of prepared statement here
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.query(`SELECT * FROM ${table}`));
    }
    catch(error){
      this.queryResult.error = error.sqlMessage;
    }
    return this.queryResult; 
  }

  async selectProduct(id, table){
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.query(`SELECT * FROM ${table} WHERE id = ?`,[id]));
    }
    catch(error){
      this.queryResult.error = error.sqlMessage;
    }
    return this.queryResult; 
  }

  async delete(id, table){
    // use a prepared statement to avoid SQL injection
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.execute(
        `DELETE FROM ${table} WHERE id = ?`, [id]));
    }
    catch(error){
      this.queryResult.error = error.sqlMessage;
    }
    return this.queryResult;
  }

  async checkForeignKeys(array, table){
    for(let i = 0; i < array.length; i ++){
      const result = (await this.selectProduct(array[i], table));
      if(result.rows.length === 0)
        return false;
    }
    return true;
  }
}

module.exports = {GeneralModel};