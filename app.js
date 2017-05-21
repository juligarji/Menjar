var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// Importar conneccion a base de datos
var db = require('./database/connection');


// Puntos de acceso remotos a la aplicacion
// desde aqui se indexa todo en contenido de la plataforma

// Agregamos nuestros puntos de conexion
var index = require('./routes/index');
var login = require('./routes/login');
var client = require('./routes/client');
var register = require('./routes/register');
var provider = require('./routes/provider');

var test = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

// Databas econection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Connected mongo");
});

// llamada a los Routes
app.use('/', index);
app.use('/client', client);
app.use('/login', login);
app.use('/register', register);
app.use('/provider', provider);
app.use('/test', test);

app.use(express.static(__dirname + '/public'));


// Manejo de errores - Pendiente de implementar
// catch 404 and forward to error handler
/*

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/

// error handler
/*
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});*/

module.exports = app;
