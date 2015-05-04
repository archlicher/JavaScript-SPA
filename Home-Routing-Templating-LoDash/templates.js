(function  () {
	var data = {data:[{name : 'Bob', job:'Web Designer', website: 'www.BobIsYourGuy.com'},
		{name : 'Josh', job:'C programmer', website: 'www.JoshCanC.com'},
		{name : 'Lili', job:'Back-End Programmer', website: 'www.LiliGotYourBack.com'}]};

	$.get('template.html',function(template){
		var output = Mustache.render(template, data);
		$('#problem2').append(output);
	})
}());