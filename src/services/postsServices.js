const { BlogPost, User, PostCategory, Category } = require('../models');

const getPosts = () => BlogPost.findAll({
  include: [
    {
      model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
    {
      model: Category,
      as: 'categories',
      attributes: ['id', 'name'],
      through: {
        attributes: [],
      },
    },
  ],
});

const getPostsById = (postId) => BlogPost.findAll({
  where: { id: postId },
  include: [
    {
      model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
    {
      model: Category,
      as: 'categories',
      attributes: ['id', 'name'],
      through: {
        attributes: [],
      },
    },
  ],
});

const deletePostById = async (postId) => {
    const result = await BlogPost.destroy({ where: { id: postId } });
    return result;
};

const createPost = ({ name }) => PostCategory
.create({ name });

module.exports = {
  getPosts,
  getPostsById,
  createPost,
  deletePostById,
};
