
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

  async select(id, table){
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
      const result = (await this.select(array[i], table));
      if(result.rows.length === 0)
        return false;
    }
    return true;
  }

  async update(id, content, table){
    // retrieve the field to update
    let k = Object.keys(content);
    let v = Object.values(content);
    let props = k.join(" = ?, ") + " = ?";
    let values = v.concat([id])
    console.log(table, k, v, props, values)
    // use a prepared statement to avoid SQL injection
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.execute(`UPDATE ${table} SET ${props} WHERE id = ?`, values));
      }
    catch(error){
      this.queryResult.error = error.sqlMessage;
    }
    return this.queryResult;
  }

  async insert(content, table){
    // use a prepared statement to avoid SQL injection
    let k = Object.keys(content);
    let values = Object.values(content);
    let props = "(" + k.join(", ") + ")";
    let placeholder = '('+values.map((item)=>{return '?'})+')';
    console.log(props, placeholder, values)
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.execute(
        `INSERT INTO ${table} ${props} VALUES ${placeholder}`, values));
    }
    catch(error){
      this.queryResult.error = error.sqlMessage;
    }
    return this.queryResult;
  }
}

module.exports = {GeneralModel};