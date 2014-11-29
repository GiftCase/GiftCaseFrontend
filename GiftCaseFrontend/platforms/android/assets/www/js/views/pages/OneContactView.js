define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var ContactModel = require("models/ContactModel");

  var OneContactView = Utils.Page.extend({

    constructorName: "ContactView",

    id: "onecontactview",
    className: "i-g page",

    initialize: function() {
      this.template = Utils.templates.oneContact;
    },

    customInitialize: function(onecontact){
      onecontact = onecontact.replace(/\\sl/g,"/");
      var result = $.parseJSON(onecontact);
      this.model = new ContactModel();
      this.model.customSetContact(result);
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return OneContactView;

});