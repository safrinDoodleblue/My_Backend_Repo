const express=require('express');
const {createUserSchema,updateUserSchema,userIdSchema, loginUserSchema}= require('./userValidation');
const userController = require('./userController');
const validate = require('../middleware/validate');
const passport = require('passport');
const router=express.Router();



router.post('/user/create',validate(createUserSchema),userController.createUser);
router.get('/user/getAll',passport.authenticate('jwt',{session:false}),userController.getAllUsers);
router.put('/user/:id',validate(userIdSchema,'params'),validate(updateUserSchema,'body'),userController.updateUser);
router.delete('/user/:id',validate(userIdSchema,'params'),userController.deleteUser);
router.post('/user/login',validate(loginUserSchema),userController.loginUser);

module.exports = router;

