var app = app || {};

app.noteController = (function() {
	function NoteController (model, view) {
		this._model = model;
		this._view = view;
	}

	NoteController.prototype.listNotes = function(selector, deadline) {
		var _this = this;
		return this._model.listNotes(deadline)
			.then(function (data){
				_this._view.loadListNotes.loadListNotesView(selector, data, deadline);
			}, function (error){
				Noty.error('Server not responding!');
			});
	};

	NoteController.prototype.addNote = function(selector) {
		this._view.loadAddNote.loadAddNoteView(selector);
	};

	NoteController.prototype.add = function(title, text, deadline) {
		console.log(deadline);
		return this._model.add(title, text, deadline)
			.then(function (){
				window.location.replace('#/myNotes/');
				Noty.success('You have successfully added a new note.');
			}, function (error) {
				Noty.error('Wrong data! Please check yout input and try again!');
			});
	};

	NoteController.prototype.enterEdit = function(selector, productId) {
		var _this = this;
		return this._model.getById(productId)
			.then(function(data){
				_this._view.loadEditNote.loadEditNoteView(selector, data)
			});
	}

	NoteController.prototype.enterDelete = function(selector, productId) {
		var _this = this;
		return this._model.getById(productId)
			.then(function(data){
				_this._view.loadDeleteNote.loadDeleteNoteView(selector, data)
			});
	}

	NoteController.prototype.edit = function(productId, title, text, deadline) {
		return this._model.post(productId)
			.then(function (){
				window.location.replace('#/myNotes/');
				Noty.success('You have successfully edited a note.');
			}, function (error){
				Noty.error('Wrong intput data!');
			});
	};

	NoteController.prototype.remove = function(productId) {
		return this._model.remove(productId)
			.then(function (){
				window.location.replace('#/myNotes/');
				Noty.success('You have successfully deleted a note.');
			}, function (error){
				Noty.error('Requested delete was not successful!');
			});
	};

	return {
		load : function (model, view) {
			return new NoteController(model, view);
		}
	}
})();