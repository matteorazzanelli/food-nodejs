const express = require('express');
const router = express.Router();

// load product controller
const {userController} = require('../controllers/userController');

//middleware to handle req.body
router.use(express.json());

router.get('/', (req, res)=>{
  console.log('get all users');
  return userController.listUsers(req, res);
})

router.get('/:id',(req, res)=>{
  console.log('get product : '+req.params.id);
  return userController.findUser(req.params.id);
})

router.post('/', (req,res)=>{
  console.log('create user : '+req.body);
  return userController.addUser(req.body);
})

module.exports = router;