define(function(require) {

  var Backbone = require("backbone");
  var ContactsCollection = require("collections/ContactsCollection");
  var ContactView = require("views/pages/ContactView");
  var Utils = require("utils");
  var _ = require("underscore");

  var ContactsView = Utils.Page.extend({

    constructorName: "ContactsView",

    id: "contactsview",

    tagName: 'ul',

    //collection: ContactsCollection,

    initialize: function() {
      this.template = Utils.templates.contactsList;
      this.collection = new ContactsCollection({});
      this.collection.on("showContacts", this.showContacts, this );
      this.collection.setUserId("ana");
      this.collection.getContacts();
      //this.contacts.on("error", this.errorHandler, this);
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
          $(self.el).find('#contactsList').append(personView.render().el);
        }, this
      );
    },

    render: function() {
      $(this.el).html(this.template); 
      return this;
    }

  });

  return ContactsView;

});