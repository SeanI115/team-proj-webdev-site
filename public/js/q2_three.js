
$(document).ready(function() {

  $.ajax({
    type: "GET",
    //url: "http://puppywebapi-env.8th8sduu2d.us-west-2.elasticbeanstalk.com/users",
    url: "https://xp28uhldb4.execute-api.us-west-2.amazonaws.com/2/users",
    contentType: "application/json",
    dataType: 'json',
    crossDomain: true,

    success: function(data, status) {
      console.log(data.data[0].name);
      console.log(data.data.slice(-1)[0]);
      gapi.load('auth2', function() {
        gapi.auth2.init();
      });
      $('<center>').html(data.data.slice(-1)[0].name).appendTo('#welcome'); 
      $('<tr>').html(data.data.slice(-1)[0].quiz2t).appendTo('#score'); 
       
    
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
  })
  
  $("#subButton").click(function() {
      var checkId = $("#q_three input:checkbox:checked").map(function() {
        return $(this).val();
      }).get();
      console.log("selected::::" + checkId);

      if(checkId == 10){
        $("#subModal").find('.modal-body').text('Correct Answer!!!');
        $("#subModal").find('.modal-content').fadeOut(3000);
        $('body').delay(3000).fadeOut(300, function(){
                $(location).attr('href', '/leaderboard2')
              });

      } else {
        $("#subModal").find('.modal-body').text('Wrong Answer!!!');
        $("#subModal").find('.modal-content').fadeOut(3000);
        $('body').delay(3000).fadeOut(300, function(){
                $(location).attr('href', '/leaderboard2')
              });

      }
      var pId = localStorage.getItem('user_id');
        //var pId = '5cb500f07eb66c12ea40f280';
        var data = JSON.stringify({quizNum: 2, quizq: 3, res: checkId});
        $.ajax({
          type: "PUT",
          //url: "http://puppywebapi-env.8th8sduu2d.us-west-2.elasticbeanstalk.com/users",
          url: "https://xp28uhldb4.execute-api.us-west-2.amazonaws.com/2/users/"+pId,
          contentType: "application/json",
          dataType: 'json',
          crossDomain: true,
          data: data,

          success: function(data, status) {
            console.log(data);
            console.log(status);
            //localStorage.setItem('user_id', data.id);
          }
        });
      $("#subModal").show();
  });
});