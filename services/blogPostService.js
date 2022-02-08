const Joi = require('joi');

const { BlogPost, Categories } = require('../models');

const blogPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const responseValidate = (status, message) => ({
  status,
  message,
});

const createBlogPost = async (user, data) => {
  try {
    const { error } = blogPostSchema.validate(data);

    if (error) return responseValidate(400, error.message);

    const checkId = data.categoryIds;

    const alreadyCheckedIds = await checkId.map(async (find) => 
    Categories.findOne({ where: { id: find } }));

    const checked = await Promise.all(alreadyCheckedIds);
    if (checked[0] === null) return responseValidate(400, '"categoryIds" not found');

    const newPost = {
      userId: user.dataValues.id,
      title: data.title,
      content: data.content,
    };
    const postCreated = await BlogPost.create(newPost);

    return responseValidate(201, postCreated);
  } catch (error) {
    return responseValidate(500, error.message);
  }
};

module.exports = {
  createBlogPost,
};