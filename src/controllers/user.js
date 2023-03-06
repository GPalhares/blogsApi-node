const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { UsersService } = require('../services');

const { JWT_SECRET } = process.env;

const validateBody = (body) =>
  Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': '"email" must be a valid email', 
      'any.required': 'Email is required', 
    }),
    displayName: Joi.string().min(8).required().messages({
        'string.min': '"displayName" length must be at least 8 characters long',
        'any.required': 'displayName is required', 
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be at least 6 characters long',
      'any.required': 'Password is required', 
    }),
    image: Joi.string(),
  }).validate(body);

module.exports = async (req, res) => {
  const { error } = validateBody(req.body); 
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await UsersService.getByEmail(req.body.email);
  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }
  const payload = {
    email: req.body.email,
    admin: false,
  };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });
  const { email, displayName, password, image } = req.body;

  await UsersService.createUser({ email, displayName, password, image });
  res.status(201).json({ token });
};
