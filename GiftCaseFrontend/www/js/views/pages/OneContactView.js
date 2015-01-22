define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var ContactModel = require("models/ContactModel");
  var ContactPresenter = require("presenters/ContactPresenter");

  var OneContactView = Utils.Page.extend({

    constructorName: "ContactView",

    events: {
      "touchend #sendGiftButton": "sendGiftButton",
      "touchend #sendInvitationButton": "sendInviteButton"
    },

    initialize: function(options) {
      this.template = Utils.templates.oneContact;
      this.appdata = options.appdata;
    },

    customInitialize: function(onecontact){
      onecontact = onecontact.replace(/\\sl/g,"/").replace(/\\questionmark/g,"?");
      var result = $.parseJSON(onecontact);
      this.model = new ContactModel({
        appdata: this.appdata
      });
      this.model.customSetContact(result);
    },

    render: function() {
      var presenter =  new ContactPresenter(this.model);
      var $newEl = $(this.template(presenter.BuildJSON(this.model.toJSON())));

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
    },

    sendInviteButton: function(e) {
      this.model.sendInvitation(this.handleInvitationResponse, this);
    },

    handleInvitationResponse: function(self)
    {
      if (self.model.errorMessage !== '' && self.model.errorMessage !== undefined)
      {
        //console.log(self.model.errorMessage);
        document.getElementById("invitationResult").appendChild(document.createTextNode(self.model.errorMessage));
      }
      else
      {
        //console.log("Invitation sent");
        document.getElementById("invitationResult").appendChild(document.createTextNode("Invitation sent"));
      }
    }
  });

  return OneContactView;

});