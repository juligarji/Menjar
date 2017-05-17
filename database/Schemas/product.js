var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name : {type:String,required:true},
    inDate : {type:Date,required:true},
    expirationDate : {type:Date,required:true},
    discount: {type:Number,default:0},
    location: [{
          lat:{type:Number,required:true},
          lon:{type:Number,required:true},
          ip:{type:String, required:false}
    }],
    category : {type: Schema.Types.ObjectId,required:true},
    price:{type:String,required:true},
    description:{type : String,default:''}
});

var product = mongoose.model('product',productSchema);

module.exports = product;
