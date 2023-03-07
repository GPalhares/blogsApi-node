const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { PostsService } = require('../services/index');

const { JWT_SECRET } = process.env;

const validateBody = (body) =>
  Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
      categoryIds: Joi.string().required().messages({
        'any.required': 'one or more "categoryIds" not found', 
      }),
  }).validate(body);

module.exports = async (req, res) => {
  const { error } = validateBody(req.body); 
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { name } = req.body;
  const category = await PostsService.createCategory({ name });

  const token = jwt.sign({ id: category.id, name }, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(201).json({ id: category.id, name: category.name, token });
};
