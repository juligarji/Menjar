

var userController = require('./userController');
var providerController = require('./providerController');
var productController = require('./productController');
var clientController = require('./clientController');
//var session = require("express-session");


var sessionController = {

    permitsSession : function(req,res,callback){
        if(req.session ==  null){
            res.render('401');
        }else{
              console.log('si se permite la sesion');
              callback(req,res);
        }
    },

    controlSession : function(req,res,sucess,fail){

        if(req.session != null){
              if(req.session.iden!=undefined){
                  sucess(req.session.iden);
              }else{
                      fail();
              }
        }else{
                  fail();
        }
    },

    createSession : function(req,email,callback){

        userController.getUserByLogin(email,function(data){
              req.session.iden = data._id;
              req.session.role = data.role;
              callback(data._id);
        });
    },

    checkLogin : function(login,pass,sucess,fail){// Verifica que login-pass coincidan
        console.log('el user en check :' + login);
        userController.getUserByLogin(login,function(usr){
            //console.log('llego');
            //console.log(usr,null,'\t');

            console.log('XXX 2 XXX');

            if (usr == null){// El email no existe
               console.log('email no existe');
              fail();
            }else{
                  if(usr.password==pass){// la contraseña es correcta
                    console.log('bien parametros');
                     sucess(usr);
                  }else{// la contraseña es incorrecta
                   console.log('contraseña incorrecta');

                         fail();
                 }
          }
        });
    },

    redirectByRole : function(iden,req,res,callback){// Redirecciona a la pag principal segun el rol
      userController.getUserRole(iden,function(role){
          console.log('EL ROL ES :' + role);
          switch(role){//redireccionar a nuevas vistas dependiendo del rol

              case 'client':
                console.log('tipo cliente');
                    productController.getAllProducts(function(pro){
                        //res.render('client/index',{products:pro});
                        clientController.getClient(req.session.iden,function(cli){// carga los clientes a la vista
                            res.render('client/index',{products:pro,client:cli});// Renderiza la vista
                        });
                    });
                  break;

              case 'provider':
              // El usuario si se encuentra identificado
                      providerController.getProvider(req.session.iden,
                        function(prov){// El provedor se encontro

                            //console.log(prov,null,'\t');
                            console.log('Interfaz Proveedor abierta');
                              res.render('provider/index',{provider:prov});
                      });

                      break;


              case 'fundation':

                      break;
              case '_session':

                      break;

    }
    });
  },

    deleteSession : function(req){
        req.session.destroy();
        console.log('deleteSession ');
    }
}

module.exports = sessionController;
