
let users = module.exports = {}

users.index = (req, res) => {
  console.log('get all users');
}

users.show = (req, res) => {
  console.log('get '+req.params.id+' user');
}

users.create = (req, res, next) => {
  console.log('create user : '+req.body)
}
