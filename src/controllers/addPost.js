const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { CategoryService } = require('../services/index');

const { JWT_SECRET } = process.env;

const validateBody = (body) =>
  Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items().required(),
  }).validate(body);

module.exports = async (req, res) => {
  const { error } = validateBody(req.body); 
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  
  const { categoryIds } = req.body;
  const categories = await CategoryService.getCategoriesByIds(categoryIds);
  const allCategoriesFound = categories.length === categoryIds.length;
  if (!allCategoriesFound) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }
  console.log(allCategoriesFound);
  // const { name } = req.body;
  // const category = await CategoryService.createCategory({ name });

  // const token = jwt.sign({ id: category.id, name }, JWT_SECRET, {
  //   expiresIn: '1h',
  // });
  res.status(201).json({ message: allCategoriesFound });
  // res.status(201).json({ id: category.id, name: category.name, token });
};
