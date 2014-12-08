define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var ContactModel = require("models/ContactModel");

  var OneContactView = Utils.Page.extend({

    constructorName: "ContactView",

    events: {
      "touchend #sendGiftButton": "sendGiftButton"
    },

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
      var $newEl = $(this.template(this.model.toJSON()));

      if (this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) {
        this.setElement($newEl);
      }

      this.$el.html($newEl.html());
      return this;
    },

    sendGiftButton: function(e) {
        Backbone.history.navigate(
          "suggestedPresents/" + this.model.get('Id'), 
          {trigger: true});
    }
  });

  return OneContactView;

});