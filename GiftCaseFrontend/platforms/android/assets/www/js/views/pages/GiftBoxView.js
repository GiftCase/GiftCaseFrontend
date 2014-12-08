define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var GiftBoxView = Backbone.View.extend({

    constructorName: "GiftBoxView",

    events: {
      "touchend #Outbox": "outbox",
      "touchend #Inbox": "inbox"
    },

    initialize: function() {
      this.template = Utils.templates.giftBoxView;
      this.view = null;
      this.activeTab = null;
    },

    setView : function(viewPar)
    {
      this.view = viewPar;
    },

    setActiveTab : function(activeTab)
    {
      this.activeTab = activeTab;
      this.setActiveTabBarElement(activeTab); 
    },

    render: function() {
      var $newEl = $(this.template());

      if (this.$el === null ||
          this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) {
        this.setElement($newEl);
      }

      this.$el.html($newEl.html());
      this.setActiveTabBarElement(this.activeTab);

      if (this.view !== null)
      {
        this.$el.find("#giftBoxHolder").html(this.view.render().el);
      }

      return this;
    },

    setActiveTabBarElement: function(elementId) {
      var elementSelector = "#"+elementId;
      if (elementId !== null)
      {
        this.$el.find(".active").removeClass("active");
        
        this.$el.find(elementSelector).addClass("active");
      }
      else
      {
        if (this.$el.find(".active") !== null)
        {
          this.$el.find(".active").removeClass("active");
        }
      }
    },

    outbox: function(event) {
      Backbone.history.navigate("outbox", {
        trigger: true
      });
    },

    inbox: function(event) {
      Backbone.history.navigate("inbox", {
        trigger: true
      });
    }
  });

  return GiftBoxView;

});