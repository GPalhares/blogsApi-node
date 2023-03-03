'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostsCategoriesTable = queryInterface.createTable('postsCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
    queryInterface.dropTable('postsCategories');
  },
};