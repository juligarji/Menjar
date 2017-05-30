/* Librerias de express */
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var session = require("express-session");

var users = require('../database/Schemas/users');
var providers = require('../database/Schemas/providers');
var providerController = require('../controllers/providerController');
var sessionController = require('../controllers/sessionController');


var redirect  = function(req,res){// Redirecciona a la pagina necesaria dependiendo del rol de usuario
    var data = req.body || {};
    console.log('Se ejecuta redirect');
      //console.log(data,null,'\t');
      sessionController.checkLogin(data.email,data.password,// verifica que exista el login - pass
        function(currentUser){// El login - pass es correcto

              sessionController.createSession(req,data.email,
                function(usr){// Ya se creo la sesion actual
                      sessionController.redirectByRole(usr,req,res,function(){
                          console.log('redirected correctly');
                      });

                });
        },
        function(){// El login - pass es incorrecto
          sessionController.deleteSession(req);
          console.log(req.sessions + " Acceso invalido");
          res.status(401).redirect('back');
        }
      );
}

var currentDirect = function(req,res){
  //  console.log('llamado con get');
    sessionController.controlSession(req,res,
      function(id){// la sesion esta actualmente creada
          sessionController.redirectByRole(id,req,res,function(){
              console.log('get redirigido');
          });
      },
      function(){// la sesion no ha sido creada
          res.render('401');
      });
}

router.get('/',function(req,res){//pagina principal de login
        sessionController.controlSession(req,res,
          function(usu){// Tiene Permisos
              //console.log('User: ' + usu);
              sessionController.redirectByRole(usu,req,res,function(){
                  console.log('redirigido a la pag principal del rol');
              });
          },
          function(){// No Tiene permisos
            console.log('Sin permisos en LOGIN');
              res.render('login');
          }
        );
        //res.end();
});

var deleteCurrentSession = function(req,res){
    sessionController.deleteSession(req);
    res.redirect('/');
}
/* puntos de acceso remotos */
router.post('/sing_in',jsonParser,redirect);
router.get('/sing_in',currentDirect);
router.get('/sing_out',deleteCurrentSession);

module.exports = router;
