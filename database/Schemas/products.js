var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productsSchema = new Schema({
    img : {type:String,required:true},
   name : {type:String,required:true},
    category : {type:String,required:true},
    expirationDate : {type:Date},
    price:{type:Number,required:true},
    location: {
          lat:{type:Number,required:false},
          lon:{type:Number,required:false},
          ip:{type:String, required:false}
    },
    description:{type : String,default:''},

    inDate : {type:Date},
    discount: {type:Number,default:0}

    //category : {type: Schema.Types.ObjectId,required:true},


});

var products = mongoose.model('products',productsSchema);

module.exports = products;
