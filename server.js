const mongoose = require('mongoose');
const express = require("express");


const app = express();

const PORT = 3000;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

const blogSchema = {
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

  blogCollection.find(filter, function (err, blogs) {
    if (err){
      return res.send('error happened here');
    }
    res.send(blogs);
  });
})

app.get('/blogs/:blogId', function(req, res){
  var blogId = req.params.blogId;
  blogCollection.findById(blogId, function (err, blog) {
    if (err){
      return res.send('error happened here');
    }
    res.send(blog);
  });
})

app.listen(PORT, function(){
console.log("listening on " +PORT)
})
