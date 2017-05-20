var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var charitiesSchema = new Schema({
    name : {type:String,required:true,unique:true},
    address : {type:String,required:true},
    phone : {type:Number,required:true},
    description: {type:String,required:true},
    created_at:{type:Date, required:true},
    updated_at:{type:Date,required = true}
});

var charities = mongoose.model('charities',charitiesSchema);

module.exports = charities;
