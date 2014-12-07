define(function(require) {

	var Backbone = require("backbone");
	var ItemModel = require("models/ItemModel");
	var $ = require("jquery");
	var _ = require("underscore");
	var URLHelper = require("helpers/URLHelper");

	var ItemCollection = Backbone.Collection.extend({
		model: ItemModel,
		constructorName: "ItemCollection",
		targetContact:"",
		category:"",
		count:"",
		errorMessage:"",

		url: function(){
			console.log(URLHelper.suggestedGifts(this.targetContact, this.category, this.count));
			return URLHelper.suggestedGifts(this.targetContact, this.category, this.count); 
		},
		
		initialize: function () {
			var self = this;
	        this.on("invalid", function (model, error) {
	            self.errorMessage = "Ups, an error occured during loading gifts";
	        });
        },

		setTargetContact: function(targetContactPar){
			this.targetContact = targetContactPar; 
		},

		setCategory: function(categoryPar){
			this.category = categoryPar; 
		},

		setCount: function(countPar){
			this.count = countPar; 
		},

        parse: function(response){
          var itemsArray = new Array();
  		  
			var results = $.parseJSON(JSON.stringify(response));
			console.log("Items response" + results);
	     	for (var i = 0; i < results.length; i++) {
	     		var oneItem = new ItemModel();
	     		oneItem.customSetItem(results[i]);
	     		itemsArray[i] = oneItem;	
	     	}
	     	return itemsArray;
		},
	    
	    getItems : function(){
	    	var self = this;
			return this.fetch({
	    		success: function () {
	    			self.trigger("showItems"); 
	    			console.log("Count items " + self.length + " " + self.url());
	        	},
	        	error: function (model, xhr, options) {
	        		self.errorMessage = "Ups, an error occured during loading gifts";
        			self.trigger("showItems");
        		}
    		});
		}
	});

	return ItemCollection;
});