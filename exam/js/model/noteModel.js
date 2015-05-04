var app = app || {};

app.noteModel = (function() {
	function NoteModel (requester, headers, url) {
		this._requester = requester;
		this._headers = headers;
		this._baseUrl = url + 'classes/Note/';
	}

	NoteModel.prototype.listNotes = function(deadline) {
		var serviceUrl = this._baseUrl;
		if (deadline === 'deadline') {
			var today = '';
			var todayDate = new Date();
			today = dateToString(todayDate);
			serviceUrl += '?where={"deadline":"'+today+'"}';
		} else {
			serviceUrl += '?where={"author":"'+sessionStorage['fullName']+'"}';
		}
		return this._requester.get(this._headers.getHeaders(true), serviceUrl);
	};

	NoteModel.prototype.getById = function(productId) {
		var serviceUrl = this._baseUrl+productId;
		return this._requester.get(this._headers.getHeaders(true), serviceUrl);
	};

	NoteModel.prototype.add = function(title, text, deadline) {
		var userId = sessionStorage['userId'];
		var data = {
			title : title,
			text : text,
			author : sessionStorage['fullName'],
			deadline : deadline,
			ACL : {}
		};
		data.ACL[userId] = {'write':true, 'read':true};
		data.ACL['*'] = {'read':true }
		console.log(data);
		return this._requester.post(this._headers.getHeaders(true), this._baseUrl, data)
	};

	NoteModel.prototype.edit = function(productId, title, text, deadline) {
		var serviceUrl = this._baseUrl+productId;
		var data = {};
		return this._requester.put(this._headers.getHeaders(true), this._baseUrl, data)
	};

	NoteModel.prototype.remove = function(productId) {
		var serviceUrl = this._baseUrl+productId;
		return this._requester.remove(this._headers.getHeaders(true), serviceUrl);
	};
	
	function dateToString(date){
		var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var dateToString = '';
		var stringDate = date.toString();
		var arrDate = stringDate.split(' ');
		var month = MONTHS.indexOf(arrDate[1])+1;
		if(month<10) {
			month = '0' + month;
		}
		var year = arrDate[3];
		var day = arrDate[2];
		dateToString = year+'-'+month+'-'+day;

		return dateToString;
	}

	return {
		load : function (requester, headers, url) {
			return new NoteModel(requester, headers, url);
		}
	};
})();