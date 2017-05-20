
  function createUser(idRef){


    var sentData = JSON.stringify({
          name:$(idRef  + " input[name='name']").val(),
          lastname:$(idRef  + " input[name='lastname']").val(),
          born_date:$(idRef  + " input[name='born_date']").val(),
          address:$(idRef  + " input[name='address']").val(),
          phone:$(idRef  + " input[name='phone']").val(),
          description:$(idRef  + " input[name='description']").val(),
          identification:$(idRef  + " input[name='identification']").val(),
          gender:$(idRef + " input[name='gender']").val(),
          email:$(idRef  + " input[name='email']").val(),
          password:$(idRef  + " input[name='password']").val(),
          role:$(idRef  + " input[name='role']").val()
    });

    console.log(sentData);

    var call = $.ajax({
          type:'POST',
          url:'/register/create-user',
          //dataType:'json',
          contentType: 'application/json',

          data:sentData
    });

    call.done(function(data){

        $('#returnMessage').text(data);
        $('.modal').modal();
        $('#creatorModal').modal('open');

    });

    call.fail(function(jqXHR, textStatus, error){
        console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
    });

  }
