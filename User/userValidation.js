const Joi=require('joi');

const createUserSchema=Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});


const updateUserSchema = Joi.object({
  username: Joi.string().min(3),
  email: Joi.string().email(),
  password: Joi.string().min(6)
}).min(1);


const userIdSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});

module.exports = {
    createUserSchema,
  updateUserSchema,
  userIdSchema
};