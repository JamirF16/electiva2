const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string(),
    password: Joi.string(),
    createdAt: Joi.date()
});

module.exports = {userSchema};