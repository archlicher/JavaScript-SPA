var app = app || {};

app.userView = (function() {
	function UserView () {
		this.loadLoginScreen = {
			loadLoginScreenView : loadLoginScreenView
		}

		this.loadRegisterScreen = {
			loadRegisterScreenView : loadRegisterScreenView
		}
	}

	function loadLoginScreenView (selector) {
		$.get('templates/login.html', function(template){
			var outputHtml = Mustache.render(template);
			$(selector).html(outputHtml);
		}).then(function(){
			$('#loginButton').click(function(){
				var username = $('#username').val();
				var password = $('#password').val();

				$.sammy(function(){
					this.trigger('loginUser', {username:username, password:password});
				})
				return false;
			})
		}).done();
	}

	function loadRegisterScreenView (selector) {
		$.get('templates/register.html', function(template){
			var outputHtml = Mustache.render(template);
			$(selector).html(outputHtml);
		}).then(function(){
			$('#registerButton').click(function(){
				var username = $('#username').val();
				var password = $('#password').val();
				var fullName = $('#fullName').val();
				$.sammy(function(){
					this.trigger('registerUser', {username:username, password:password, fullName:fullName});
				})
				return false;
			})
		}).done();
	}
	
	return {
		load : function () {
			return new UserView();
		}
	}
})();