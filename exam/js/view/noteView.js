var app = app || {};

app.noteView = (function() {
	function NoteView () {
		this.loadListNotes = {
			loadListNotesView : loadListNotesView
		}
		this.loadAddNote = {
			loadAddNoteView : loadAddNoteView
		}
		this.loadEditNote = {
			loadEditNoteView : loadEditNoteView
		}
		this.loadDeleteNote = {
			loadDeleteNoteView : loadDeleteNoteView
		}
	}

	function loadListNotesView (selector, data, deadline) {
		if (deadline === 'deadline') {
			$.get('templates/officeNoteTemplate.html', function (template) {
				var outputHtml = Mustache.render(template, data);
				$(selector).html(outputHtml);
			});
		} else {
			$.get('templates/myNoteTemplate.html', function (template) {
				var outputHtml = Mustache.render(template, data);
				$(selector).html(outputHtml);
			}).then(function(){
				var data = {};
				$('#editButton').click(function () {
					var parent = this.parentNode;
					objectId = parent.getAttribute('id');

					$.sammy(function () {
						this.trigger('enterEditNote', {objectId:objectId})
					});
				});
				$('#deleteButton').click(function () {
					var parent = this.parentNode;
					objectId = parent.getAttribute('id');
					console.log(data);

					$.sammy(function () {
						this.trigger('enterDeleteNote', {objectId:objectId})
					});
				});
			});
		}
	}

	function loadAddNoteView (selector) {
		$.get('templates/addNote.html', function (template) {
			var outputHtml = Mustache.render(template);
			$(selector).html(outputHtml);
		}).then(function () {
			$('#addNoteButton').click(function () {
				var title = $('#title').val();
				var text = $('#text').val();
				var deadline = document.getElementById('deadline').value;
				deadline = deadline.toString();
				$.sammy(function () {
					this.trigger('addNote', {title:title, text:text, deadline:deadline});
				})
				return false;
			})
		}).done();
	}
	
	function loadEditNoteView (selector, data) {
		$.get('templates/editNote.html', function (template) {
			var outputHtml = Mustache.render(template, data);
			$(selector).html(outputHtml);
		}).then(function () {
			$('#editNoteButton').click(function () {
				var noteId = $('#edit-note').attr('data-id');
				var title = $('#title').val();
				var text = $('#text').val();
				var deadline = $('#deadline').val();
				deadline = deadline.toString();

				$.sammy(function () {
					this.trigger('editNote', {title:title, text:text, deadline:deadline});
				})
				return false;
			});
		}).done();
	}

	function loadDeleteNoteView (selector, data) {
		$.get('templates/deleteNote.html', function (template) {
			var outputHtml = Mustache.render(template, data);
			$(selector).html(outputHtml);
		}).then(function (){
			$('#deleteNoteButton').click(function(){
				$.sammy(function(){
					this.trigger('deleteNote', {objectId:data.objectId})
				})
				return false;
			});
		}).done();
	}

	return {
		load : function () {
			return new NoteView();
		}
	}
})();