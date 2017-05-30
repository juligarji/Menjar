
var users = require('../database/Schemas/users');
// No debe ser llamada por ninguna funcion que no sea de controllers y por seguridad
// tampoco dede rendearse en ninguna vista

var userController = {

   getAllUsers : function(callback){
     users.find({},function(err,usr){
         if(err) throw err;
             callback(usr);
     });
   },

   getUser : function(userId,callback){
      users.findOne({_id:userId},function(err,usr){
          if(err) throw err;
              callback(usr);
      });
  },

  getUserByLogin : function(userEmail,callback){

     users.findOne({email:userEmail},function(err,usr){
         if(err) throw err;
                console.log('Obtener usuario exitoso');
             callback(usr);
     });
 },

 getUserRole : function(userId,callback){
    users.findOne({_id:userId},function(err,usr){
        if (err) throw err;
            callback(usr.role);
    });
 },

 getUserRoleByLogin : function(userLogin,callback){
    users.findOne({email:userLogin},function(err,usr){
        if (err) throw err;
          console.log('user role by login exitoso');
            callback(usr.role);
    });
 }

}

module.exports = userController;
