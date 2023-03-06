const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { CategoryService } = require('../services/index');

const { JWT_SECRET } = process.env;

const validateBody = (body) =>
  Joi.object({
    name: Joi.string().required().messages({
      'any.required': '"name" is required', 
    }),
  }).validate(body);

module.exports = async (req, res) => {
  const { error } = validateBody(req.body); 
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { name } = req.body;
  const category = await CategoryService.createCategory({ name });

  const token = jwt.sign({ id: category.id, name }, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(201).json({ id: category.id, name: category.name, token });
};
