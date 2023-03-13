const { Op } = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models');

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

const createPost = ({ title, content, userId }) => {
  const currentDate = new Date();

  return BlogPost.create({
    title,
    content,
    userId,
    published: currentDate,
    updated: currentDate, 
  });
};

const editPost = async (id, { title, content }) => {
  const currentDate = new Date();

  const updatedPost = await BlogPost.update(
    {
      title,
      content,
      updated: currentDate,
    },
    {
      where: {
        id,
      },
      returning: true,
    },
  );

  updatedPost.updated = currentDate;

  return updatedPost;
};

module.exports = {
  getPosts,
  getPostsById,
  createPost,
  deletePostById,
  getPostsByTerm,
  editPost,
};
