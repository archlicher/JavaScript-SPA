var app = app || {};

app.removeBook = (function() {
	function render (selector) {
		$(selector).remove();
	}

	return {
		render : function(selector){
			render(selector);
		}
	}
})();