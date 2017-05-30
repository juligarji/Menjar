
var express = require('express');
var router = express.Router();
var sessionController = require('../controllers/sessionController');
var productController = require('../controllers/productController');


router.get('/', function(req, res, next) {/* Punto de acceso a pagina principal */

  productController.getAllProducts(function(prod){

    sessionController.controlSession(req,res,
      function(usu){//Si tiene permisos
            // pendiente de modificacion si quiero mostrar info de usuario
            res.render('indexSession',{products:prod,user:usu});
      },
      function(){// No tiene permisos
            res.render('index',{products:prod});
      });
  });
});

module.exports = router;
