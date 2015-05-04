var app = app || {};

app.userModel = (function() {
	function UserModel (requester, headers, url) {
		this._requester = requester;
		this._headers = headers;
		this._baseUrl = url;
	}

	UserModel.prototype.login = function(username, password) {
		var serviceUrl = this._baseUrl + 'login?username=' + username + '&password=' + password;
		return this._requester.get(this._headers.getHeaders(), serviceUrl);
	};

	UserModel.prototype.logout = function() {
		var serviceUrl = this._baseUrl + 'logout';
		return this._requester.post(this._headers.getHeaders(true), serviceUrl)
	};

	UserModel.prototype.register = function(username, password, fullName) {
		var serviceUrl = this._baseUrl + 'users';
		var data = {
			username : username,
			password : password,
			fullName : fullName
		};
		return this._requester.post(this._headers.getHeaders(), serviceUrl, data);
	};

	return {
		load : function (requester, headers, url) {
			return new UserModel (requester, headers, url);
		}
	}
})();