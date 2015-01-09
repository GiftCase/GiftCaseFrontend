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
  var InitialView = require("views/pages/InitialView");
  var BuyGiftView = require("views/pages/BuyGiftView");

  //--------------------------------------------------
  var FacebookHelper = require("helpers/FacebookHelper");
  var SpecialMenuHelper = require("helpers/SpecialMenuHelper");

  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "",
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
      "oneitemview/:oneitem/:targetContactId" : "oneitemview",
      "sendgiftview/:oneitem/:targetContactId" : "sendgiftview"
    },

    initialize: function(options) {
      this.currentView = undefined;
      this.appdata = options.appData;
      this.initialview();
      FacebookHelper.initialize(
        {
          appdata: this.appdata
        });
      FacebookHelper.checkUserLoggedInStatus(this.loggedInStatusHandler, this);
      this.appdata.user.DeviceId = window.device.uuid;
      //var pushNotification = window.plugins.pushNotification;
      //pushNotification.register(this.successHandler, this.errorHandler,{"senderID":"62557057858","ecb":"this.onNotificationGCM"});
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

    loggedInStatusHandler: function(result, self)
    {
      if (result === FacebookHelper.success)
      {
        self.listenTo(self.appdata.user, "userDataRead", self.showStructure);
        self.appdata.user.getUserDetails();
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

    initialview: function() {
      if (!this.initialView) {
        this.initialView = new InitialView();
        document.body.appendChild(this.initialView.render().el);
      }
    },

    loginview: function() {
      if (!this.loginView) {
        SpecialMenuHelper.removeSpecialMenus();
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
        SpecialMenuHelper.removeSpecialMenus();
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
      SpecialMenuHelper.removeSpecialMenus();
      this.structureView.setActiveTabBarElement("nav1");
      var contactsView = new ContactsView(
        {
          appdata: this.appdata
        });
      this.changePage(contactsView);
      GiftBoxMenuView.removeGiftBoxMenu();
    },

    onecontactview: function(onecontact) {
      SpecialMenuHelper.removeSpecialMenus();
      var oneContactView = new OneContactView({
        appdata: this.appdata
      });
      console.log(onecontact);
      oneContactView.customInitialize(onecontact);
      this.changePage(oneContactView);
      GiftBoxMenuView.removeGiftBoxMenu();
    },

    eventsview: function() {
      SpecialMenuHelper.removeSpecialMenus();
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
      SpecialMenuHelper.removeSpecialMenus();
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
      SpecialMenuHelper.removeSpecialMenus();
      this.structureView.setActiveTabBarElement("nav3");
      var giftboxview = new GiftBoxView();
      this.changePage(giftboxview);
      GiftBoxMenuView.addGiftBoxMenu();
      GiftBoxMenuView.setActiveGiftBoxBarElement(null);
    },

    inbox: function() {
      SpecialMenuHelper.removeSpecialMenus();
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
      SpecialMenuHelper.removeSpecialMenus();
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
      SpecialMenuHelper.removeSpecialMenus();
      var oneGiftView = new OneGiftView();
      oneGiftView.customInitialize(type, onegift, this.appdata);
      this.changePage(oneGiftView);
      GiftBoxMenuView.removeGiftBoxMenu();
    },

    suggestedPresents: function(targetContactId) {
      SpecialMenuHelper.removeSpecialMenus();
      var itemsView = new ItemsView({
        targetContactId: targetContactId,
        appdata: this.appdata});
      this.changePage(itemsView);
      GiftBoxMenuView.removeGiftBoxMenu();
    },

    oneitemview: function(oneitem, targetContactId) {
      SpecialMenuHelper.removeSpecialMenus();
      var oneItemView = new OneItemView();
      oneItemView.initializeJSON(oneitem, this.appdata, targetContactId);
      this.changePage(oneItemView);
      GiftBoxMenuView.removeGiftBoxMenu();
    },

    sendgiftview: function(oneitem, targetContactId){
      SpecialMenuHelper.removeSpecialMenus();
      var buyGiftView = new BuyGiftView();
      buyGiftView.customInitialize(this.appdata, oneitem, targetContactId);
      this.changePage(buyGiftView);
      GiftBoxMenuView.removeGiftBoxMenu();
    }

    /*successHandler: function(result) {
        alert('Callback Success! Result = '+result)
    },

    errorHandler:function(error) {
        alert(error);
    },

    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);
                    alert('registration id = '+e.regid);
                }
            break;
 
            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;
 
            case 'error':
              alert('GCM error = '+e.msg);
            break;
 
            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    }*/
  });

  return AppRouter;
});