var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {/* Punto de acceso a pagina principal */

  res.render('index');
});

module.exports = router;
