
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

/* Punto de acceso que maneja las peticiones de los clientes */
var products = require('../database/Schemas/products');


router.get('/',function(req,res){// pagina principal de los clientes

      products.find({},function(err,pro){
          if(err) throw err;
            res.redirect('client/index',{products:pro});
      });
});

module.exports = router;
