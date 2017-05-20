var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var peopleSchema = new Schema({
    cedula:{type:Number,required:true,unique:true}
    name : {type:String,required:true},
    born_date: {type:Date,required:true},
    nacionality : {type:String,required:true},
    provider : {type:Schema.ObjectId ref :'providers'},
    created_at:{type:Date, required:true},
    updated_at:{type:Date,required = true}
});

var people = mongoose.model('people',peopleSchema);

module.exports = people;
