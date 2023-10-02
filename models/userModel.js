const {GeneralModel} = require("./generalModel");

class UserModel extends GeneralModel {

  constructor(connection){
    super(connection);
    console.log('user model')
  }
  
}

module.exports = {UserModel};