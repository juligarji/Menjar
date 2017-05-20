var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var donationsSchema = new Schema({
    description: {type:String,required:true},
    state: {type:String,required:true},
    date : {type:Date,required:true},

    created_at:{type:Date, required:true},
    updated_at:{type:Date,required : true}
});

var donations = mongoose.model('donations',donationsSchema);

module.exports = donations;
