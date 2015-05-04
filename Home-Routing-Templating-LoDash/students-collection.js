(function() {
	var collection = [{"gender":"Male","firstName":"Joe","lastName":"Riley","age":22,"country":"Russia"},
						{"gender":"Female","firstName":"Lois","lastName":"Morgan","age":41,"country":"Bulgaria"},
						{"gender":"Male","firstName":"Roy","lastName":"Wood","age":33,"country":"Russia"},
						{"gender":"Female","firstName":"Diana","lastName":"Freeman","age":40,"country":"Argentina"},
						{"gender":"Female","firstName":"Bonnie","lastName":"Hunter","age":23,"country":"Bulgaria"},
						{"gender":"Male","firstName":"Joe","lastName":"Young","age":16,"country":"Bulgaria"},
						{"gender":"Female","firstName":"Kathryn","lastName":"Murray","age":22,"country":"Indonesia"},
						{"gender":"Male","firstName":"Dennis","lastName":"Woods","age":37,"country":"Bulgaria"},
						{"gender":"Male","firstName":"Billy","lastName":"Patterson","age":24,"country":"Bulgaria"},
						{"gender":"Male","firstName":"Willie","lastName":"Gray","age":42,"country":"China"},
						{"gender":"Male","firstName":"Justin","lastName":"Lawson","age":38,"country":"Bulgaria"},
						{"gender":"Male","firstName":"Ryan","lastName":"Foster","age":24,"country":"Indonesia"},
						{"gender":"Male","firstName":"Eugene","lastName":"Morris","age":37,"country":"Bulgaria"},
						{"gender":"Male","firstName":"Eugene","lastName":"Rivera","age":45,"country":"Philippines"},
						{"gender":"Female","firstName":"Kathleen","lastName":"Hunter","age":28,"country":"Bulgaria"}];

	function appendToDom(data) {
		$.get('student-template.html',function(template){
			var output = Mustache.render(template,data);
			$('#problem3').append(output);
		});
	};

	var age18to24 = _.filter(collection, function(obj){
		if(17<obj.age && obj.age<25) {
			return obj;
		}
	});

	var firstNameBeforeLastName = _.filter(collection, function(obj){
		if(obj.firstName.localeCompare(obj.lastName)<0) {
			return obj;
		}
	});

	var peopleFromBulgaria = _.where(collection,{'country':'Bulgaria'});

	var lastFive = _.slice(collection, collection.length-5, collection.length);

	var peopleMaleNotFromBg = _.filter(collection, function(obj) {
		if(obj.country != 'Bulgaria' && obj.gender === 'Male') {
			return obj;
		}
	}).slice(0,3);

	appendToDom({data:age18to24});
	appendToDom({data:firstNameBeforeLastName});
	appendToDom({data:peopleFromBulgaria});
	appendToDom({data:lastFive});
	appendToDom({data:peopleMaleNotFromBg});
})();