const Joi = require('joi');

// Register validation schema
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
  address: Joi.string().required(),
  password: Joi.string().min(4).required(),
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

// Update validation schema
const updateSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    address: Joi.string().required(),
    password: Joi.string().min(4).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateSchema
};
