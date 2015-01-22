define(function(require) {

	var Utils = require("utils");
	var $ = require("jquery");

	var SpecialMenuHelper = {

		addSpecialMenusItemCollection: function(selfPar){

	      var caller = selfPar;
	      var self = this;

	      //setup specialized menu
	      $("#specializedMenu").append(Utils.templates.menuItems());

	      //setup categories dropdown
	      var categories = caller.appdata.getAllCategories();
	      //console.log(categories[0].get('Name'));
	      $("#inputItemCategory").val(categories[0].get('Name'));
	      for (var i = 0; i < categories.length; i++)
	      {
	        $("#menuItemCategory").append(Utils.templates.menuItemsOneCategory(categories[i].toJSON()));
	      }
	      $("#menuItemCategory").append(Utils.templates.menuItemsOneCategory({"Name":"All"}));
	      this.changeAllowedSubcategories(caller);

	      //setup touch handlers
	      $('#menuItemCategory a').bind("touchend", function(e){
	        document.getElementById("inputItemCategory").value = e.target.id;
	        self.changeAllowedSubcategories(caller);
	      });
	      $('#menuItemSubcategory').on("touchend", "a", function(e){
	        document.getElementById("inputItemSubcategory").value = e.target.id;
	      });
	      $('#sortDescendingOrder').bind("touchend", caller, this.sortDescendingOrder);
	      $('#sortAscendingOrder').bind("touchend", caller, this.sortAscendingOrder);
	      $('#applyFilterButton').bind("touchend", caller, this.applyFilterButton);

	      //setup price slider
	      $("#slider-range").slider({
	        range: true,
	        min: 0,
	        max: 500,
	        values: [ 75, 300 ],
	        slide: function( event, ui ) {
	          $("#amountMax").val(ui.values[ 1 ]);
	          $("#amountMin").val(ui.values[ 0 ]);
	        }
	      });

	      $("#amountMin").val($("#slider-range").slider("values", 0));
	      $("#amountMax").val($("#slider-range").slider("values", 1));
	    },

	    removeSpecialMenus: function()
	    {
	    	$("#specializedMenu").empty();
	    },

	    changeAllowedSubcategories: function(caller)
	    {
	      if (document.getElementById("inputItemSubcategory") != null)
	      {
	        document.getElementById("inputItemSubcategory").value = "";
	      }
	      var subcategories = caller.appdata.getAllSubcategories($('#inputItemCategory').val());
	      $("#menuItemSubcategory").empty();
	      for (var i = 0; i < subcategories.length; i++)
	      {
	        $("#menuItemSubcategory").append(Utils.templates.menuItemsOneCategory(subcategories[i].toJSON()));
	      }
	    },

	    sortDescendingOrder: function(e)
	    {
	      if (e.data.collection.sortorder === "asc")
	      {
	        e.data.collection.sort("desc");
	        e.data.render();
	      }
	    },

	    sortAscendingOrder: function(e)
	    {
	      if (e.data.collection.sortorder !== "asc")
	      {
	        e.data.collection.sort("asc");
	        e.data.render();
	      }
	    },

	    applyFilterButton: function(e)
	    {
	      var subcategory = $('#inputItemSubcategory').val();
	      var category = $('#inputItemCategory').val();
	      var minPrice = $("#amountMin").val();
	      var maxPrice = $("#amountMax").val();
	      if (subcategory !== null && subcategory !== undefined && subcategory !== "")
	      {
	        e.data.collection.setSubCategoryId(e.data.appdata.getCategoryIdByName(subcategory));
	      }
	      if (category !== null && category !== undefined  && category !== "")
	      {
	        if (category === "All"){
	          e.data.collection.setCategoryId("");
	        }else{
	          e.data.collection.setCategoryId(e.data.appdata.getCategoryIdByName(category));
	        }
	      }
	      if (minPrice !== null && minPrice !== undefined)
	      {
	        e.data.collection.setMinPrice(minPrice);
	      }
	      if (maxPrice !== null && maxPrice !== undefined)
	      {
	        e.data.collection.setMaxPrice(maxPrice);
	      }
	      e.data.collection.getItems();
	    }
  	};

	return SpecialMenuHelper;
});