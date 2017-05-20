var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fundationsSchema = new Schema({
    user:{type:Schema.ObjectId, ref:'users'},
    name : {type:String,required:true},
    identification:{type:Number,required:true,unique:true},
    address:{type:String,required:true},
    phone:{type:Number,required:true},
    born_date:{type:Date},
    description: {type:String,required:true},

    created_at:{type:Date, required:true},
    updated_at:{type:Date,required : true}
});

var fundations = mongoose.model('fundations',fundationsSchema);

module.exports = fundations;
