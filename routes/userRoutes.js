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

router.post('/', (req, res) => {
  const {content} = req.body;
  return userController.insertUser(content, res);
})

router.put('/:id', (req,res) => {
  const {id} = req.params;
  const {content} = req.body;
  // per ogni campo del req.body modificare il campo del record
  return userController.modifyUser(id, content, res);
})

router.delete('/:id', (req,res) => {
  const {id} = req.params;
  return userController.deleteUser(id, res);
})

module.exports = router;