define(function(require) {

	var Backbone = require("backbone");
	var URLHelper = require("helpers/URLHelper");
	var $ = require("jquery");

	var UserModel = Backbone.Model.extend({
		constructorName: "UserModel",
		errorMessage: "",

		DeviceId:"notinitialized",
		FacebookAccessToken: "notinitialized",
		Id: "notinitialized",
		Name:"",

		url: function(){
			return URLHelper.userLogin(this.Id, this.FacebookAccessToken, this.DeviceId);
		},
		
		initialize: function () {
			var self = this;
	        this.on("invalid", function (model, error) {
	            self.errorMessage = "Ups, an error occured during creating data for user";
	        });
        },

        parse: function(response){
			var results = $.parseJSON(JSON.stringify(response));
			this.FacebookAccessToken = results.FacebookAccessToken;
			return results;
		},

	    getUserDetails : function(){
	    	var self = this;
	    	console.log(this);
	    	console.log(this.Id + " " + this.FacebookAccessToken + " " + self.DeviceId);
			return this.fetch({
	    		success: function (response) {
	    			if (response.get('ExtendedToken') === "" || 
	    				response.get('ExtendedToken') === undefined ||
	    				response.get('ExtendedToken') === null)
	    			{
	    				self.errorMessage = "Ups, an error occured during extracting data for user";
	    			}
	    			console.log(self);
	    			self.trigger("userDataRead");
	        	},
	        	error: function (model, xhr, options) {
	        		self.errorMessage = "Ups, an error occured during extracting data for user";
	        		self.trigger("userDataRead");
        		}
    		});
		},

		logout: function(callfunction)
		{
		    var self = this;
		    $.get(URLHelper.userLogout(this.Id, this.DeviceId), 
		    	function(data) {
		    		if (data === false)
		    		{
		    			self.errorMessage = "Ups, an error occured during logging user out";
		    		}
			      	callfunction();
			    }, 'json').error(
			    	function() {
				    self.errorMessage = "Ups, an error occured during logging user out";
				    callfunction();
				});
		}
	});

	return UserModel;
});