const express = require("express");
const fs = require('fs');
const path = require('path');
// this just says use the routes for the express server
const router = express.Router();


router.get('/', function(req,res){
  res.sendFile(path.join(__dirname, '..', 'form.html'));
});

module.exports = router;
