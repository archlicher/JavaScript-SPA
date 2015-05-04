var app = app || {};

(function () {
	var model = app.model.loadModel('https://api.parse.com/1/classes/');
	var viewModel = app.viewModel.loadViewModel(model);
	viewModel.showAllBooks();
}());

$('#form').hide();