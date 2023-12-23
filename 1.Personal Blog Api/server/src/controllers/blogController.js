const BlogPost = require("../models/BlogPost");

// Implemented endpoints that allow users to manually 
// create (POST), read (GET), update (PUT), and delete (DELETE) blog posts.

exports.createBlogPost = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const blogPost = new BlogPost({ title, content, imageUrl });
    await blogPost.save();
    res.json({ message: "Blog post created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, imageUrl } = req.body;
    await BlogPost.findByIdAndUpdate(id, { title, content, imageUrl });
    res.json({ message: "Blog post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    await BlogPost.findByIdAndDelete(id);
    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Implemented an endpoint that enables users to search for blog posts by title.

exports.searchBlogPosts = async (req, res) => {
  try {
    const { title } = req.query;
    const regex = new RegExp(title, "i");
    const blogPosts = await BlogPost.find({ title: regex });
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
