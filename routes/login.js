/* Librerias de express */
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var users = require('../database/Schemas/users');
var providers = require('../database/Schemas/providers');
var providerController = require('../controllers/providerController');

var redirect  = function(req,res){/* Redirecciona a la pagina necesaria dependiendo del rol de usuario*/
    var data = req.body || {};


      console.log('datos recibidos');
      console.log(JSON.stringify(data));

    users.findOne({email:data.email},function(err,usr){

        if(usr==null){
            res.redirect('/login');
            console.log('No existe usuario');
            return;
        }

        if(usr.password != data.password){
          res.redirect('/login');
          console.log('pass incorrecta');
          return;
        }

        switch(usr.role){

            case('client'):

                res.render('client/index',{user:usr._id});
                res.end();
                console.log('Rol :' + usr.role);
                break;

            default:

            providerController.getProvider(usr._id,function(prov){
                res.render('provider/index',{user:usr._id,provider:prov});
                console.log('PROVEEDOR');

                console.log(JSON.stringify(prov,null,'\t'));
            });

            console.log('Rol :' + usr.role);

            break;
                return;
        }
    });
}


router.get('/',function(req,res){//pagina principal de login
        res.render('login');
        red.end();
});

router.post('/sing_in',jsonParser,redirect);



module.exports = router;
