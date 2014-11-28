define(function(require) {

  var Backbone = require("backbone");
  var ContactView = require("models/ContactModel");
  var Utils = require("utils");

  var OneContactView = Utils.Page.extend({

    constructorName: "ContactView",

    id: "onecontactview",
    className: "i-g page",

    events: {
          "touchend": "openContact"
    },

    customSetModel : function(contactPar)
    {
      this.model = contactPar;
    },

    initialize: function() {
      this.template = Utils.templates.oneContact;
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return OneContactView;

});