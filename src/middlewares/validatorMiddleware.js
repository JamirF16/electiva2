const Joi = require('joi');

function validatorFields(schema, property){
    return (req, res, next) => {
        const data = req[property];
        const {error} = schema.validate(data, {abortEarly: false});
        if(error){
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            const validatorError = new Error(errorMessage);
            validatorError.statusCode = 400;
            next(validatorError);
        }
        next();
    }
}

module.exports = validatorFields;