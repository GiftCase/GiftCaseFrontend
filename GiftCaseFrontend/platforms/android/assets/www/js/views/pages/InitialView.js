define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");

  var InitialView = Utils.Page.extend({

    constructorName: "InitialView",

    initialize: function(options) {
      this.template = Utils.templates.initialview;
    },

    render: function() {
      var $newEl = $(this.template());

      if (this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) {
        this.setElement($newEl);
      }

      this.$el.html($newEl.html());
      return this;
    }
  });

  return InitialView;

});