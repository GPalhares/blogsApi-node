const { CategoryService } = require('../services');

module.exports = async (req, res) => {
  const categories = await CategoryService.getCategories();
  res.status(200).json(categories);
};
