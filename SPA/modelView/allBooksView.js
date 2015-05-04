var app = app || {};

app.allBooksView = (function() {
	function render(controller, selector, data) {
		$.get('templates/allBooks.html', function(template){
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