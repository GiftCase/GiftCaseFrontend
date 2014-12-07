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
  var GiftBoxView = require("views/pages/GiftBoxView");
  var GiftCollectionView = require("views/pages/GiftCollectionView");
  
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
      "oneeventview/:oneevent" : "oneeventview",
      "categories" : "categories",
      "outbox" : "outbox",
      "inbox" : "inbox",
      "giftbox" : "giftbox"
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
        document.body.removeChild(document.getElementById("loginViewHTML"));
        document.body.appendChild(this.structureView.render().el);
        this.structureView.trigger("inTheDOM");
      }
      // go to first view
      //this.navigate(this.firstView, {trigger: true});
    },

    loginview: function() {
      if (!this.loginView) {
        this.loginView = new LoginView();
        document.body.appendChild(this.loginView.render().el);
      }
    },

    contacts: function() {
      this.structureView.setActiveTabBarElement("nav1");
      var contactsView = new ContactsView();
      this.changePage(contactsView);
    },

    onecontactview: function(onecontact) {
      var oneContactView = new OneContactView();
      oneContactView.customInitialize(onecontact);
      this.changePage(oneContactView);
    },

    eventsview: function() {
      this.structureView.setActiveTabBarElement("nav2");
      if (!this.eventsView)
      {
        this.eventsView = new EventsView();
      }
      this.changePage(this.eventsView);
    },

    oneeventview: function(oneevent) {
      var oneEventView = new OneEventView();
      oneEventView.customInitialize(oneevent);
      this.changePage(oneEventView);
    },

    categories: function(oneevent) {
      this.categories = new CategoriesCollection();
      this.categories.getCategories();
      this.listenTo(this.categories, "showCategories", this.showCategories);
    },

    showCategories: function(oneevent) {
      for(var i = 0; i < this.categories.length; i++)
      {
        console.log("Id " + this.categories.at(i).get('Id') + " Name " + 
          this.categories.at(i).get('Name') + " ParentCategory " + 
          this.categories.at(i).get('ParentCategory'));
      }
    },

    giftbox: function() {
      this.structureView.setActiveTabBarElement("nav3");
      if (!this.giftboxview)
      {
        this.giftboxview = new GiftBoxView();
      }
      this.changePage(this.giftboxview);
    },

    inbox: function() {
      this.giftboxview.setActiveTab("Inbox");
      console.log("Here");
      var inboxGiftsCollection = new GiftCollectionView(
        {
          CollectionType: "Inbox",
          UserId: encodeURIComponent("10204523203015435"),
          Start: 0,
          End: 3
        });

      
      this.giftboxview.setView(inboxGiftsCollection);
      this.changePage(this.giftboxview);
    },

    outbox: function() {
      this.giftboxview.setActiveTab("Outbox");
      var outboxGiftsCollection = new GiftCollectionView(
        {
          CollectionType: "Outbox",
          UserId: "10204523203015435",
          Start: 0,
          End: 3
        });
      
      this.giftboxview.setView(outboxGiftsCollection);
      this.changePage(this.giftboxview);
    }
  });

  return AppRouter;

});