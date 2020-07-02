import Joi from '@hapi/joi';

const validator = {
  validateBody: (schema) => (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({
        status: 400,
        error: result.error.message,
      });
    }

    req.body = result.value;
    return next();
  },

  schemas: {
    authSchema: Joi.object().keys({
      firstName: Joi.string()
        .regex(/^[a-zA-Z]*$/)
        .required()
        .trim()
        .lowercase()
        .error(new Error('First Name is required')),
      lastName: Joi.string()
        .regex(/^[a-zA-Z\\-]*$/)
        .required()
        .trim()
        .lowercase()
        .error(new Error('Last Name is required')),
      email: Joi.string()
        .email()
        .required()
        .trim()
        .lowercase()
        .error(new Error('A valid email address is required')),
      password: Joi.string()
        .required()
        .error(new Error('Password is required')),
    }),
    authLoginSchema: Joi.object().keys({
      email: Joi.string()
        .regex(/\S+@\S+\.\S+/)
        .required()
        .trim()
        .lowercase()
        .error(new Error('A valid email address is required')),
      password: Joi.string()
        .required()
        .error(new Error('Password is required')),
    }),
  },
};

export default validator;