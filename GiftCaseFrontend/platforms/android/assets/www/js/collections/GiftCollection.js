define(function(require) {

	var Backbone = require("backbone");
	var GiftModel = require("models/GiftModel");
	var $ = require("jquery");
	var _ = require("underscore");
	var URLHelper = require("helpers/URLHelper");

	var GiftCollection = Backbone.Collection.extend({
		model: GiftModel,
		constructorName: "GiftCollection",
		userId:"",
		type:"",
		errorMessage:"",
		start:"",
		end:"",

		url: function(){
			switch (this.type)
			{
				case "Outbox": 
					{
						console.log(URLHelper.sentGifts(this.userId, this.start, this.end));
						return URLHelper.sentGifts(this.userId, this.start, this.end); 
						break;
					}
				case "Inbox": 
					{
						console.log(URLHelper.receivedGifts(this.userId, this.start, this.end));
						return URLHelper.receivedGifts(this.userId, this.start, this.end); 
						break;
					}
			}
		},
		
		initialize: function () {
			var self = this;
	        this.on("invalid", function (model, error) {
	            self.errorMessage = "Ups, an error occured during loading the available categories";
	        });
        },

        setType: function(typePar){
			this.type = typePar; 
		},

		setUserId: function(userIdPar){
			this.userId = userIdPar; 
		},

		setListStart: function(startPar){
			this.start = startPar; 
		},

		setListEnd: function(endPar){
			this.end = endPar; 
		},

        parse: function(response){
          var giftsArray = new Array();
  		  
			var results = $.parseJSON(JSON.stringify(response));
			console.log("Response " + response + " " + this.url());
	     	for (var i = 0; i < results.length; i++) {
	     		var oneGift = new GiftModel();
	     		oneGift.customSetGift(results[i]);
	     		giftsArray[i] = oneGift;	
	     	}
	     	return giftsArray;
		},
	    
	    getGifts : function(){
	    	var self = this;
			return this.fetch({
	    		success: function () {
	    			self.triggerAppropriateEvent();
	    			console.log("Count gifts " + self.length + " " + self.url());
	        	},
	        	error: function (model, xhr, options) {
	        		self.errorMessage = "Ups, an error occured during loading gifts";
        			self.triggerAppropriateEvent();
        		}
    		});
		},

		triggerAppropriateEvent: function()
		{
			switch (this.type)
			{
				case "Outbox": this.trigger("showOutbox"); break;
				case "Inbox": this.trigger("showInbox"); break;
			}
		}
	});

	return GiftCollection;
});