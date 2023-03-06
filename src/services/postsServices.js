const { BlogPost } = require('../models');

const getPosts = () => BlogPost.findAll();

module.exports = {
    getPosts,
};