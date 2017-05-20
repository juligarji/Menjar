var mongoose = require('mongoose');
//mongoose.connect('mongodb://ejemplo:ejemplo@ds153710.mlab.com:53710/ejemplo');

/* Funcion que crea el punto de accesso a la base de datos */
/* La Crpeta Schemas contenen la creacion de las tablas de la base de datos */


mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

module.exports = db;
