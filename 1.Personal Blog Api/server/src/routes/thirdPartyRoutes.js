const express = require("express");
const router = express.Router();
const blogController = require("../controllers/thirdPartyController");
const { authenticate } = require("../middleware/authMiddleware");

router.post(
  "/fetch-and-store-blogs",
  authenticate,
  blogController.fetchAndStoreBlogs
);
router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:title", blogController.getBlogByTitle);
router.put("/blogs/:id", authenticate, blogController.updateBlog);
router.delete("/blogs/:id", authenticate, blogController.deleteBlog);

module.exports = router;
