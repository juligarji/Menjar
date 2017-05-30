
var providers = require('../database/Schemas/providers');

var providerController = {

   getProvider : function(userId,callback){
      console.log('ID de user: ' + userId);
      providers.findOne({user:userId}).populate('products').exec(function(err,prov){
          if (err) throw err;
          //console.log(JSON.stringify(resulMac, null, "\t"));
          console.log('providers populated !');

          callback(prov);
      });
  },

  getAllProviders : function(callback){

        providers.find({},function(err,prov){
            if(err) throw err;
                callback(prov);
        });
  },

  pushProduct : function(proId,prodData,callback){// agrega una nueva referencia de producto

        providers.findOne({user:proId},function(err,prov){
            if(err) throw err;

                prov.products.push(prodData);

                    prov.save(function(err){
                          if(err)throw err;
                              callback();
                    });

        });
  },

  pullProduct : function(provId,prodId,callback){// agrega una nueva referencia de producto

        providers.findOne({user:provId},function(err,prov){
            if(err) throw err;

                prov.products.pull({ _id:prodId});

                    prov.save(function(err){
                          if(err)throw err;
                              callback();
                    });

        });
  }

}

module.exports = providerController;
