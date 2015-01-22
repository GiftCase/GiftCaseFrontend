define(function(require) {

	var Backbone = require("backbone");
	var URLHelper = require("helpers/URLHelper");
	var $ = require("jquery");

	var UserModel = Backbone.Model.extend({
		constructorName: "UserModel",
		errorMessage: "",

		DeviceId: undefined,
		FacebookAccessToken: "notinitialized",
		Id: "notinitialized",
		Name:"",
		url: "",

		url: function(){
			return this.url;
		},
		
		initialize: function (options) {
			var self = this;
	        this.on("invalid", function (model, error) {
	            self.errorMessage = "Ups, an error occured during creating data for user";
	        });
        },

        parse: function(response){
			var results = $.parseJSON(JSON.stringify(response));
			return results;
		},

	    login : function(){
	    	this.errorMessage = "";
	    	var self = this;
	    	this.url = URLHelper.userLogin(this.Id, this.FacebookAccessToken, this.DeviceId);
	    	//console.log("login");
	    	//console.log(this);
	    	//console.log(this.Id + " " + this.FacebookAccessToken + " " + self.DeviceId);
			return this.fetch({
	    		success: function (response) {
	    			//alert("login" + response.get('FacebookAccessToken'));
	    			//console.log("glogin ");
	    			//console.log(self);
	    			if (response.get('FacebookAccessToken') === "" || 
	    				response.get('FacebookAccessToken') === undefined ||
	    				response.get('FacebookAccessToken') === null)
	    			{
	    				self.errorMessage = "Ups, an error occured during extracting data for user";
	    			}

					this.FacebookAccessToken = response.get('FacebookAccessToken');
	    			self.trigger("loginDataRead");
	        	},
	        	error: function (model, xhr, options) {
	        		self.errorMessage = "Ups, an error occured during extracting data for user";
	        		self.trigger("loginDataRead");
        		}
    		});
		},

		getUserDetails: function(){
			this.errorMessage = "";
			var self = this;
			this.url = URLHelper.userDetails(this.Id);
			//alert("getUserDetails " + this.Id + " " + this.FacebookAccessToken + " " + self.DeviceId);
			//alert(this.url);
			return this.fetch({
	    		success: function (response) {
	    			//alert("getUserDetails" + response.get('FacebookAccessToken'));
	    			//console.log("get details ");
	    			//console.log(self);
	    			if (response.get('FacebookAccessToken') === "" || 
	    				response.get('FacebookAccessToken') === undefined ||
	    				response.get('FacebookAccessToken') === null)
	    			{
	    				self.errorMessage = "Ups, an error occured during extracting data for user";
	    			}
	    			this.FacebookAccessToken = response.get('FacebookAccessToken');
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