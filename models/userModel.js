const {GeneralModel} = require("./generalModel");

class UserModel extends GeneralModel {

  constructor(connection){
    super(connection);
    console.log('construct user')
  }

  async insert(content){
    // use a prepared statement to avoid SQL injection
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.execute(
        'INSERT INTO users (name, surname, email) VALUES (?,?,?)', 
        [content.name ?? null, content.surname ?? null, content.email ?? null]));
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
        'UPDATE users SET `name` = ?, `surname` = ?, `email` = ? WHERE `id` = ?', 
        [content.name ?? null, content.surname ?? null, content.email ?? null, id ]));
      }
    catch(error){
      this.queryResult.error = error.sqlMessage;
    }
    return this.queryResult;
  }

}

module.exports = {UserModel};