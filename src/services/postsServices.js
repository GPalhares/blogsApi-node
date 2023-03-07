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

const createPost = ({ name }) => PostCategory
.create({ name });

module.exports = {
  getPosts,
  createPost,
};
