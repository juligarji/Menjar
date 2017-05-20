var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientsSchema = new Schema({
    user:{type:Schema.ObjectId, ref:'users'},
    name : {type:String,required:true},
    lastname : {type:String,required:true},
    born_date : {type:Date},
    gender : {type:String},

    created_at:{type:Date},
    updated_at:{type:Date}
});

var clients = mongoose.model('clients',clientsSchema);

module.exports = clients;
