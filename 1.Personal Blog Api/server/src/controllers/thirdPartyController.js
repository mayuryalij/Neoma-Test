const axios = require("axios");
const thirdPartyBlog = require("../models/thirdPartyBlogs");
const { blogApiUrl } = require("../config/config");

// Implemented the use of a third-party API to fetch blogs, store them in a MongoDB collection, 
// and perform CRUD operations.

exports.fetchAndStoreBlogs = async (req, res) => {
  try {
    const response = await axios.get(blogApiUrl);
    const blogs = response.data;

    await thirdPartyBlog.insertMany(blogs);

    res.status(200).json({ message: "Blogs fetched and stored successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await thirdPartyBlog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBlogByTitle = async (req, res) => {
  const { title } = req.params;

  try {
    const blog = await thirdPartyBlog.findOne({ title });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const blog = await thirdPartyBlog.findOneAndUpdate(
      { _id: id },
      { title, description },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await thirdPartyBlog.findOneAndDelete({ _id: id });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
