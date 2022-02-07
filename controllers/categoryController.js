const CategoryService = require('../services/categoryServices');

const createCategory = async (req, res) => {
  const newCategory = await CategoryService.createCategory(req.body);

  if (newCategory.status >= 400) {
    return res.status(newCategory.status).json({ message: newCategory.message });
  }

  return res.status(newCategory.status).json(newCategory.message);
};

const categoryGetAll = async (req, res) => {
  const allCategories = await CategoryService.categoryGetAll();

  if (allCategories.status >= 400) {
    return res.status(allCategories.status).json({ message: allCategories.message });
  }

  return res.status(allCategories.status).json(allCategories.message);
};

module.exports = {
  createCategory,
  categoryGetAll,
};