var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var path = require('path');

var port = 3000;
var index = require('./routes/index');
var db = require('./database/connection');

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port',port);
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Connectado a  MongoDB");
});


app.use('/',index);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(app.get('port'),function(){
      console.log('Escuchhando puerto :' + app.get('port'));
});
