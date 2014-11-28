define(function(require) {

	var Backbone = require("backbone");

	var ContactModel = Backbone.Model.extend({
		
		constructorName: "ContactModel",
		
		defaults: {
		    ImageUrl: '',
		    Status: '',
		    UserName: ''
		},
		
		customSetContact : function(contactObject)
		{
			this.set({
				ImageUrl: contactObject.ImageUrl, 
				Status: contactObject.Status, 
				UserName: contactObject.UserName});
		}
	});

	return ContactModel;
});