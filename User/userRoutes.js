const express=require('express');
const {createUserSchema,updateUserSchema,userIdSchema}= require('./userValidation');
const userController = require('./userController');
const validate = require('../middleware/validate');
const router=express.Router();



router.post('/user/create',validate(createUserSchema),userController.createUser);
router.get('/user/getAll',userController.getAllUsers);
router.put('/user/:id',validate(userIdSchema,'params'),validate(updateUserSchema,'body'),userController.updateUser);
router.delete('/user/:id',validate(userIdSchema,'params'),userController.deleteUser);
router.post('/user/login', userController.loginUser);

module.exports = router;

