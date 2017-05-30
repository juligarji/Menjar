
var products = require('../database/Schemas/products');

var productController = {


  getAllProducts : function(callback){

        products.find({},function(err,prod){
            if(err) throw err;
                callback(prod);
        });
  },

  addProduct : function(prod_data,callback){// agrega un producto a la base de datos

      var new_product = new products(prod_data);
      new_product.save(function(err){
          if (err) throw err;
              callback(new_product);
      });
  },

  sortProductData : function(data){
      var locationFix = {
          lat:parseFloat(data.lat),
          lng:parseFloat(data.lng)
      };


    var new_data={// Da buena forma a la informacion recibida
          img:data.img,
         name:data.name,
          category:data.category,
          expirationDate:new Date(data.expirationDate),
          price:data.price,
          location:locationFix,
          description:data.description
    }
    return new_data;
  },

  removeProduct : function(prodId,callback){// quita un producto
      console.log('A remover :'+ prodId)
      products.findOneAndRemove({_id:prodId},function(err){
            if (err) throw err;
                  callback();

      });
  }

}

module.exports = productController;
