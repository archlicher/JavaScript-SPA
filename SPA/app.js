var app = app || {};

(function () {
	var appId = 'qpVWBqcjeR1v3T3GNVZXsD4Mory7LY50Qvoa8eAq';
	var restKey = 'GlCtO46uBCp4qhNBnvVLNu0RfPA1qBxSvsJYy4ag';

	var headers = app.headers.load(appId, restKey);
	var requester = app.requester.load()

	var model = app.model.loadModel('https://api.parse.com/1/classes/', requester, headers);
	var controller = app.controller.loadController(model);

	app.router = Sammy(function(){
		var selector = '#container';

		this.get('#/wrapper', function(){
			controller.loadBooks(selector);			
		})
	})

	app.router.run('#/wrapper');
}());

$('#form').hide();