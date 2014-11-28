define(function(require) {

  var Backbone = require("backbone");
  var ContactsCollection = require("collections/ContactsCollection");
  var ContactView = require("views/pages/ContactView");
  var Utils = require("utils");

  var ContactsView = Utils.Page.extend({

    constructorName: "ContactsView",

    id: "contactsview",
    className: "i-g page",
    events: {
      "touchend #goToContact": "goToContact"
    },

    //collection: ContactsCollection,

    initialize: function() {
      this.template = Utils.templates.contactsList;
      //this.contacts.on("error", this.errorHandler, this);
    },

    customSetCollection : function(collectionPar)
    {
      this.collection = collectionPar;
      this.collection.on("showContacts", this.showContacts, this );
    },

    /*errorHandler: function(){
      $('#error').append("The events could not be loaded.");
      document.getElementById("error").style.visibility="visible";
      document.getElementById("error").style.display="initial";
    },*/
  
    showContacts: function(){
      var self = this;
      this.collection.each(function(contact){
          var personView = new ContactView();
          personView.customSetModel(contact);
          $(self.el).append(personView.render().el);
        }, this
      );
    },

    render: function() {
      $(this.el).html(this.template); 
      return this;
    },

    goToContact: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }

  });

  return ContactsView;

});