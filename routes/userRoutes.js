const express=require('express');
const {userSchema}= require('../validations/userValidation');
const userController = require('../controllers/userController');
const validate = require('../middleware/validate');
const router=express.Router();



router.post('/user/create',validate(userSchema),userController.createUser);
router.get('/user/getAll',userController.getAllUsers);
router.put('/user/:id',userController.updateUser);
router.delete('/user/:id',userController.deleteUser);

module.exports = router;