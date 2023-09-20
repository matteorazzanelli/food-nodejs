
// load user model
console.log('---------------------')
const {dbConfig} = require('../config');
const {UserModel} = require('../models/userModel');
const um = new UserModel(dbConfig);
console.log('---------------------')


const listUsers = () => {
  console.log('listUsers');
  um.selectAll();
}

const findUser = (val) => {
  console.log('finUser : ',val);
}

const addUser = (userInfo) => {
  console.log('add : ',userInfo);
}

module.exports = {
  listUsers,
  findUser,
  addUser
}