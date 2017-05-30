
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var multer = require('multer');
var PRODUCTS_ADDRESS = './public/resources/products/';

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, PRODUCTS_ADDRESS);
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

//var upload = multer({ storage : storage}).single('pictureFile');
var upload = multer({ storage : storage}).any();

//var upload = multer({ dest: 'uploads/' });
//var upload = multer({ storage: storage });

/* Punto de acceso que maneja las peticiones de los clientes */

var providerController = require('../controllers/providerController');
var productController = require('../controllers/productController');
var sessionController = require('../controllers/sessionController');

/*Funciones de Routing */


var newProduct = function(req,res){// crea un punto de accesso para la creacion de un nuevo producto

/*
    console.log('Llego foto :' + req.files[0].filename);
    console.log('Llego texto :');
    console.log(data,null,'\t');
    res.end();
*/

    sessionController.controlSession(req,res,
      function(usr){

        var data = req.body;
        data.img = "resources/products/" + req.files[0].filename;
        var new_data = productController.sortProductData(data);

        productController.addProduct(new_data,function(new_product){
                //console.log('new Product :' + usr);
                providerController.pushProduct(usr,new_product,function(){
                    // revisar porque tiene implementacion directa en mongo

                      console.log('Producto Guardado exitosamente');
                      //res.redirect(req.get('referer'));
                      //res.redirect('/provider');
                      res.redirect('back');
                      //res.send(req.file);
                      //res.end();
                });
        });
      },
      function(){
          console.log('la sesion caduco');
      });
};

var newPicture = function(req,res){// crea un punto de accesso para la creacion de un nuevo producto

    //var data = req.body;
    /*
    upload(req,res,function(err){
        if (err) throw err;
          console.log('File is uploaded');
          res.end();
    })
    console.log(typeof(req.body));*/
    console.log('Llego foto :' + req.files[0].filename);
    console.log('Llego texto :');
    console.log(req.body,null,'\t');
    res.end();

};

var deleteProduct = function(req,res){// crea un punto de accesso para la creacion de un nuevo producto

    var data = req.body;

    sessionController.controlSession(req,res,
      function(usr){
          console.log('Id borrado : '+ data.prodId);
        providerController.pullProduct(usr,data.prodId,function(){
              productController.removeProduct(data.prodId,function(){
                  console.log('Producto removido exitosamente');
              });
        });
          res.redirect('back');

      },
      function(){
          console.log('la sesion caduco');
      });
};

var uploadImage = function(req,res){
        console.log('Picture recieved :' + req.file.fieldname);
        res.end();
}

router.get('/',function(req,res){

  sessionController.controlSession(req,res,
    function(usr){
      sessionController.redirectByRole(usr,req,res,function(){
          console.log('redirigido a la pag principal del rol');
      });
    },
    function(){
        console.log('la sesion caduco');
    });
});

/* Puntos de acceso remotos */
router.post('/new-product',upload,newProduct);
//router.post('/new-picture',upload,newPicture);
router.post('/delete-product',jsonParser,deleteProduct);
//router.post('/picture-product',upload.any(),uploadImage);


module.exports = router;
