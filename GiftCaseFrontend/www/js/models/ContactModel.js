define(function(require) {

	var Backbone = require("backbone");

	var ContactModel = Backbone.Model.extend({
		
		constructorName: "ContactModel",
		
		defaults: {
		    ImageUrl: '',
		    UserStatus: '',
		    UserName: '',
		    Name: '',
		    Gender: '',
		    Id: ''
		},
		
		customSetContact : function(contactObject)
		{
			this.set({
				ImageUrl: contactObject.ImageUrl, 
				UserStatus: contactObject.Status, 
				UserName: contactObject.UserName,
				Name: contactObject.Name,
				Gender: contactObject.Gender,
				Id : contactObject.Id});
		}
	});

	return ContactModel;
});