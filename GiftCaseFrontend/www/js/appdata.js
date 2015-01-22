define(function(require) {

  var Utils = require("utils");
  var CategoriesCollection = require("collections/CategoriesCollection");
  var UserModel = require("models/UserModel");

  var AppData = function()
  {
    this.user = new UserModel();
    this.categoriesInitialized = false;
    this.countOfRecords = 15;
    this.initializeCategories();
    this.invitationEmailText = "I propose you to use the GiftCase application. It is very nice!";
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

  AppData.prototype.getAllCategories= function()
  {
    if (this.categoriesInitialized === true)
    {
      var categoriesCollectionResult = new Array();
      this.categories.filter(function(category)
      {
        if (category.get('ParentCategory') === null)
        {
          categoriesCollectionResult.push(category);
        }
      });
      return categoriesCollectionResult;
    }
  };

  AppData.prototype.getAllSubcategories = function(searchedcategory)
  {
    var self = this;
    if (this.categoriesInitialized === true)
    {
      var categoriesCollectionResult = new Array();
      this.categories.filter(function(subcategory)
      {
        if (subcategory.get('ParentCategory') !== null && 
            subcategory.get('ParentCategory') !== undefined &&
            self.getCategoryNameById(subcategory.get('ParentCategory')) === searchedcategory)
        {
          categoriesCollectionResult.push(subcategory);
        }
      });
      return categoriesCollectionResult;
    }
  };

  AppData.prototype.getCategoryName = function(category)
  {
    if (this.categoriesInitialized === true)
    {
      if (category === "")
      {
        return "";
      }
      var categoryId = category.get('ParentCategory');
      if (categoryId === null || categoryId === undefined)
      {
        categoryId = category.get('Id');
      }
      return this.getCategoryNameById(categoryId);
    }
  };

  AppData.prototype.getCategoryIdByName = function(categoryName)
  {
    if (this.categoriesInitialized === true)
    {
      var searchedCategory= this.categories.find(function(category)
      {
        if (category.get('Name') === categoryName)
        {
          //console.log(category);
          return category;
        }
      });
      return searchedCategory.get('Id');
    }
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
      return searchedCategory.get('Name');
    }
  };

  return AppData;
});