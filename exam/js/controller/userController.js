var app = app || {};

app.userController = (function() {
	function UserController (model, view) {
		this._model = model;
		this._view = view;
	}
	
	UserController.prototype.loadLoginScreen = function(selector) {
		this._view.loadLoginScreen.loadLoginScreenView(selector);
	};

	UserController.prototype.loadRegisterScreen = function(selector) {
		this._view.loadRegisterScreen.loadRegisterScreenView(selector);
	};

	UserController.prototype.login = function(username, password) {
		return this._model.login(username, password)
			.then(function (loginData){
				setUserToStorage(loginData);
				window.location.replace('#/home/');
				Noty.success('Successfully logged in.')
			}, function (error){
				Noty.error('Wrong username or password!');
			});
	};

	UserController.prototype.logout = function() {
		return this._model.logout()
			.then(function (){
				removeUserFromStorage();
				window.location.replace('#/');
				Noty.success('You are logged out.');
			}, function (error) {
				Noty.error('You have not logged out!');
			});
	};

	UserController.prototype.register = function(username, password, fullName) {
		return this._model.register(username, password, fullName)
			.then(function (regData){
				var userData = {
					username : username,
					fullName : fullName,
					objectId : regData.objectId,
					sessionToken : regData.sessionToken
				};
				setUserToStorage(userData);
				window.location.replace('#/home/');
				Noty.success('You have successfully registered.')
			}, function (error) {
				Noty.error('Unsuccessful register!');
			});
	};

	function setUserToStorage (data) {
		sessionStorage['username'] = data.username;
        sessionStorage['userId'] = data.objectId;
        sessionStorage['fullName'] = data.fullName;
        sessionStorage['sessionToken'] = data.sessionToken;
	}

	function removeUserFromStorage() {
		delete sessionStorage['username'];
        delete sessionStorage['userId'];
        delete sessionStorage['fullName'];
        delete sessionStorage['sessionToken'];
	}

	return {
		load : function (model, view) {
			return new UserController(model, view);
		}
	}
})();