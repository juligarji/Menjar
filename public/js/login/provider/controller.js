
 //FUNCIONES PREDEFINIDAS ANTERIORMENTE
/*
  function createProduct(){


    var sentData = JSON.stringify({

          //img:$("input[name='img']").val(),
          //img:document.getElementById('img').files[0],
          name:$("input[name='name']").val(),
          category:$("select[name='category']").val(),
          expirationDate:$("input[name='expirationDate']").val(),
          price:parseFloat($("input[name='price']").val()),

          location:{
            lat:  parseFloat($('#location').attr('lat')),
            lng: parseFloat($('#location').attr('lng'))
          },

          description:$("textarea[name='description']").val()

    });


    var call = $.ajax({
          type:'POST',
          url:'/provider/new-product',
          //dataType:'json',
          //contentType: 'application/json',
          contentType: 'multipart/form-data',
          cache: false,
          //contentType: false,
          processData: false,

          data:sentData,
          sucess : function(data){
            console.log('sucess executed');
          }
    });

    call.done(function(data){

        //if(data==null) return;

    });

    call.fail(function(jqXHR, textStatus, error){
        console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
    });

  }
*/

function createProduct(){

  var myFormData = new FormData();
  var pictureInput = document.getElementById('img').files[0];


  myFormData.append('pictureFile',pictureInput);
  myFormData.append('name',$("input[name='name']").val());
  myFormData.append('category',$("select[name='category']").val());
  myFormData.append('expirationDate',$("input[name='expirationDate']").val());
  myFormData.append('price',$("input[name='price']").val());
  myFormData.append('lat',$('#location').attr('lat'));
  myFormData.append('lng',$('#location').attr('lng'));
    /*var obj = {
      "lat":  parseFloat($('#location').attr('lat')),
      "lng": parseFloat($('#location').attr('lng'))
    };*/

    //var strConv = JSON.stringify(obj);


 myFormData.append('description',$("textarea[name='description']").val());

 var call = $.ajax({
       type:'POST',
       url:'/provider/new-product',
       processData: false, // important
       contentType: false, // important
       dataType : 'json',
       data: myFormData,

       sucess : function(data){
         console.log('photo uploaded sucess');
         location.reload();
       }
 });

  call.done(function(data){

      //if(data==null) return;
      console.log('photo uploaded Done');
      location.reload();
  });

  call.fail(function(jqXHR, textStatus, error){
      console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
      //location.reload();
  });

}


function uploadPicture(){

  var myFormData = new FormData();
  var pictureInput = document.getElementById('img').files[0];
  var texto = "hola buenas";

  myFormData.append('pictureFile',pictureInput);
  myFormData.append('texto',texto);

  var call = $.ajax({
        type:'POST',
        url:'/provider/new-picture',
        processData: false, // important
        contentType: false, // important
        dataType : 'json',
        data: myFormData,

        sucess : function(data){
          console.log('photo uploaded');
        }
  });

  call.done(function(data){
  console.log('photo uploaded done');
      //if(data==null) return;
  });

  call.fail(function(jqXHR, textStatus, error){
      console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
  });

}


  function locate(){
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(loc){
        var text = "[" + loc.coords.latitude.toFixed(3) + "," + loc.coords.longitude.toFixed(3) + "]";
          $('#location').text(text);
          $('#location').attr('lat',loc.coords.latitude);
          $('#location').attr('lng',loc.coords.longitude);
          $('#location').removeClass('waves-effect');
          $('#location').removeClass('waves-light');
          $('#location').prop('disabled',true);
          $('#location').addClass('grey');
     });
 }
  }


  /* nUEVAS FUNCIONES */


  /*
  $(document).ready(function() {

   $('#uploadForm').submit(function() {
      $("#status").empty().text("File is uploading...");
      $(this).ajaxSubmit({

          error: function(xhr) {
      //status('Error: ' + xhr.status);
      console.log('Error ' + xhr.status);
          },

          success: function(response) {
      $("#status").empty().text(response);
              console.log(response);
          }
  });
      //Very important line, it disable the page refresh.
  return false;
  });
});
*/

/* Solucion terciario */
/*
function createProduct(){

  var myFormData = new FormData();
  myFormData.append('pictureFile',img.files[0]);

  var sentData = {

        //img:$("input[name='img']").val(),
        img:myFormData,
        name:$("input[name='name']").val(),
        category:$("select[name='category']").val(),
        expirationDate:$("input[name='expirationDate']").val(),
        price:parseFloat($("input[name='price']").val()),

        location:{
          lat:  parseFloat($('#location').attr('lat')),
          lng: parseFloat($('#location').attr('lng'))
        },

        description:$("textarea[name='description']").val()

  };


  var call = $.ajax({
        type:'POST',
        url:'/provider/new-product',
        //dataType:'json',
        //contentType: 'application/json',
        processData: false, // important
        contentType: false, // important
        dataType : 'json',
        data: sentData

        sucess : function(data){
          console.log('sucess executed');
        }
  });

  call.done(function(data){

      //if(data==null) return;

  });

  call.fail(function(jqXHR, textStatus, error){
      console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
  });

}
*/
