const {GeneralModel} = require("./generalModel");

class UserModel extends GeneralModel {

  constructor(connection){
    super(connection);
    console.log('construct user')
  }

  selectAll(){
    this.connection.query("select * from orders",(err, res)=>{
      return console.log(res);
    });
  }

}

module.exports = {UserModel};