//not used anymore

// $(function() {

//     $('#login-form-link').click(function(e) {
// 		$("#login-form").delay(100).fadeIn(100);
//  		$("#register-form").fadeOut(100);
// 		$('#register-form-link').removeClass('active');
// 		$(this).addClass('active');
// 		var user = document.getElementById('username');
// 		sessionStorage.setItem("user", user);
// 		e.preventDefault();
// 	});
// 	$('#register-form-link').click(function(e) {
// 		$("#register-form").delay(100).fadeIn(100);
//  		$("#login-form").fadeOut(100);
// 		$('#login-form-link').removeClass('active');
// 		$(this).addClass('active');
// 		e.preventDefault();
// 	}); 
// 	$('#register1').click(function(e) {
// 		console.log("clicked")
// 		var user = document.getElementById('register-username').value;
// 		/*
// 		$.post('http://localhost:27017/users', {name : user}, function (data, status) {
// 			alert("Data: " + data + "\nStatus: " + status);

// 		}); */
// 		var data = JSON.stringify({name: user});
// 		var xhr = $.ajax({
// 			type: "POST",
// 			//url: "http://puppywebapi-env.8th8sduu2d.us-west-2.elasticbeanstalk.com/users",
// 			url: "https://xp28uhldb4.execute-api.us-west-2.amazonaws.com/2/users",
// 			contentType: "application/json",
// 			dataType: 'json',
// 			crossDomain: true,
// 			data: data,

// 			success: function(data, status) {
// 				console.log(data);
// 				console.log(status);
// 				localStorage.setItem('user_id', data.id);
// 				location.href= '/q_one';
// 			}
// 		});
// 		return xhr;
		
// 	});


function onSignIn(user) {
	var prof = user.getBasicProfile();
	console.log('ID: ' + prof.getId());
	console.log('Name: ' + prof.getName());
	sessionStorage.setItem('auth_id', prof.getId());
	sessionStorage.setItem('user', prof.getName());
	var user2 = sessionStorage.getItem('user');
	var a_id = sessionStorage.getItem('auth_id');
	var data = JSON.stringify({name: user2, auth_id: a_id});
	$.ajax({
			type: "POST",
			//url: "http://puppywebapi-env.8th8sduu2d.us-west-2.elasticbeanstalk.com/users",
			url: "https://xp28uhldb4.execute-api.us-west-2.amazonaws.com/2/users",
			contentType: "application/json",
			dataType: 'json',
			crossDomain: true,
			data: data,

			success: function(data, status) {
				console.log(data);
				console.log(status);
				localStorage.setItem('user_id', data.id);
				location.href= '/q_one';
			}
		});
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }