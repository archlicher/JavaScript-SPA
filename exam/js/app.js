(function() {
	var appId = 'zpqtwik924nLRuwlvixJqobb2uKCzKMRZu5zHhcP',
		restApiKey = '9fQlX01Y1Lu92czIjsVvQOajdSghGEWAjjOFIHSg',
		url = 'https://api.parse.com/1/';

	var headers = app.headers.load(appId, restApiKey);
	var requester = app.requester.load();
	var userModel = app.userModel.load(requester, headers, url);
	var noteModel = app.noteModel.load(requester, headers, url);
	var userModel = app.userModel.load(requester, headers, url);

	var homeView = app.homeView.load();
	var userView = app.userView.load();
	var noteView = app.noteView.load();
	
	var homeController = app.homeController.load(homeView);
	var userController = app.userController.load(userModel, userView);
	var noteController = app.noteController.load(noteModel, noteView);

	app.router = Sammy(function () {
		var selector = '#container';

		this.before('#/home/', function() {
            var userId = sessionStorage['userId'];
            if(!userId) {
                this.redirect('#/');
                return false;
            }
        });

        this.before(function () {
        	var userId = sessionStorage['userId'];
        	if(userId) {
        		$('#menu').show();
        	} else {
        		$('#menu').hide();
        	}
        })

        this.before('#/officeNotes/', function() {
            var userId = sessionStorage['userId'];
            if(!userId) {
                this.redirect('#/');
                return false;
            }
        });

        this.before('#/myNotes/', function() {
            var userId = sessionStorage['userId'];
            if(!userId) {
                this.redirect('#/');
                return false;
            }
        });

        this.before('#/addNote/', function() {
            var userId = sessionStorage['userId'];
            if(!userId) {
                this.redirect('#/');
                return false;
            }
        });

        this.before('#/logout/', function() {
            var userId = sessionStorage['userId'];
            if(!userId) {
                this.redirect('#/');
                return false;
            }
        });

        this.get('#/', function () {
        	homeController.welcomeScreen(selector);
        })

        this.get('#/login/', function () {
            userController.loadLoginScreen(selector);
        });

        this.get('#/register/', function () {
            userController.loadRegisterScreen(selector);
        });

        this.get('#/home/', function () {
            homeController.homeScreen(selector);
        });

        this.get('#/office/', function () {
        	noteController.listNotes(selector, 'deadline');
        });

        this.get('#/myNotes/', function () {
        	noteController.listNotes(selector);
        });

        this.get('#/addNote/', function () {
        	noteController.addNote(selector);
        });

        this.get('#/logout/', function () {
        	userController.logout();
        });

        this.bind('addNote', function (e, data) {
        	noteController.add(data.title, data.text, data.deadline);
        });

        this.bind('editNote', function (e, data) {
        	noteController.edit(selector, data.objectId);
        });

        this.bind('enterEditNote', function (e, data) {
        	noteController.enterEdit(selector, data.objectId);
        });

        this.bind('deleteNote', function (e, data) {
        	noteController.remove(data.objectId);
        });

        this.bind('enterDeleteNote', function (e, data) {
        	noteController.enterDelete(selector, data.objectId);
        });

        this.bind('loginUser', function (e, data) {
        	userController.login(data.username, data.password);
        });

        this.bind('registerUser', function (e, data) {
        	userController.register(data.username, data.password, data.fullName);
        });
	});

	app.router.run('#/');

})();