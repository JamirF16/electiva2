const Joi = require('joi');

const noteSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    createdAt: Joi.date(),
    userId: Joi.number().integer()
});

module.exports = {noteSchema};