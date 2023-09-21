const {GeneralModel} = require("./generalModel");

class UserModel extends GeneralModel {

  constructor(connection){
    super(connection);
    console.log('construct user')
  }

  async selectAll(){
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.query("select * from users"));
    }
    catch(error){
      this.queryResult.error = error.sqlMessage
    }
    return this.queryResult;
  }

}

module.exports = {UserModel};