var app = app || {};

app.homeController = (function() {
	function HomeController (view) {
		this._view = view;
	}

	HomeController.prototype.welcomeScreen = function(selector) {
		this._view.welcomeScreen.loadWelcomeScreen(selector);
	};
	
	HomeController.prototype.homeScreen = function(selector) {
		var data = {
			fullName : sessionStorage['fullName'],
			username : sessionStorage['username']
		};
		this._view.homeScreen.loadHomeScreen(selector, data);
	};

	return {
		load : function (view) {
			return new HomeController(view);
		}
	}
})();