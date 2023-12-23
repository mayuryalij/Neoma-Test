const express = require("express");
const blogController = require("../controllers/blogController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/blog-posts", authenticate, blogController.createBlogPost);
router.get("/blog-posts", blogController.getBlogPosts);
router.put("/blog-posts/:id", authenticate, blogController.updateBlogPost);
router.delete("/blog-posts/:id", authenticate, blogController.deleteBlogPost);
router.get("/search", blogController.searchBlogPosts);

module.exports = router;
