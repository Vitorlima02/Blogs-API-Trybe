const Joi = require('joi');
const { Categories } = require('../models');

const schemaCategory = Joi.object({
  name: Joi.string().required(),
});

const responseValidate = (status, message) => ({
  status,
  message,
});

const createCategory = async (data) => {
  try {
    const { error } = schemaCategory.validate(data);

    if (error) return responseValidate(400, error.message);

    const newCategory = await Categories.create(data);

    return responseValidate(201, newCategory);
  } catch (error) {
    return responseValidate(500, error.message);
  }
};

const categoryGetAll = async () => {
  try {
    const categories = await Categories.findAll();

    return responseValidate(200, categories);
  } catch (error) {
    return responseValidate(500, error.message);
  }
};

module.exports = {
  createCategory,
  categoryGetAll,
};