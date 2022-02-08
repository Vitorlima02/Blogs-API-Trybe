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

const getAllPosts = async (_req, res) => {
  const allPosts = await BlogPostService.getAllPosts();

  if (allPosts.status >= 400) {
    return res.status(allPosts.status).json({ message: allPosts.message });
  }

  return res.status(allPosts.status).json(allPosts.message);
};

module.exports = {
  createBlogPost,
  getAllPosts,
};