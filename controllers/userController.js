
// load user model
const {dbConfig} = require('../config');
const {UserModel} = require('../models/userModel');
// pass db connection as constructor parameter
const um = new UserModel(dbConfig);

const { GeneralController } = require('./generalController');

class UserController extends GeneralController{
  listUser = async (res) => {
    const result = await um.selectAll();
    this.setCode(!result.error ? 200 : 403);
    this.setSuccess(!result.error);
    this.setContent(result.error ?? result.rows);
    return this.renderApi(res);
  }

  insertUser = async (content, res) => {
    const result = await um.insert(content);
    this.setCode(!result.error ? 201 : 400);
    this.setSuccess(!result.error);
    this.setContent(result.error ?? result.rows);
    return this.renderApi(res);
  }

  modifyUser = async (id, content, res) => {
    console.log('modify user : ', id);
    const result = await um.update(id, content);
    this.setCode(result.rows.affectedRows>0 ? 200 : 404);
    this.setSuccess(result.rows.affectedRows>0);
    this.setContent(result.rows.affectedRows>0 ? result.rows : "User not found");
    return this.renderApi(res);
  }

  deleteUser = async (id, res) => {
    console.log('delete user : ', id);
    const result = await um.delete(id);
    this.setCode(result.rows.affectedRows>0 ? 200 : 404);
    this.setSuccess(result.rows.affectedRows>0);
    this.setContent(result.rows.affectedRows>0 ? result.rows : "User not found");
    return this.renderApi(res);
  }
}


const userController = new UserController();
module.exports = {userController};