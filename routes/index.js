var express = require('express');

var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var Products = require('../database/Schemas/product');

router.get('/',function(req,res){
  
      Products.find({},function(err,pro){
          if(err) throw err;
            res.render('index',{products:pro});
      });
});

module.exports = router;
