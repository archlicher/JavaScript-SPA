var app = app || {};

app.model = (function () {
	
	function Model (baseUrl, requester, headers) {
		this.serviceUrl = baseUrl+'Book/';
		this._headers = headers;
		this._requester = requester;
	}

	Model.prototype.getAllBooks = function() {
		var headers = this._headers.getHeaders();

		return this._requester.getRequest(headers, this.serviceUrl);
	};

	Model.prototype.postBook = function(book) {
		var headers = this._headers.getHeaders();

		return this._requester.postRequest(headers, this.serviceUrl, book);
	};

	Model.prototype.editBook = function(id, fieldsToEdit) {
		var headers = this._headers.getHeaders();

		return this._requester.putRequest(headers, this.serviceUrl+id,fieldsToEdit);
	};

	Model.prototype.removeBook = function(id) {
		var headers = this._headers.getHeaders();

		return this._requester.deleteRequest(headers, this.serviceUrl+id);
	};

	return {
		loadModel : function (baseUrl, requester, headers) {
			return new Model(baseUrl, requester, headers);
		}
	}

}())