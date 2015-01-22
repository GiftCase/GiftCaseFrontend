define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");

  var GiftBoxMenuView =
  {
    tabBarAdded : false,

    addGiftBoxMenu : function()
    {
      if (this.tabBarAdded !== true)
      {
        var main = document.getElementById("main");
        var content = document.getElementById("content");
        var div = document.createElement('div');
        div.innerHTML = Utils.templates.giftBoxMenu();
        var elements = div.childNodes;
        main.insertBefore(elements[0], content);

        $(document.getElementById("Inbox")).on("tap",function(){
          //alert("tap inbox");
          Backbone.history.navigate("inbox", {
            trigger: true
          });
        });
        $(document.getElementById("Outbox")).on("tap",function(){
          //alert("tap outbox");
          Backbone.history.navigate("outbox", {
            trigger: true
          });
        });
        
        this.tabBarAdded = true;
      }
    },

    removeGiftBoxMenu : function()
    {
      if (this.tabBarAdded === true)
      {
        var main = document.getElementById("main");
        var giftBoxMenu = document.getElementById("giftBoxMenu");
        main.removeChild(giftBoxMenu);
        this.tabBarAdded = false;
      }
    },

    setActiveGiftBoxBarElement : function(elementId) {
      $(document.getElementById("Inbox")).removeClass("active");
      $(document.getElementById("Оutbox")).removeClass("active");
      
      if (elementId !== null)
      {
        $(document.getElementById(elementId)).addClass("active");
      }
    }
  };

  return GiftBoxMenuView;
});