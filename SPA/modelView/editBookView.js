var app = app || {}

app.editBook = (function() {
	function render (bookId, book) {
		if(book.title) {
			$('#'+bookId>'p').eq(0).text(book.title);
		}
		if(book.author) {
			$('#'+bookId>'p').eq(1).text(book.author);
		}
		if(book.isbn) {
			$('#'+bookId>'p').eq(2).text(book.isbn);
		}
	}

	return {
		render : function (bookId, book) {
			render(bookId, book)
		}
	}
})();