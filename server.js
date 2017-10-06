const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express");
const config = require('./config/config.js');
const formidable = require("express-formidable");
const indexRoute = require("./routes/index.js");
const blogsRoute = require("./routes/blogs.js");


const app = express();
const PORT = 3000;

app.use(formidable());
//change the mongodb to the config.dburl to add password etc
mongoose.connect(config.dburl, { useMongoClient: true });


app.use('/', indexRoute);

app.use('/blogs', blogsRoute);

app.post('/blogs', blogsRoute);

app.get('/blogs/:blogId', blogsRoute);

app.delete('/blogs/:blogId', blogsRoute);

app.listen(PORT, function(){
console.log("listening on " +PORT)
})
