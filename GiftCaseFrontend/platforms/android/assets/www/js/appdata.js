define(function(require) {

  var Utils = require("utils");
  var CategoriesCollection = require("collections/CategoriesCollection");

  var AppData = function()
  {
    this.categoriesInitialized = false;
    this.initializeCategories();
  };

  AppData.prototype.initializeCategories = function()
  {
      this.categories = new CategoriesCollection();
      this.categories.getCategories();
      this.categories.on("showCategories", this.onCategoriesInitialized(), this);
  };

  AppData.prototype.onCategoriesInitialized = function()
  {
    this.categoriesInitialized = true;
  };

  AppData.prototype.getCategoryName = function(category)
  {
    var categoryId = category.get('ParentCategory');
    if (categoryId === null || categoryId === undefined)
    {
      categoryId = category.get('Id');
    }
    return this.getCategoryNameById(categoryId);
  };

  AppData.prototype.getCategoryNameById = function(categoryId)
  {
    if (this.categoriesInitialized === true)
    {
      var searchedCategory = this.categories.find(function(category)
      {
        if (category.get('Id') === categoryId)
        {
          return category;
        }
      });
    }
    return searchedCategory.get('Name'); 
  };

  return AppData;
});