const listUsers = () => {
  console.log('listUsers');
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