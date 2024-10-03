const Joi = require('joi');

const profileSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    address: Joi.string().required(),
});

module.exports = profileSchema;
