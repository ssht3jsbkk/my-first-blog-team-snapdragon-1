const mongoose = require('mongoose');
const express = require("express");


const app = express();

const PORT = 3000;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

const blogSchema = {
  id: Number,
  name: String,
  author: String,
  title: String,
  date: Date,
  content: String,
}
var blogCollection = mongoose.model('blogs', blogSchema);

app.get('/blogs', function(req, res){
  var author = req.query.author;
  var title = req.query.title;
  var filter = null;

  if(author && title) {
    filter = {author:author, title:title};
  } else if(author && !title) {
    filter = {author:author};
  }else if (title && !author){
    filter = {title:title};
  }

  blogCollection.find(filter, function (err, blogs) {
    if (err){
      return res.send('error happened here');
    }
    res.send(blogs);
  });
})

app.get('/blogs/:blogId', function(req, res){
  var blogId = req.params.blogId;
  blogCollection.findOne({id:blogId}, function (err, blog) {
    if (err){
      return res.send('error happened here');
    }
    res.send(blog);
  });
})

app.listen(PORT, function(){
console.log("listening on " +PORT)
})
