var mongoose = require('mongoose');

mongoose.connect('mongodb://menj_test:menj_test@ds157641.mlab.com:57641/menjar_test');

//mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

module.exports = db;
