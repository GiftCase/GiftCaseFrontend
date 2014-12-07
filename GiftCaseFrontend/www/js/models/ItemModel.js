define(function(require) {

	var Backbone = require("backbone");
	var CategoryModel = require("models/CategoryModel");

	var ItemModel = Backbone.Model.extend({
		
		constructorName: "ItemModel",
		
		defaults: {
		    Category: '',
		    Description: '',
		    IconUrl: '',
		    Id: '',
		    LinkToTheStore: '',
		    Name: '',
		    PreviousPrice: '',
		    Price: '',
		    PriceCurrency: '',
		    Store: '',
		    Author: '',
		    Director: '',
		    Platform: '',
		    Artist: '',
		    Developer: ''
		},
		
		customSetItem : function(itemObject)
		{
			console.log("Setting item");
			var category = new CategoryModel();
			category.customSetCategory(itemObject.Category);
			this.set({
				Category: category, 
				Description: itemObject.Description,
				IconUrl: itemObject.IconUrl,
				Id: itemObject.Id,
				LinkToTheStore: itemObject.LinkToTheStore,
				Name: itemObject.Name,
				PreviousPrice: itemObject.PreviousPrice,
				Price: itemObject.Price,
				PriceCurrency: itemObject.PriceCurrency,
				Store: itemObject.Store,
				Author: itemObject.Author,
				Director: itemObject.Director,
				Platform: itemObject.Platform,
				Artist: itemObject.Artist,
				Developer: itemObject.Developer
			});
			console.log("Item set");
		}
	});

	return ItemModel;
});