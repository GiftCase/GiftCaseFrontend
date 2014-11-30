define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");

  var EventContactView = Utils.Page.extend({

    constructorName: "EventContactView",

    templateToUse: '',

    customSetModel : function(contactPar)
    {
      this.model = contactPar;
    },

    initialize: function() {
        this.template = Utils.templates.eventRelatedContactView;
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return EventContactView;

});