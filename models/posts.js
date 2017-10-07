const mongoose = require('mongoose');


const blogSchema = {
  author: String,
  title: String,
  date: Date,
  content: String,
};

var Post = mongoose.model('blogs', blogSchema);

module.exports = Post;
