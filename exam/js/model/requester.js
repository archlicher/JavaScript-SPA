var app = app || {};

app.requester = (function() {
	function Requester(){

	}

	function makeRequest(method, headers, url, data) {
		var defer = Q.defer();

		$.ajax({
			method : method,
			headers : headers,
			url : url,
			data : JSON.stringify(data),
			success : function(result) {
				defer.resolve(result);
			},
			error : function(error) {
				defer.reject(error);
			}
		})

		return defer.promise;
	}

	Requester.prototype.get = function(headers, url) {
		return makeRequest('GET', headers, url);
	}

	Requester.prototype.post = function(headers, url, data) {
		return makeRequest('POST', headers, url, data);
	}

	Requester.prototype.put = function(headers, url, data) {
		return makeRequest('PUT', headers, url, data)
	}

	Requester.prototype.remove = function(headers, url) {
		return makeRequest('DELETE', headers, url);
	}

	return {
		load : function () {
			return new Requester();
		}
	}
})();