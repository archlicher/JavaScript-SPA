var app = app || {};

app.headers = (function() {
	function Headers(appId, restKey, masterKey) {
		this._appId = appId;
		this._restKey = restKey;
		this._masterKey = masterKey;
	}

	Headers.prototype.getHeaders = function() {
		var headers = {
			'X-Parse-Application-Id' : this._appId,
			'X-Parse-REST-API-Key' : this._restKey,
			'Content-Type' : 'application/json'
		}

		if(sessionStorage['logged-in']) {
			headers['X-Parse-Session-Token'] = sessionStorage['logged-in'];
		}

		return headers;
	};

	Headers.prototype.getMasterHeaders = function() {
		var headers = {
			'X-Parse-Application-Id' : this._appId,
			'X-Parse-REST-API-Key' : this._restKey,
			'X-Parse-Master-Key' : this._masterKey,
			'Content-Type' : 'application/json'
		}

		if(sessionStorage['logged-in']) {
			headers['X-Parse-Session-Token'] = sessionStorage['logged-in'];
		}

		return headers;
	}

	return {
		load : function (applicationId, restApiKey, masterKey) {
			return new Headers(applicationId, restApiKey, masterKey);
		}
	}
})();