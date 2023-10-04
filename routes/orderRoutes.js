const express = require('express');
const router = express.Router();

// load order controller
const { orderController } = require('../controllers/orderController');

// load middleware
const {insertOrderMiddleware, filterOrderMiddleware} = require('../middleware/orderMiddleware');

//middleware to handle req.body
router.use(express.json());

router.get('/', (req, res) => {
  return orderController.listOrders(res);
})

router.post('/', insertOrderMiddleware(orderController), (req, res) => {
  const {content} = req.body;
  return orderController.insertOrder(content, res);
})

router.put('/:id', insertOrderMiddleware(orderController), (req,res) => {
  const {id} = req.params;
  const {content} = req.body;
  // per ogni campo del req.body modificare il campo del record
  return orderController.modifyOrder(id, content, res);
})

router.delete('/:id', (req,res) => {
  const {id} = req.params;
  return orderController.deleteOrder(id, res);
})

module.exports = router;