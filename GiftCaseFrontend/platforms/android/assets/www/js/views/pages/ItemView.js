define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");

  var ItemView = Utils.Page.extend({

    constructorName: "ItemView",

    initialize: function(options) {
      console.log("Initialize now ");
      var options = options ? options : {};
      this.template = Utils.templates.itemInboxView;
      this.presenter = options.itemPresenter;
    },

    render: function() {
      var $newEl = $(this.presenter.render(this.template));

      if (this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) {
        this.setElement($newEl);
      }

      this.$el.html($newEl.html());

      return this;
    }
  });

  return ItemView;

});