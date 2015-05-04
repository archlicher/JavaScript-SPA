(function () {
	var router = new Sammy(function(){
		var selector = '#problem1'

		this.get('#/Bob',function(){
			$(selector).html('<h2>Hello Bob<h2>')
		});

		this.get('#/Josh',function(){
			$(selector).html('<h2>Hello Josh<h2>')
		});

		this.get('#/Lili',function(){
			$(selector).html('<h2>Hello Lili<h2>')
		});

		this.get('#/Marvin',function(){
			$(selector).html('<h2>Hello Marvin<h2>')
		});
	});

	router.run('#');
}());