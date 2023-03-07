'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const BlogPostsTable = queryInterface.createTable('blog_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'user_id',
        underscored: true,
        references: {
          model: 'users',
          key: 'id',

        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      published: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE,
      },

    });
    return BlogPostsTable
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('blog_posts');
  },
};
