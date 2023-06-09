const { PostsService } = require('../services');

module.exports = async (req, res) => {
    const postId = req.params.id;
  const post = await PostsService.getPostsById(postId);
  if (post.length === 0) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  res.status(200).json(post[0]);
};
