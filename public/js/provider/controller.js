

  function createProduct(user){

    var sentData = JSON.stringify({

          img:$("input[name='img']").val(),
          name:$("input[name='name']").val(),
          category:$("select[name='category']").val(),
          expirationDate:$("input[name='expirationDate']").val(),
          price:parseFloat($("input[name='price']").val()),

          location:{
            lat:  parseFloat($('#location').attr('lat')),
            lng: parseFloat($('#location').attr('lng'))
          },

          description:$("textarea[name='description']").val(),

          _user:user
    });


    var call = $.ajax({
          type:'POST',
          url:'/provider/new-product',
          //dataType:'json',
          contentType: 'application/json',

          data:sentData
    });

    call.done(function(data){

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
