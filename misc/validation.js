//Validation
const Joi = require('joi');

const registerSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,32}$/).required(),
});

const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,32}$/).required(),
})

module.exports.registerSchema = registerSchema;
module.exports.loginSchema = loginSchema;
