
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var sessionController = require('../controllers/sessionController');
var productController = require('../controllers/productController');
var clientController = require('../controllers/clientController');


/* Punto de acceso que maneja las peticiones de los clientes */
var products = require('../database/Schemas/products');

router.get('/',function(req,res){// pagina principal de los clientes

      sessionController.permitsSession(req,res,// Verifica si cuenta con los permisos de acceder
        function(req,res){
              productController.getAllProducts(// Carga los productos a la vista
                function(prod){
                    clientController.getClient(req.session.id,function(cli){// carga los clientes a la vista
                        res.render('client/index',{products:prod,client:cli});// Renderiza la vista
                    });
                });
        });
});

module.exports = router;
