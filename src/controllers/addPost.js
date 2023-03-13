const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { CategoryService, UsersService, PostsService,
   postCategoryServices } = require('../services/index');

const { JWT_SECRET } = process.env;

const validateBody = (body) =>
  Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items().required(),
  }).validate(body);

module.exports = async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, JWT_SECRET);
  const userEmail = decoded.email;
  const user = await UsersService.getByEmail(userEmail);
  const { error } = validateBody(req.body); 
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  } const { categoryIds } = req.body;
  const categories = await CategoryService.getCategoriesByIds(categoryIds);
  const allCategoriesFound = categories.length === categoryIds.length;
  if (!allCategoriesFound) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' }); 
} const userId = user.id;
  const { title, content } = req.body;
  const post = await PostsService.createPost({ title, content, userId });
  await Promise.all(categoryIds.map((categoryId) =>
   postCategoryServices.createPostCategory({ postId: post.id, categoryId })));
 res.status(201).json(post);
};
