var app = app || {}

app.addBookView = (function() {
	function render(controller, selector, data) {
		$.get('templates/addBook.html', function(template){
			var output = Mustache.render(template, data);

			$(selector).html(output);
		})
	}

	return {
		render : function(controller, selector, data) {
			render(controller, selector, data);
		}
	}
})();