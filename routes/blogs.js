const express = require("express");
// this just says use the routes for the express server
const router = express.Router();
const Post = require("../models/posts.js");

router.get('/', function(req, res){
  var author = req.query.author;
  var title = req.query.title;
  var dateStart = req.query.dateStart;
  var dateEnd = req.query.dateEnd;

  var filter = {};
  if (author) {
    filter['author'] = author;
  }
  if (title) {
    filter['title'] = title;
  }
  if (dateStart) {
    filter['date'] = {$gte: dateStart}
  }
  if (dateEnd) {
    if(filter['date']){
      filter['date']['$lte'] = dateEnd;
    } else {
      filter['date'] = {$lte: dateEnd}
    }
  }

  Post.find(filter, function (err, blogs) {
    if (err){
      return res.send('error hrouterened here');
    }
    res.send(blogs);
  });
})

router.post('/', function(req, res){
  var blog = req.fields;
  var blogToSave = new Post(blog);
  blogToSave.save(function (err, savedBlog) {
    if (err){
      res.send('not saved');
    } else {
      res.send(savedBlog);
    }
  });
})

router.get('/:blogId', function(req, res){
  var blogId = req.params.blogId;
  Post.findById(blogId, function (err, blog) {
    if (err){
      return res.send('error hrouterened here');
    }
    res.send(blog);
  });
})

router.delete('/:blogId', function(req,res){
  var blogId = req.params.blogId;
  Post.findByIdAndRemove(blogId, function(err, blog){
    if (err){
      return res.send('error on the delete');
    }
    res.end();
  })
})

module.exports = router;
