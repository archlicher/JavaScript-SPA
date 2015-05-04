(function() {
	var books = [{"book":"The Grapes of Wrath","author":"John Steinbeck","price":"34,24","language":"French"},
					{"book":"The Great Gatsby","author":"F. Scott Fitzgerald","price":"39,26","language":"English"},
					{"book":"Nineteen Eighty-Four","author":"George Orwell","price":"15,39","language":"English"},
					{"book":"Ulysses","author":"James Joyce","price":"23,26","language":"German"},
					{"book":"Lolita","author":"Vladimir Nabokov","price":"14,19","language":"German"},
					{"book":"Catch-22","author":"Joseph Heller","price":"47,89","language":"German"},
					{"book":"The Catcher in the Rye","author":"J. D. Salinger","price":"25,16","language":"English"},
					{"book":"Beloved","author":"Toni Morrison","price":"48,61","language":"French"},
					{"book":"Of Mice and Men","author":"John Steinbeck","price":"29,81","language":"Bulgarian"},
					{"book":"Animal Farm","author":"George Orwell","price":"38,42","language":"English"},
					{"book":"Finnegans Wake","author":"James Joyce","price":"29,59","language":"English"},
					{"book":"The Grapes of Wrath","author":"John Steinbeck","price":"42,94","language":"English"}];

	function appendToDom(data) {
		$.get('books-template.html',function(template){
			var output = Mustache.render(template,data);
			$('#problem4').append(output);
		});
	};

	var groupedByLanguageSortedByAuthorPrice = _.chain(books)
												.flatten()	
												.groupBy('language')
												.map(function(group){
													return _.chain(group).sortBy('price').sortBy('author').value();
												})
												.value();

	var averagePriceAuthor = _.chain(books)
								.flatten()
								.groupBy('author')
								.map(function(author){
									var currentAuthor
									var sum = 0;
									_.each(author, function(book){
										currentAuthor = book.author;
										sum += parseFloat(book.price);
									})
									sum /= author.length
									return {'book':author.length,'author':currentAuthor,'price':sum, 'language': 'average'};
								})
								.value();

	var englishOrGermanPriceBelow30GroupedByAuthor = _.chain(books)
														.flatten()
														.filter(function(book){
															if (book.language==='English' || book.language==='German') {
																if (parseFloat(book.price) < 30) {
																	return book;
																}
															}
														})
														.groupBy('author')
														.value();

	for (var index in groupedByLanguageSortedByAuthorPrice) {
		appendToDom({data:groupedByLanguageSortedByAuthorPrice[index]});
	}

	for (var index in averagePriceAuthor) {
		appendToDom({data:averagePriceAuthor[index]});
	}

	for (var index in englishOrGermanPriceBelow30GroupedByAuthor) {
		appendToDom({data:englishOrGermanPriceBelow30GroupedByAuthor[index]});
	}

})();