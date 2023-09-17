
let products = module.exports = {}

products.index = (req, res) => {
  console.log('get all products');
}

products.show = (req, res) => {
  console.log('get '+req.params.id+' product');
}

products.create = (req, res, next) => {
  console.log('create product : '+req.body)
}
