/**
 * Created by Seradiazpin on 19/04/2017.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var users = require('../database/Schemas/users');
var clients =require('../database/Schemas/clients');
var fundations = require('../database/Schemas/fundations');
var providers = require('../database/Schemas/providers');

var path = require('path');



var createUser = function(req,res){// Crea un nuevo usuario
      var data = req.body;
      var new_data;

      console.log('Datos: ' + JSON.stringify(data));
      users.findOne({email:{$exists: true,$in:[data.email]}},function(err,usr){
             //verifica si el usuario ya ha sido registrado
            if(usr!=null){
                res.send('El usuario ya existe');
                return;
            }

            var new_user = new users({
                email:data.email,
                password:data.password,
                role:data.role
            });

            new_user.save(function(err){
                if(err){
                    res.send('Ha ocurrido un error, intente mas tarde 1');

                    return;
                  };

                  switch(data.role){

                      case 'client':
                      new_data ={
                          user:new_user._id,
                          name:data.name,
                          lastname:data.lastname
                          //born_date:data.born_date
                          //gender:data.gender
                      }

                      new_user = new clients(new_data);
                      new_user.save(function(err){
                          if(err){
                           res.send('Ha Ocurrido un error, intente mas tarde 2');
                           users.findOneAndRemove({_id:new_user.user});
                           return;
                         }
                                res.send('Cliente creado con exito');
                      });
                            break;


                      case 'provider':

                      new_data ={
                          user:new_user._id,
                          name:data.name,
                          lastname:data.lastname,
                          identification:data.identification,
                          address:data.address,
                          phone:data.phone,
                          //born_date:data.born_date,
                          //gender:data.gender,
                          description:data.description
                      }
                      console.log('Los datos');
                      console.log(JSON.stringify(new_data));
                      new_user = new providers(new_data);
                      new_user.save(function(err){
                          if(err){
                           res.send('Ha Ocurrido un error, intente mas tarde 3');
                           users.findOneAndRemove({_id:new_data.user});
                           return;
                         }
                                res.send('Proveedor creado con exito');
                      });

                            break;

                      case 'fundation':

                            new_data ={
                                user:new_user._id,
                                name:data.name,
                                //born_date:data.born_date,

                                identification:data.identification,
                                address:data.address,
                                phone:data.phone,
                                description:data.description
                            }
                            new_user = new fundations(new_data);
                            new_user.save(function(err){
                                if(err){
                                 res.send('Ha Ocurrido un error, intente mas tarde 4');
                                 users.findOneAndRemove({_id:new_data.user});
                                 return;
                               }
                                      res.send('Fundacion creada con exito');
                            });

                                  break;

                        default:
                            res.send('Rol no definido');
                              return;

                  }
            });
      });
}

/* Puntos de Acceso creados */
router.get('/',function(req,res){ // pagina principal de registro

      res.render('register');
});

router.post('/create-user',jsonParser,createUser);

module.exports = router;
