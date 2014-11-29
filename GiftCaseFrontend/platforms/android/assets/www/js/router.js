define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  
  //--------------------------------------------------
  var StructureView = require("views/StructureView");
  var MyView = require("views/pages/MyView");
  var MapView = require("views/pages/MapView");
  var ContactsView = require("views/pages/ContactsView");
  var OneContactView = require("views/pages/OneContactView");
  var LoginView = require("views/pages/LoginView");
  var EventsView = require("views/pages/EventsView");
  var OneEventView = require("views/pages/OneEventView");
  
  //--------------------------------------------------
  var MyModel = require("models/MyModel");

  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "loginview",
      "showstructure": "showStructure",
      "myview": "myView",
      "map": "map",
      "contacts": "contacts",
      "onecontactview/:onecontact" : "onecontactview",
      "eventsview" : "eventsview",
      "oneeventview/:oneevent" : "oneeventview"
    },

    initialize: function(options) {
      this.currentView = undefined;
    },

    /*myView: function() {
     
      // highlight the nav1 tab bar element as the current one
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
    },*/

    // load the structure view
    showStructure: function() {
      if (!this.structureView) {
        this.structureView = new StructureView();
        // put the el element of the structure view into the DOM
        document.body.appendChild(this.structureView.render().el);
        this.structureView.trigger("inTheDOM");
      }
      // go to first view
      //this.navigate(this.firstView, {trigger: true});
    },

    loginview: function() {
      var loginView = new LoginView({});
      document.body.appendChild(loginView.render().el);
    },

    contacts: function() {
      this.structureView.setActiveTabBarElement("nav1");
      var contactsView = new ContactsView({});
      this.changePage(contactsView);
    },

    onecontactview: function(onecontact) {
      var oneContactView = new OneContactView({});
      oneContactView.customInitialize(onecontact);
      this.changePage(oneContactView);
    },

    eventsview: function() {
      this.structureView.setActiveTabBarElement("nav2");
      var eventsView = new EventsView({});
      this.changePage(eventsView);
    },

    oneeventview: function(oneevent) {
      var oneEventView = new OneEventView({});
      oneEventView.customInitialize(oneevent);
      this.changePage(oneEventView);
    }
  });

  return AppRouter;

});