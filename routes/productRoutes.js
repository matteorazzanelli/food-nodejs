const express = require('express');
const router = express.Router();

// load product controller
const { productController } = require('../controllers/productController');

//middleware to handle req.body
router.use(express.json());

router.get('/', (req, res) => {
  return productController.listProducts(res);
})

router.post('/', (req, res) => {
  const {content} = req.body;
  return productController.insertProduct(content, res);
})

router.put('/:id', (req,res) => {
  const {id} = req.params;
  const {content} = req.body;
  // per ogni campo del req.body modificare il campo del record
  return productController.modifyProduct(id, content, res);
})

module.exports = router;