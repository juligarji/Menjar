

  function loginUser(){

    var sentData = JSON.stringify({

          email:$("input[name='email']").val(),
          password:$("input[name='password']").val(),
    });


    var call = $.ajax({
          type:'POST',
          url:'/login/redirect',
          //dataType:'json',
          contentType: 'application/json',

          data:sentData
    });

    call.done(function(data){

        //if(data==null) return;

        $('#returnMessage').text(data);
        $('.modal').modal();
        $('#errorModal').modal('open');

    });

    call.fail(function(jqXHR, textStatus, error){
        console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
    });

  }
