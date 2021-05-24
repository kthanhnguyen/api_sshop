const Joi = require('@hapi/joi');

// Register Validation
const registerValidation = (data) => {
  const schema = {
    fullname: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  };

  return Joi.validate(data, schema);
}

// Register Validation
const loginValidation = (data) => {
  const schema = {
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
  };

  return Joi.validate(data, schema);
}

// Product Validation
const productValidation = data => {
  const schema = {
    name: Joi.string().min(6).required(),
    price: Joi.number().integer().required(),
    size: Joi.array().min(2).required(),
    rating: Joi.number().min(0).max(5).required(),
    sex: Joi.string().min(3).required(),
    color: Joi.array().min(1).required(),
    poster: Joi.array().min(2).required(),
    description: Joi.string().min(6).required(),
    collections: Joi.string().min(6).required(),
    productType: Joi.string().min(6).required()
  };

  return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

module.exports.productValidation = productValidation;