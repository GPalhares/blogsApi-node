const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { UsersService, PostsService,
    } = require('../services/index');

const { JWT_SECRET } = process.env;

const validateBody = (body) =>
  Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }).validate(body);

module.exports = async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, JWT_SECRET);
  const userEmail = decoded.email;
  const user = await UsersService.getByEmail(userEmail);
  const postId = req.params.id;
  const post = await PostsService.getPostsById(postId);
  
  if (post.length > 0 && post[0].userId !== user.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  const { error } = validateBody(req.body); 
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' }); 
}
  const { title, content } = req.body;
    await PostsService.editPost(postId, { title, content });
  const postEdited = await PostsService.getPostsById(postId);
 res.status(200).json(postEdited[0]);
};
