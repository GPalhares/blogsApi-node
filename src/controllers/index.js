const login = require('./login');
const user = require('./user');
const getUsers = require('./getUsers');
const getUserById = require('./getUserById');
const addCategories = require('./categories');
const getCategories = require('./getCategories');
const getPosts = require('./getPost');
const getPostsById = require('./getPostById');
const deletePostById = require('./deletePostById');
const deleteMyUser = require('./deleteMyUser');

module.exports = {
  login,
  user,
  getUsers,
  getUserById,
  addCategories,
  getCategories,
  getPosts,
  getPostsById,
  deletePostById,
  deleteMyUser,
};
