define(function(require) {

  var Backbone = require("backbone");
  var ContactsCollection = require("collections/ContactsCollection");
  var ContactView = require("views/pages/ContactView");
  var Utils = require("utils");
  var _ = require("underscore");

  var ContactsView = Utils.Page.extend({

    constructorName: "ContactsView",

    //collection: ContactsCollection,

    initialize: function(options) {
      this.appdata = options.appdata;
      this.template = Utils.templates.contactsList;
      var templateHTML = $(this.template());
      this.collection = new ContactsCollection({
        appdata: this.appdata
      });
      this.listenTo(this.collection, "showContacts", this.render);
      this.collection.getContacts();
      //this.contacts.on("error", this.errorHandler, this);
    },

    /*errorHandler: function(){
      $('#error').append("The events could not be loaded.");
      document.getElementById("error").style.visibility="visible";
      document.getElementById("error").style.display="initial";
    },*/

    render: function() {

      console.log(this.template);
      var self = this;

      var $newEl = $(this.template());

      if (this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) {
        this.setElement($newEl);
      }

      this.$el.html($newEl.html());
      if (this.collection.errorMessage !== '')
      {
        this.$el.find('#errorContactsList').html(this.collection.errorMessage);
        this.$el.find('#errorContactsList').show();
      }
      else
      {
        this.collection.each(function(contact){
          var personView = new ContactView();
          personView.customSetModel(contact);
          self.$el.find('#contactsList').append(personView.render().el);
        }, this);
        this.$el.find('#errorContactsList').hide();
      }

      return this;
    }
  });

  return ContactsView;

});