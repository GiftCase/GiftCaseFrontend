define(function(require) {

	var Backbone = require("backbone");
	var ContactModel = require("models/ContactModel");
	var $ = require("jquery");
	var _ = require("underscore");
	var URLHelper = require("helpers/URLHelper");

	var ContactsCollection = Backbone.Collection.extend({
		model: ContactModel,
		constructorName: "ContactsCollection",
		errorMessage:"",
		url:"",
		newRequest: false,

		url: function(){
			return this.url;
		},
		
		initialize: function (options) {
			this.appdata = options.appdata;
			var self = this;
	        this.on("invalid", function (model, error) {
	            self.errorMessage = "Ups, an error occured during loading contacts";
	        });
        },

        parse: function(response){
        	var contactsArray;
        	if (this.newRequest)
        	{
        		contactsArray = new Array();
        	}
        	else
        	{
	        	if (this.models[0] === undefined || this.models[0].get('Id') === '')
				{
					// initial list
					contactsArray = new Array();
				}
	        	else
	        	{
	        		// keep results from previous fetch
	        		contactsArray = this.models;
	        	} 
        	}           
  		    var start = contactsArray.length;
			var results = $.parseJSON(JSON.stringify(response));
	     	for (var i = 0; i < results.length; i++) {
	     		var oneContact = new ContactModel({
	     			appdata: this.appdata
	     		});
	     		oneContact.customSetContact(results[i]);
	     		contactsArray[start + i] = oneContact;	
	     	}
	     	return contactsArray;
		},

		customInitialize: function(response){
			var results = $.parseJSON(JSON.stringify(response));
	     	for (var i = 0; i < results.length; i++) {
	     		var oneContact = new ContactModel({
	     			appdata: this.appdata
	     		});
	     		oneContact.customSetContact(results[i]);
	     		this.add(oneContact);
	     	}
		},

		customChangeCollection : function()
		{
			var oneContact = new ContactModel({
				appdata: this.appdata,
				ImageUrl: "mrun",
		    	Status: "mrun",
		    	UserName: "mrun"
			});
			this.add(oneContact);
			this.trigger("showContacts");
		},
	    
	    getContacts : function(){
	    	//console.log(this.appdata);
	    	this.url = URLHelper.giftCaseContacts(this.appdata.user.Id, this.appdata.countOfRecords);
	    	var self = this;
			this.fetch({
	    		success: function () {

					self.trigger("showContacts");
	    			self.url = URLHelper.notGiftCaseContacts(self.appdata.user.get('FacebookAccessToken'),  self.appdata.countOfRecords);

		    		self.fetch({
			    		success: function () {
			        		self.trigger("showContacts");
			        	},
			        	error: function (model, xhr, options) {
			        		self.errorMessage = "Ups, an error occured during loading contacts";
			        		self.trigger("showContacts");
		        		}
		    		});
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