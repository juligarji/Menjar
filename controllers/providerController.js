
var providers = require('../database/Schemas/providers');

var providerController = {

   getProvider : function(userId,callback){

    /*  providers.findOne({user:userId}).populate(function(err,data){
          if(err) throw err;
                  callback(data);
      });*/

      providers.findOne({user:userId}).populate('products').exec(function(err,prov){
          if (err) throw err;
          //console.log(JSON.stringify(resulMac, null, "\t"));
          console.log('providers populated !');
          callback(prov);
      });
  }

}

module.exports = providerController;
