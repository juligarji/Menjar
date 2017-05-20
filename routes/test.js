
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var users = require('../database/Schemas/users');
var clients =require('../database/Schemas/clients');
var providers = require('../database/Schemas/providers');
var fundations =require('../database/Schemas/fundations');
var path = require('path');




// Rutas de accesso de modo de prueba
// las que se llaman test-* permiten ver la base de datos
 
router.get('/test-users',function(req,res){
    res.set('Content-type','text/plain');

    users.find({},function(err,data){
          res.send(JSON.stringify(data));
    });
});

router.get('/test-clients',function(req,res){
    res.set('Content-type','text/plain');

    clients.find({},function(err,data){
          res.send(JSON.stringify(data));
    });
});

router.get('/test-providers',function(req,res){
    res.set('Content-type','text/plain');

    providers.find({},function(err,data){
          res.send(JSON.stringify(data));
    });
});

router.get('/view-provider',function(req,res){
    //res.set('Content-type','text/plain');
    res.render('provider');

});



router.get('/test-fundations',function(req,res){
    res.set('Content-type','text/plain');

    fundations.find({},function(err,data){
          res.send(JSON.stringify(data));
    });
});


router.get('/remove',function(req,res){
    users.remove();
    clients.remove();

    res.set('Content-type','text/plain');
    res.send('ya');
});

module.exports = router;
