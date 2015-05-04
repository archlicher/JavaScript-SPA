var app = app || {};

app.homeView = (function() {
	function HomeView () {
		this.welcomeScreen = {
			loadWelcomeScreen : loadWelcomeScreen
		}
		this.homeScreen = {
			loadHomeScreen : loadHomeScreen
		}
	}

	function loadWelcomeScreen (selector) {
		$.get('templates/welcome.html', function (template) {
			var outputHtml = Mustache.render(template);
			$(selector).html(outputHtml);
		});
	}
	
	function loadHomeScreen (selector, data) {
		$.get('templates/home.html', function (template) {
			var outputHtml = Mustache.render(template, data);
			$(selector).html(outputHtml);
		});
	}

	return {
		load : function () {
			return new HomeView();
		}
	}
})();