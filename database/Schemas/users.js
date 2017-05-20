var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
    role : {type:String,required:true},
    created_at:{type:Date},
    updated_at:{type:Date}
});

var users = mongoose.model('users',usersSchema);

module.exports = users;
