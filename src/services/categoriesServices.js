const { Category } = require('../models');

const createCategory = ({ name }) => Category
.create({ name });

const getCategories = () => Category.findAll();

const getCategoriesByIds = (categoryIds) => Category.findAll({
    where: { id: categoryIds },
  });

module.exports = {
    createCategory,
    getCategories,
    getCategoriesByIds,
};