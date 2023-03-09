const jwt = require('jsonwebtoken');
const { PostsService, UsersService } = require('../services');

const { JWT_SECRET } = process.env;

module.exports = async (req, res) => {
  const token = req.headers.authorization;

  const decoded = jwt.verify(token, JWT_SECRET);
  const userEmail = decoded.email;
  const user = await UsersService.getByEmail(userEmail);
  const postId = req.params.id;
  const post = await PostsService.getPostsById(postId);
  
  console.log(post, 'post id');
  console.log(user.id, 'user id');

  if (post.length === 0) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (post.length > 0 && post[0].userId !== user.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  await PostsService.deletePostById(postId);

  res.status(204).json();
};
