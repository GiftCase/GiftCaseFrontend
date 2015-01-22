define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var StorageHelper = require("helpers/StorageHelper");

  var TestView = Utils.Page.extend({

    constructorName: "TestView",

    initialize: function(){
      $("#saveTofile").on("touchend", this.saveTofile);
      $("#read").on("touchend", this.read);
    },

    saveTofile: function(){
      StorageHelper.saveTofile("FBID", "10204523203015435", function (success){
        if (success)
        {
          alert("Data saved success");
        }
        else
        {
          alert("Data saved not success");
        }
      });
    },

    read: function(){
      StorageHelper.read("FBID", function (success, data){
        if (success)
        {
          alert("Data read success " + data);
        }
        else
        {
          alert("Data read not success");
        }
      });
    }

  });

  return TestView;

});