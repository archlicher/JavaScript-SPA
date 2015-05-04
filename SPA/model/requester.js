var app = app || {};

app.requester = (function() {
	function Requester(){

	}

	function makeRequest(method, headers, url, data) {
		var deffer = Q.defer();

		$.ajax({
			method : method,
			headers : headers,
			url : url,
			data : JSON.stringify(data),
			success : function(result) {
				deffer.resolve(result);
			},
			error : function(error) {
				deffer.reject(error);
			}
		})

		return deffer.promise;
	}

	Requester.prototype.getRequest = function(headers, url) {
		return makeRequest('GET', headers, url);
	}

	Requester.prototype.postRequest = function(headers, url, data) {
		return makeRequest('POST', headers, url, data);
	}

	Requester.prototype.putRequest = function(headers, url, data) {
		return makeRequest('PUT', headers, url, data)
	}

	Requester.prototype.deleteRequest = function(headers, url) {
		return makeRequest('DELETE', headers, url);
	}

	return {
		load : function () {
			return new Requester();
		}
	}
})();