'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostsCategoriesTable = queryInterface.createTable('posts_categories', {
      post_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        references: {
          model: 'blog_posts',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
      },

    });
    return PostsCategoriesTable
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('posts_categories');
  },
};
