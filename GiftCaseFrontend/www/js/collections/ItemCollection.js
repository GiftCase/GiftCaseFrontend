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
			return URLHelper.suggestedGifts(this.targetContactId, this.category, this.count); 
		},
		
		initialize: function () {
			var self = this;
	        this.on("invalid", function (model, error) {
	            self.errorMessage = "Ups, an error occured during loading gifts";
	        });
        },

		setTargetContactId: function(targetContactPar){
			console.log("Setting target contact id " + targetContactPar);
			this.targetContactId = targetContactPar; 
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
	        	},
	        	error: function (model, xhr, options) {
	        		self.errorMessage = "Ups, an error occured during loading gifts";
        			self.trigger("showItems");
        		}
    		});
		},

		getMenu: function(){
			
		}
	});

	return ItemCollection;
});