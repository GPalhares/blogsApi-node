const { Op } = require('sequelize');
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

const getPostsByTerm = (searchTerm) => BlogPost.findAll({
  where: { [Op.or]: [
      { title: { [Op.like]: `%${searchTerm}%` } },
      { content: { [Op.like]: `%${searchTerm}%` } }] },
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
  await PostCategory.destroy({ where: { postId } });
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
  getPostsByTerm,
};
