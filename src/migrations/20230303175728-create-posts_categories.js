'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostsCategoriesTable = queryInterface.createTable('posts_categories', {

      postId: {
        allowNull: false,
        field: 'post_id',
        underscored: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'blog_posts',
          key: 'id',

        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
       
      },
      categoryId: {
        allowNull: false,
        field: 'category_id',
        underscored: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

    });
    return PostsCategoriesTable
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('posts_categories');
  },
};
