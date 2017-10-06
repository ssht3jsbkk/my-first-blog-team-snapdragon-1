const mongoose = require('mongoose');
const express = require("express");
const formidable = require("express-formidable");
<<<<<<< HEAD
const indexRoute = require("./routes/index.js");
const blogsRoute = require("./routes/blogs.js");


const app = express();
const PORT = 3000;

app.use(formidable());

mongoose.connect('mongodb://localhost/school', { useMongoClient: true });


app.use('/', indexRoute);

app.use('/blogs', blogsRoute);

app.post('/blogs', blogsRoute);

app.get('/blogs/:blogId', blogsRoute);

app.delete('/blogs/:blogId', blogsRoute);
=======

const app = express();
app.use(formidable());
const PORT = 3000;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
app.get('/', function(req,res){
  res.sendFile(__dirname + '/form.html')
})

const blogSchema = {
  name: String,
  author: String,
  title: String,
  date: Date,
  content: String,
}
var Blog = mongoose.model('blogs', blogSchema);

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

  Blog.find(filter, function (err, blogs) {
    if (err){
      return res.send('error happened here');
    }
    res.send(blogs);
  });
})

app.post('/blogs', function(req, res){
  var blog = req.fields;
  var blogToSave = new Blog(blog);
  blogToSave.save(function (err, savedBlog) {
    if (err){
      return res.send('not saved');
    }
    res.send(savedBlog);
  });
})

app.get('/blogs/:blogId', function(req, res){
  var blogId = req.params.blogId;
  Blog.findById(blogId, function (err, blog) {
    if (err){
      return res.send('error happened here');
    }
    res.send(blog);
  });
})

app.delete('/blogs/:blogId', function(req,res){
  var blogId = req.params.blogId;
  Blog.findByIdAndRemove(blogId, function(err, blog){
    if (err){
      return res.send('error on the delete');
    }
    res.end();
  })
})
>>>>>>> 67558a38fb082ea473c1e9d3dd9e8ab1c9a8936a

app.listen(PORT, function(){
console.log("listening on " +PORT)
})
