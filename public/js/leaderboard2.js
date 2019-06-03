$(document).ready(function() {

  $.ajax({
    type: "GET",
    //url: "http://puppywebapi-env.8th8sduu2d.us-west-2.elasticbeanstalk.com/users",
    url: "https://xp28uhldb4.execute-api.us-west-2.amazonaws.com/2/users",
    contentType: "application/json",
    dataType: 'json',
    crossDomain: true,
    //data: data,
    headers: {
      Authorization: "..."
    },
    success: function(data, status) {
      console.log(data.data[0].name);
      console.log(data.data.slice(-1)[0]);
      gapi.load('auth2', function() {
        gapi.auth2.init();
      });
      $('<tr>').html(data.data.slice(-1)[0].name).appendTo('#welcome'); 
       
    
    }
  });

  $("#signout").click(function() {
    var auth2 = gapi.auth2.getAuthInstance();
    sessionStorage.setItem('auth_id', null);
    sessionStorage.setItem('user', null);
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    auth2.disconnect();
  });

    $.ajax({
      type: "GET",
      //url: "http://puppywebapi-env.8th8sduu2d.us-west-2.elasticbeanstalk.com/users",
      url: "https://xp28uhldb4.execute-api.us-west-2.amazonaws.com/2/users",
      contentType: "application/json",
      dataType: 'json',
      crossDomain: true,
      //data: data,
      headers: {
        Authorization: "..."
      },
      success: function(data, status) {
        console.log(data.data[0].name);
        $.each(data.data, function(index, dat) {
          $('<tr>').html("<td>" + data.data[index].name + "</td><td>" + data.data[index].quiz2t + "</td>").appendTo('#quiz2'); 
         
        })
      }
    });
  });