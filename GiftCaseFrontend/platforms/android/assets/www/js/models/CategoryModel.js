define(function(require) {

	var Backbone = require("backbone");

	var CategoryModel = Backbone.Model.extend({
		
		constructorName: "CategoryModel",
		
		defaults: {
		    Id: '',
		    Name: '',
		    ParentCategory: ''
		},
		
		customSetCategory : function(categoryObject)
		{
			this.set({
				Id: categoryObject.Id,
				Name: categoryObject.Name, 
				ParentCategory: categoryObject.ParentCategory});
		}
	});

	return CategoryModel;
});