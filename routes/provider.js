
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

/* Punto de acceso que maneja las peticiones de los clientes */
var products = require('../database/Schemas/products');
var users =  require('../database/Schemas/users');
var providers =  require('../database/Schemas/providers');
var products = require('../database/Schemas/products');

/*Funciones auxiliares */
var getProvider = function(userId,callback){

    providers.findOne({user:userId}).populate(function(err,data){
        if(err) throw err;
                callback(data);
    })
}


router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})


var newProduct = function(req,res){
    console.log(JSON.stringify(req.body));
    var data = req.body;
    var currentUser = req.body._user;

    var new_data={
          img:data.img,
         name:data.name,
          category:data.category,
          expirationDate:new Date(data.expirationDate),
          price:data.price,
          location:data.location,
          description:data.description
    }

    var new_product = products(new_data);

    new_product.save(function(err){
          if(err)throw err;
          providers.findOne({user:currentUser},function(err,prov){
              if(err) throw err;
                  prov.products.push(new_product);
                      prov.save(function(err){
                          if(err) throw err;
                              console.log('Producto guardado exitosamente');
                      });
          });
    });

    res.end();
};




router.post('/new-product',jsonParser,newProduct);


module.exports = router;
