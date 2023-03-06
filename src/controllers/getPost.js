const { PostsService } = require('../services');

module.exports = async (req, res) => {
  const posts = await PostsService.getPosts();
  res.status(200).json(posts);
};
