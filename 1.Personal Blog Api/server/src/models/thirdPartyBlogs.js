const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rate: { type: Number, required: true },
  count: { type: Number, required: true },
});

const blogSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: ratingSchema, required: true },
});

module.exports = mongoose.model("thirdPartyBlog", blogSchema);
