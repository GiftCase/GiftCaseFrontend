define(function(require) {

	var Backbone = require("backbone");
	var CategoryModel = require("models/CategoryModel");
	var $ = require("jquery");
	var _ = require("underscore");
	var URLHelper = require("helpers/URLHelper");

	var CategoriesCollection = Backbone.Collection.extend({
		model: CategoryModel,
		constructorName: "CategoriesCollection",
		errorMessage:"",

		url: function(){
			return URLHelper.categories();
		},
		
		initialize: function () {
			var self = this;
	        this.on("invalid", function (model, error) {
	            self.errorMessage = "Ups, an error occured during loading the available categories";
	        });
        },

        parse: function(response){
          var categoriesArray = new Array();
  		  
			var results = $.parseJSON(JSON.stringify(response));
	     	for (var i = 0; i < results.length; i++) {
	     		var oneCategory = new CategoryModel();
	     		oneCategory.customSetCategory(results[i]);
	     		categoriesArray[i] = oneCategory;	
	     	}
	     	return categoriesArray;
		},
	    
	    getCategories : function(){
	    	var self = this;
			return this.fetch({
	    		success: function () {
	        		self.trigger("showCategories");
	        	},
	        	error: function (model, xhr, options) {
	        		self.errorMessage = "Ups, an error occured during loading contacts";
	        		self.trigger("showContacts");
        		}
    		});
		}
	});

	return CategoriesCollection;
});