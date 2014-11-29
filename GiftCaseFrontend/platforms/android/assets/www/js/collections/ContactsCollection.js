define(function(require) {

	var Backbone = require("backbone");
	var ContactModel = require("models/ContactModel");
	var $ = require("jquery");
	var _ = require("underscore");

	var ContactsCollection = Backbone.Collection.extend({
		model: ContactModel,
		constructorName: "ContactsCollection",
		urlRoot: "http://giftcase.azurewebsites.net/api/User/Contacts",
		userId:"",

		url: function(){
			return this.urlRoot + '?userId=' + this.userId;
		},

		setUserId: function(userIdPar){
			this.userId = userIdPar;
		},
		
		initialize: function () {
	        this.on("invalid", function (model, error) {
	            Console.log("Houston, we have a problem: " + error);
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
	    
	    getContacts : function(){
	    	var self = this;
			return this.fetch({
	    		success: function () {
	             	self.trigger("showContacts");
	        	},
	        	error: function (model, xhr, options) {
        			Console.log("Something went wrong while getting the contacts collection");
        		}
    		});
		}
	});

	return ContactsCollection;
});