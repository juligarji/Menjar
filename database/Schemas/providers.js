var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var providersSchema = new Schema({
    user:{type:Schema.ObjectId, ref:'users'},
    name : {type:String,required:true},
    lastname : {type:String,required:true},
    identification:{type:Number,required:true,unique:true},
    address:{type:String,required:true},
    phone:{type:Number,required:true},
    born_date:{type:Date},
    gender:{type:String},
    description: {type:String,required:true},

    created_at:{type:Date},
    updated_at:{type:Date}
});

var providers = mongoose.model('providers',providersSchema);

module.exports = providers;
