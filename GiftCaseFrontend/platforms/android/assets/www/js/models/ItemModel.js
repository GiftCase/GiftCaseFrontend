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
		    Developer: '',
		    Icon: ''
		},
		
		customSetItem : function(appdata, itemObject)
		{
			var category = new CategoryModel();

			category.customSetCategory(itemObject.Category);

			var icon = this.getAppropriatePicture(appdata.getCategoryName(category));
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
				Developer: itemObject.Developer,
				TypeIcon: icon
			});
		},

		getAppropriatePicture : function(type)
		{ 
			if(type == "Video"){
				return "img/movieIcon.png";
			}
			else if(type == "Audio"){
				return "img/musicIcon.png";
			}
			else if(type == "Game"){
				return "img/gameIcon.png";
			}
			else
			{
				return "";
			}
		}
	});

	return ItemModel;
});