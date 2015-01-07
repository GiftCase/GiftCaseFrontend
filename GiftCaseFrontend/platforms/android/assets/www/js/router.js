define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var Utils = require("utils");
  
  //--------------------------------------------------
  var StructureView = require("views/StructureView");
  var ContactsView = require("views/pages/ContactsView");
  var OneContactView = require("views/pages/OneContactView");
  var LoginView = require("views/pages/LoginView");
  var EventsView = require("views/pages/EventsView");
  var OneEventView = require("views/pages/OneEventView");
  var GiftBoxView = require("views/pages/GiftBoxView");
  var GiftBoxMenuView = require("views/pages/GiftBoxMenuView");
  var GiftCollectionView = require("views/pages/GiftCollectionView");
  var OneGiftView = require("views/pages/OneGiftView");
  var ItemsView = require("views/pages/ItemsView");
  var OneItemView = require("views/pages/OneItemView");

  //--------------------------------------------------
  var FacebookHelper = require("helpers/FacebookHelper");

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
      "giftbox" : "giftbox",
      "onegiftview/:onegift/:type" : "onegiftview",
      "suggestedPresents/:targetContact" : "suggestedPresents",
      "oneitemview/:oneitem" : "oneitemview"
    },

    initialize: function(options) {
      this.currentView = undefined;
      this.appdata = options.appData;
      this.init();
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

    init: function() {
      console.log("Passing through init in router");
      FacebookHelper.initialize(
        {
          appdata: this.appdata
        });
      FacebookHelper.checkUserLoggedInStatus(this.loggedInStatusHandler, this);
      this.appdata.user.DeviceId = window.device.uuid;
    },

    loggedInStatusHandler: function(result, self)
    {
      if (result === FacebookHelper.success)
      {
        self.showStructure();
      }
      else
      {
        self.loginview();
        if (result === FacebookHelper.permissions)
        {
          self.loginView.showPermissionsError();
        }
      }
    },

    loginview: function() {
      if (!this.loginView) {
        this.loginView = new LoginView(
          {
            appdata: this.appdata
          });
        document.body.appendChild(this.loginView.render().el);
        GiftBoxMenuView.removeGiftBoxMenu();
      }
    },

    showStructure: function() {
      if (!this.structureView) {
        this.structureView = new StructureView(
          {
            appdata: this.appdata
          });
        // put the el element of the structure view into the DOM
        if (document.getElementById("loginViewHTML") !== null)
        {
          document.body.removeChild(document.getElementById("loginViewHTML"));
        }
        document.body.appendChild(this.structureView.render().el);
        this.structureView.trigger("inTheDOM");
        GiftBoxMenuView.removeGiftBoxMenu();
      }
      // go to first view
      //this.navigate(this.firstView, {trigger: true});
    },

    contacts: function() {
      this.structureView.setActiveTabBarElement("nav1");
      var contactsView = new ContactsView(
        {
          appdata: this.appdata
        });
      this.changePage(contactsView);
      GiftBoxMenuView.removeGiftBoxMenu();
    },

    onecontactview: function(onecontact) {
      var oneContactView = new OneContactView({
        appdata: this.appdata
      });
      console.log(onecontact);
      oneContactView.customInitialize(onecontact);
      this.changePage(oneContactView);
      GiftBoxMenuView.removeGiftBoxMenu();
    },

    eventsview: function() {
      this.structureView.setActiveTabBarElement("nav2");
      if (!this.eventsView)
      {
        this.eventsView = new EventsView({
          appdata: this.appdata
        });
      }
      this.changePage(this.eventsView);
      GiftBoxMenuView.removeGiftBoxMenu();
    },

    oneeventview: function(oneevent) {
      var oneEventView = new OneEventView({
        appdata: this.appdata
      });
      oneEventView.customInitialize(oneevent);
      this.changePage(oneEventView);
      GiftBoxMenuView.removeGiftBoxMenu();
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
      var giftboxview = new GiftBoxView();
      this.changePage(giftboxview);
      GiftBoxMenuView.addGiftBoxMenu();
      GiftBoxMenuView.setActiveGiftBoxBarElement(null);
    },

    inbox: function() {
      GiftBoxMenuView.setActiveGiftBoxBarElement("Inbox");
      this.structureView.setActiveTabBarElement("nav3");
      var inboxGiftsCollection = new GiftCollectionView(
        {
          CollectionType: "Inbox",
          UserId: this.appdata.user.Id,
          Start: 0,
          End: 3,
          appdata: this.appdata
        });

      this.changePage(inboxGiftsCollection);
    },

    outbox: function() {
      GiftBoxMenuView.setActiveGiftBoxBarElement("Outbox");
      this.structureView.setActiveTabBarElement("nav3");
      var outboxGiftsCollection = new GiftCollectionView(
        {
          CollectionType: "Outbox",
          UserId: this.appdata.user.Id,
          Start: 0,
          End: 3,
          appdata: this.appdata
        });
      
      this.changePage(outboxGiftsCollection);
    },

    onegiftview: function(onegift, type) {
      console.log("Open gift");
      var oneGiftView = new OneGiftView();
      oneGiftView.customInitialize(type, onegift, this.appdata);
      this.changePage(oneGiftView);
      GiftBoxMenuView.removeGiftBoxMenu();
    },

    suggestedPresents: function(targetContactId) {
      var itemsView = new ItemsView({
        targetContactId: targetContactId,
        appdata: this.appdata});
      this.changePage(itemsView);
      GiftBoxMenuView.removeGiftBoxMenu();
    },

    oneitemview: function(oneitem) {
      var oneItemView = new OneItemView();
      oneItemView.initializeJSON(oneitem, this.appdata);
      this.changePage(oneItemView);
      GiftBoxMenuView.removeGiftBoxMenu();
    }
  });

  return AppRouter;
});