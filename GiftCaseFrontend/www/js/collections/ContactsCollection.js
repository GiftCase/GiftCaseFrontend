define(function(require) {

	var Backbone = require("backbone");
	var ContactModel = require("models/ContactModel");
	var $ = require("jquery");
	var _ = require("underscore");
	var URLHelper = require("helpers/URLHelper");

	var ContactsCollection = Backbone.Collection.extend({
		model: ContactModel,
		constructorName: "ContactsCollection",
		userId:"",
		errorMessage:"",

		url: function(){
			return URLHelper.contacts(this.userId);
		},

		setUserId: function(userIdPar){
			this.userId = userIdPar;
		},
		
		initialize: function () {
			var self = this;
	        this.on("invalid", function (model, error) {
	            self.errorMessage = "Ups, an error occured during loading contacts";
	        });
        },

        parse: function(response){
          var contactsArray = new Array();
  		  
			var results = $.parseJSON(JSON.stringify(response));
	     	for (var i = 0; i < results.length; i++) {
	     		var oneContact = new ContactModel();
	     		oneContact.customSetContact(results[i]);
	     		contactsArray[i] = oneContact;	
	     	}
	     	return contactsArray;
		},

		customInitialize: function(response){
			var results = $.parseJSON(JSON.stringify(response));
	     	for (var i = 0; i < results.length; i++) {
	     		var oneContact = new ContactModel();
	     		oneContact.customSetContact(results[i]);
	     		this.add(oneContact);
	     	}
		},

		customChangeCollection : function()
		{
			var oneContact = new ContactModel({
				ImageUrl: "mrun",
		    	Status: "mrun",
		    	UserName: "mrun"
			});
			this.add(oneContact);
			this.trigger("showContacts");
		},
	    
	    getContacts : function(){
	    	var self = this;
			return this.fetch({
	    		success: function () {
	        		self.trigger("showContacts");
	        	},
	        	error: function (model, xhr, options) {
	        		self.errorMessage = "Ups, an error occured during loading contacts";
	        		self.trigger("showContacts");
        		}
    		});
		}
	});

	return ContactsCollection;
});