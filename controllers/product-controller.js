
const listProducts = () => {
  console.log('listProducts');
}

const findProduct = (val) => {
  console.log('finProduct : ',val);
}

const addProduct = (productInfo) => {
  console.log('add : ',productInfo);
}

module.exports = {
  listProducts,
  findProduct,
  addProduct
}