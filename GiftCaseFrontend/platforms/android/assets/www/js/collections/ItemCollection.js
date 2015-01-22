define(function(require) {

	var Backbone = require("backbone");
	var ItemModel = require("models/ItemModel");
	var $ = require("jquery");
	var _ = require("underscore");
	var URLHelper = require("helpers/URLHelper");
	var SortHelper = require("helpers/SortHelper");

	var ItemCollection = Backbone.Collection.extend({
		model: ItemModel,
		constructorName: "ItemCollection",
		targetContact:"",
		category:"",
		count: 10,
		errorMessage:"",
		sortorder: "asc",
		sortproperty: "Name",

		url: function(){
			return URLHelper.suggestedGifts(
				this.targetContactId,
				this.category,
				this.subcategory, 
				this.minPrice,
				this.maxPrice,
				this.count); 
		},
		
		initialize: function (options) {
			var self = this;
			this.appdata = options.appdata;
			this.count = this.appdata.countOfRecords;
	        this.on("invalid", function (model, error) {
	            self.errorMessage = "Ups, an error occured during loading gifts";
	        });
        },

		setTargetContactId: function(targetContactPar){
			this.targetContactId = targetContactPar; 
		},

		setCategoryId: function(categoryPar){
			this.category = categoryPar; 
		},

		setSubCategoryId: function(subCategoryPar){
			this.subcategory = subCategoryPar; 
		},

		setMinPrice: function(subMinPricePar){
			this.minPrice = subMinPricePar; 
		},

		setMaxPrice: function(subMaxPricePar){
			this.maxPrice = subMaxPricePar; 
		},

		setCount: function(countPar){
			this.count = countPar; 
		},

        parse: function(response){
          var itemsArray = new Array();
  		  
			var results = $.parseJSON(JSON.stringify(response));
	     	for (var i = 0; i < results.length; i++) {
	     		var oneItem = new ItemModel();
	     		oneItem.customSetItem(this.appdata, results[i]);
	     		itemsArray[i] = oneItem;	
	     	}
	     	return itemsArray;
		},
	    
	    getItems : function(){
	    	var self = this;
			return this.fetch({
	    		success: function () {
	    			self.sort(self.sortorder);
	    			self.trigger("showItems"); 
	        	},
	        	error: function (model, xhr, options) {
	        		self.errorMessage = "Ups, an error occured during loading gifts";
        			self.trigger("showItems");
        		}
    		});
		},

		sort: function(order)
		{
			this.sortorder = order;
			this.models.sort(SortHelper.compare(this.sortproperty, this.sortorder));
		}
	});

	return ItemCollection;
});