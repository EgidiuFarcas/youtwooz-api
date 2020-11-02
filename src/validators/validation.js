import Joi from '@hapi/joi';

//User Register Validation
export const registerValidation = (requestBody) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(requestBody);

}

//User Register Validation
export const loginValidation = (requestBody) => {
    const schema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(requestBody);
}