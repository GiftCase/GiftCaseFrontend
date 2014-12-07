define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");

  var EventContactView = Utils.Page.extend({

    constructorName: "EventContactView",

    customSetModel : function(contactPar)
    {
      this.model = contactPar;
    },

    initialize: function() {
        this.template = Utils.templates.eventRelatedContactView;
    },

    render: function() {
      var $newEl = $(this.template(this.model.toJSON()));

      if (this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) {
        this.setElement($newEl);
      }

      this.$el.html($newEl.html());
      return this;
    }
  });

  return EventContactView;

});