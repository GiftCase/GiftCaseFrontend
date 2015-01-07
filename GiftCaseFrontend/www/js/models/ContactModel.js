define(function(require) {

	var Backbone = require("backbone");
	var URLHelper = require("helpers/URLHelper");

	var ContactModel = Backbone.Model.extend({
		
		constructorName: "ContactModel",
		
		defaults: {
		    ImageUrl: '',
		    Status: '',
		    UserName: '',
		    Name: '',
		    Gender: '',
		    Id: '',
		    Email:'bla@bla.vom'
		},

		initialize: function (options) {
			this.appdata = options.appdata;
        },
		
		customSetContact : function(contactObject)
		{
			this.set({
				ImageUrl: contactObject.ImageUrl, 
				Status: contactObject.Status, 
				UserName: contactObject.UserName,
				Name: contactObject.Name,
				Gender: contactObject.Gender,
				Id : contactObject.Id});
		},

		sendInvitation: function(callfunction, caller)
		{
			var self = this;
		    $.get(URLHelper.sendContactInvitation(this.appdata.user.Id, this.Email, this.UserName, this.appdata.invitationEmailText), 
		    	function(data) {
		    		if (data === false)
		    		{
		    			self.errorMessage = "Ups, an error occured during sending invitation to user";
		    		}
			        callfunction(caller);
			    }, 'json').error(
			    	function() {
				    self.errorMessage = "Ups, an error occured during sending invitation to user";
				    callfunction(caller);
			});
		}
	});

	return ContactModel;
});