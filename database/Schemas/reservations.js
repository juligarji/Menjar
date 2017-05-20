var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationsSchema = new Schema({
    ammount:{type:Number,required:true},
    description: {type:String,required:true},
    limit_date:{type:Date,required:true},
    reservation_date:{type:Date,required:true},
    datetime: {type:Date,required:true},
    provider : {type:Schema.ObjectId ref :'providers'},
    consumer : {type:Schema.ObjectId ref :'consumers'},
    created_at:{type:Date, required:true},
    updated_at:{type:Date,required = true}
});

var reservations = mongoose.model('reservations',reservationsSchema);

module.exports = reservations;
