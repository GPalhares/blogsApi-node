const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { UsersService } = require('../services');

const { JWT_SECRET } = process.env;

const validateBody = (body) =>
  Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
      'string.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password length must be at least 6 characters',
      'string.required': 'Password is required',
    }),
  }).validate(body);

module.exports = async (req, res) => {
  const { error } = validateBody(req.body);
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await UsersService.getByEmail(req.body.email);
  console.log(user);
  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const payload = {
    email: req.body.email,
    admin: false,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
};
