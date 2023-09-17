const express = require('express');
const router = express.Router();

// load product controller
const productController = require('../controllers/product-controller');

//middleware to handle req.body
router.use(express.json());

router.get('/', (req, res)=>{
  console.log('get all products');
  productController.listProducts();
})

router.get('/:id',(req, res)=>{
  console.log('get product : '+req.params.id);
  productController.findProduct(req.params.id);
})

router.post('/', (req,res)=>{
  console.log('create product : '+req.body)
  productController.addProduct(req.body);
})

module.exports = router;