
var clients = require('../database/Schemas/clients');

var clientController = {

  getAllclients : function(callback){

        clients.find({},function(err,prov){
            if(err){ console.log('get All clients error'); throw err;}
                callback(prov);
        });
  },
  getClient : function(idUser,callback){

        clients.findOne({user:idUser},function(err,cli){
            if(err) throw err;
                callback(cli);
        });
  }

}

module.exports = clientController;
