define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  
  //--------------------------------------------------
  var StructureView = require("views/StructureView");
  var MyView = require("views/pages/MyView");
  var MapView = require("views/pages/MapView");
  var ContactsView = require("views/pages/ContactsView");
  var OneContactView = require("views/pages/OneContactView");

  //--------------------------------------------------
  var ContactsCollection = require("collections/ContactsCollection");

  //--------------------------------------------------
  var MyModel = require("models/MyModel");
  var ContactModel = require("models/ContactModel");

  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "myview": "myView",
      "map": "map",
      "contacts": "contacts",
      "onecontactview/:onecontact" : "onecontactview"
    },

    firstView: "myview",

    initialize: function(options) {
      this.currentView = undefined;
    },

    myView: function() {
     
      // highlight the nav1 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav1");
      // create a model with an arbitrary attribute for testing the template engine
      var model = new MyModel({
        key: "ghghgh"
      });
      // create the view
      var page = new MyView({
        model: model
      });
      // show the view
      this.changePage(page);
    },

    map: function() {
      // highlight the nav2 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav2");
      // create the view and show it
      var page = new MapView();
      this.changePage(page);
    },

    // load the structure view
    showStructure: function() {
      if (!this.structureView) {
        this.structureView = new StructureView();
        // put the el element of the structure view into the DOM
        document.body.appendChild(this.structureView.render().el);
        this.structureView.trigger("inTheDOM");
      }
      // go to first view
      this.navigate(this.firstView, {trigger: true});
    },

    contacts: function() {
       window.alert("We are here");
       /*this.structureView.setActiveTabBarElement("nav3");
      // create the view and show it
      var page = new ContactsView();
      this.changePage(page);
      // highlight the nav2 tab bar element as the current one
      ///this.structureView.setActiveTabBarElement("nav3");
      // create the view and show it
      //var page = new ContactsView();
      //this.changePage(page);*/
      var contactsCollection = new ContactsCollection({});
      contactsCollection.setUserId("ana");
      contactsCollection.getContacts();
      var contactsView = new ContactsView({});
      contactsView.customSetCollection(contactsCollection);
      this.changePage(contactsView);
    },

    onecontactview: function(onecontact) {
      //window.alert("One contact view called " + );
      //var oneContactJSON = $.parseJSON(onecontact);
      onecontact = onecontact.replace(/\\sl/g,"/");
      var result = $.parseJSON(onecontact);
      var oneContact = new ContactModel();
      oneContact.customSetContact(result);      
      var oneContactView = new OneContactView({
        model: oneContact
      });
      this.changePage(oneContactView);
    }
  });

  return AppRouter;

});