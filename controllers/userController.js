
// load user model
const {dbConfig} = require('../config');
const {UserModel} = require('../models/userModel');
// pass db connection as constructor parameter
const um = new UserModel(dbConfig);

const { GeneralController } = require('./generalController');

class UserController extends GeneralController{
  listUsers = async (req, res) => {
    console.log('listUsers');
    const result = await um.selectAll();
    this.setCode(result.error ? 403 : 200);
    this.setSuccess(!result.error);
    this.setContent(result.error ?? result.rows);
    return this.renderApi(res);
  }
  
  findUser = (val) => {
    console.log('finUser : ',val);
  }
  
  addUser = (userInfo) => {
    console.log('add : ',userInfo);
  }
}


const userController = new UserController();
module.exports = {userController};