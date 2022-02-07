const CategoryService = require('../services/categoryServices');

const createCategory = async (req, res) => {
  const newCategory = await CategoryService.createCategory(req.body);

  if (newCategory.status >= 400) {
    return res.status(newCategory.status).json({ message: newCategory.message });
  }

  return res.status(newCategory.status).json(newCategory.message);
};

module.exports = {
  createCategory,
};