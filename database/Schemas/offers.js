var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var offersSchema = new Schema({
    ammount:{type:Number,default:0},
    name : {type:String,required:true,unique:true},
    product : {type:Schema.ObjectId ref :'products'},
    provider : {type:Schema.ObjectId ref :'providers'},
    
    created_at:{type:Date, required:true},
    updated_at:{type:Date,required = true}
});

var offers = mongoose.model('offers',offersSchema);

module.exports = offers;
