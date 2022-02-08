const BlogPostService = require('../services/blogPostService');

const createBlogPost = async (req, res) => {
  const { user } = req;
  const data = req.body;

  const newBlogPost = await BlogPostService.createBlogPost(user, data);

  if (newBlogPost.status >= 400) {
    return res.status(newBlogPost.status).json({ message: newBlogPost.message });
  }
  
  return res.status(newBlogPost.status).json(newBlogPost.message);
};

module.exports = {
  createBlogPost,
};