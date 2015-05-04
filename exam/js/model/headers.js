var app = app || {};

app.headers = (function() {
	function Headers(appId, restKey) {
		this._appId = appId;
		this._restKey = restKey;
	}

	Headers.prototype.getHeaders = function(useSessionToken) {
		var sessionToken = sessionToken;
		
		var headers = {
			'X-Parse-Application-Id' : this._appId,
			'X-Parse-REST-API-Key' : this._restKey,
			'Content-Type' : 'application/json',
		}

		if(sessionStorage['sessionToken'] && useSessionToken) {
			headers['X-Parse-Session-Token'] = sessionStorage.sessionToken;
		}

		return headers;
	};

	return {
		load : function (applicationId, restApiKey) {
			return new Headers(applicationId, restApiKey);
		}
	}
})();