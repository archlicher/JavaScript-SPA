var app = app || {};

app.controller = (function () {

	$('.edit-button-book').click(function(){
		var objectId = target.parent.id;
		controller.editBook(objectId);
	})

	$('.delete-button-book').click(function(){
		var objectId = target.parent.id;
		controller.removeBook(objectId);
	})

	function Controller (model) {
		this._model = model;
		this.addEventListener(this);
	}

	Controller.prototype.addEventListener = function (controller) {
		$('#add-book').click(function(){
			controller.addBook(controller);
		});
	}

	Controller.prototype.loadBooks = function(selector) {
		var _this = this;

		this._model.getAllBooks().then(function(data){
			var books = {
				books: data.results
			}

			app.allBooksView.render(_this, selector, books)
		}, function(error){
			console.log(error.responseText);
		})
	};

	Controller.prototype.addBook = function(controller) {
		var _this = this;
		var bookTitle = $('#book-title').val();
		var bookAuthor = $('#book-author').val();
		var bookIsbn = $('#book-isbn').val();
		var selector = '#container';
		controller._model.postBook(
			{
				'title':bookTitle,
				'author':bookAuthor,
				'isbn':bookIsbn
			}
		).then(function(data){
			var book = {
						'objectId':data.objectId,
						'title':bookTitle,
						'author':bookAuthor,
						'isbn':bookIsbn	
			}

			app.addBook.render(_this, selector, book)
		}, function(error){
			console.log(error.responseText);
		})
	}

	Controller.prototype.removeBook = function(bookId) {
		var selector = '#'+bookId;

		this._model.removeBook(bookId).then(function(){
			app.removeBook.render(selector)
		}, function(error){
			console.log(error.responseText);
		})
	}

	Controller.prototype.editBook = function(bookId) {
		var _this = this;
		$('#form').show();
		$('#edit-book').click(function(){
			var newBookTitle = $('#new-book-title').val();
			var newBookAuthor = $('#new-book-author').val();
			var newBookIsbn = $('#new-book-isbn').val();
			var book = {};
			if (newBookTitle != '') {
				book.title = newBookTitle;
			}
			if (newBookAuthor != '') {
				book.author = newBookAuthor;
			}
			if (newBookIsbn != '') {
				book.isbn = newBookIsbn;
			}
			if (book != {}) {
				_this.model.books.editBook(bookId, book).then(function(){
					app.editBook(bookId, book);
				}, function(error){
					console.log(error.responseText);
				})
			}
		})
	}

	return { 
		loadController : function(model) {
			return new Controller(model);
		}
	}

}());