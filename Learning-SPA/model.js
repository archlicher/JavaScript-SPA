var app = app || {};

app.model = (function () {
	
	function Model (baseUrl) {
		this.baseUrl = baseUrl;
		this.books = new Books(this.baseUrl);
	}

	var Request = (function(){

		function makeRequest(method, url, data, success, error) {
			$.ajax({
				method : method,
				headers : {
					'X-Parse-Application-Id' : 'qpVWBqcjeR1v3T3GNVZXsD4Mory7LY50Qvoa8eAq',
					'X-Parse-REST-API-Key' : 'GlCtO46uBCp4qhNBnvVLNu0RfPA1qBxSvsJYy4ag' 
				},
				url : url,
				contentType : 'application/json',
				data : JSON.stringify(data),
				success : success,
				error : error
			})
		}

		function getRequest(url, success, error) {
			makeRequest('GET', url, null, success, error);
		}

		function postRequest(url, data, success, error) {
			makeRequest('POST', url, data, success, error);
		}

		function putRequest(url, data, success, error) {
			makeRequest('PUT', url, data, success, error)
		}

		function deleteRequest(url, success, error) {
			makeRequest('DELETE', url, null, success, error);
		}

		return {
			getRequest : getRequest,
			postRequest : postRequest,
			putRequest : putRequest,
			deleteRequest : deleteRequest
		}
	}());

	var Books = (function (){

		function Books (baseUrl) {
			this.serviceUrl = baseUrl+'Book/';
		}

		Books.prototype.getAllBooks = function(success, error) {
			return Request.getRequest(this.serviceUrl, success, error);
		};

		Books.prototype.postBook = function(book, success, error) {
			return Request.postRequest(this.serviceUrl, book, success, error);
		};

		Books.prototype.editBook = function(id, fieldsToEdit, success, error) {
			return Request.putRequest(this.serviceUrl+id,fieldsToEdit,success,error);
		};

		Books.prototype.removeBook = function(id, success, error) {
			return Request.deleteRequest(this.serviceUrl+id, success, error);
		};

		return Books;
	}());

	return {
		loadModel : function (baseUrl) {
			return new Model(baseUrl);
		}
	}

}())