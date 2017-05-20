var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var consumersSchema = new Schema({
    cedula: {type:Number,required:true,unique=true},
    created_at : {type:Date,required:true},
    updated_at : {type:Date,required:true}
});

var product = mongoose.model('consumers',consumersSchema);

module.exports = consumers;
