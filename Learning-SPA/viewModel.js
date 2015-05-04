var app = app || {};

app.viewModel = (function () {
	function ViewModel (model) {
		this.model = model;
		this.addEventListener(this);
	}

	ViewModel.prototype.addEventListener = function (viewModel) {
		$('#add-book').click(function(){
			viewModel.addBook(viewModel);
		});
	}

	ViewModel.prototype.showAllBooks = function() {
		var _this = this;
		this.model.books.getAllBooks(
			function (data) {
				data.results.forEach(function(book){
					_this.addBookToDom(book.objectId, book.title, book.author, book.isbn);
				})
			},
			function (err) {
				console.log(err.responseText);
			}
		)
	};

	ViewModel.prototype.addBook = function(viewModel) {
		var _this = this;
		var bookTitle = $('#book-title').val();
		var bookAuthor = $('#book-author').val();
		var bookIsbn = $('#book-isbn').val();
		viewModel.model.books.postBook(
			{
				'title':bookTitle,
				'author':bookAuthor,
				'isbn':bookIsbn
			},
			function(data) {
				_this.addBookToDom(data.objectId, bookTitle, bookAuthor, bookIsbn);
			},
			function(err){
				console.log(err.responseText);
			}
		);
	}

	ViewModel.prototype.removeBook = function(bookId) {
		this.model.books.removeBook(
			bookId,
			function(data){
				$('#'+bookId).remove();
			},
			function(err){
				console.log(err.responseText);
			});
	}

	ViewModel.prototype.editBook = function(bookId) {
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
				_this.model.books.editBook(
					bookId, 
					book,
					function(data){
						if (newBookTitle != '') {
							$('#'+bookId+'>p:eq(0)').html(newBookTitle)
						}
						if (newBookAuthor != '') {
							$('#'+bookId+'>p:eq(1)').html(newBookAuthor)
						}
						if (newBookIsbn != '') {
							$('#'+bookId+'>p:eq(2)').html(newBookIsbn)
						}
						$('#form').hide();
					},
					function(err){
						console.log(err.responseText);
					})
			}
		})
		
	}

	ViewModel.prototype.addBookToDom = function (bObjectId, bTitle, bAuthor, bIsbn) {
		var _this = this;
		var bookWrapper = $('<div />').attr('class','book-list').attr('id',bObjectId);
		var bookTitle = $('<p />').text(bTitle);
		var bookAuthor = $('<p />').text(bAuthor);
		var bookIsbn = $('<p />').text(bIsbn);
		var editButton = $('<button>Edit book</button>')
		var deleteButton = $('<button class="delete-book">Delete book</button>')

		editButton.click(function(){
			_this.editBook(bObjectId);
		})
		deleteButton.click(function(){
			_this.removeBook(bObjectId);
		})

		bookWrapper.append(bookTitle)
					.append(bookAuthor)
					.append(bookIsbn)
					.append(editButton)
					.append(deleteButton);
		$('#container').append(bookWrapper);
	}

	return { 
		loadViewModel : function(model) {
			return new ViewModel(model);
		}
	}

}());