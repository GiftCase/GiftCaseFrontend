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
  var TestView = require("views/pages/TestView");

  //--------------------------------------------------
  var FacebookHelper = require("helpers/FacebookHelper");
  var SpecialMenuHelper = require("helpers/SpecialMenuHelper");
  var PushNotificationHelper = require("helpers/PushNotificationHelper");
  var LoginHelper = require("helpers/LoginHelper");
  var StorageHelper = require("helpers/StorageHelper");

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
      alert("router initialize");
      var self = this;
      this.currentView = undefined;
      this.appdata = options.appData;
      this.initialview();

      $("#messages").html($("#messages").html() + " before facebook initialize");
      FacebookHelper.initialize(
      {
        appdata: this.appdata
      });

      /*PushNotificationHelper.init({
        appdata: this.appdata, 
        callback: this.pushNotificationsInitialized,
        messageCallback: this.pushNotificationMessageHandler, 
        caller: this
      });*/
      this.pushNotificationsInitialized("", this);
    },

    pushNotificationMessageHandler: function(type, message, messageCount, self){
      //alert(self.appdata);
      if (type === "error")
      {
        //alert("error in receiving message " + message);
      }
      else if (type === "success"){
        //alert(message + " " + messageCount);
      }
      else
      {
        //alert("undefined message type");
      }
    },

    pushNotificationsInitialized: function(data, self){
      //alert(self.appdata);
      //console.log(data);
        if (data !== null && data !== undefined && data !== "")
        {
          self.appdata.user.DeviceId = data;
          StorageHelper.saveTofile("GCMID", data, function (success){
          //StorageHelper.saveTofileDummy("GCMID", data, function (success){
              if (success)
              {
                //alert("GCMID saved success");
              }
              else
              {
                //alert("GCMID saved not success");
              }
          });
        }
        $("#messages").html($("#messages").html() + " self.appdata.user.DeviceId" + self.appdata.user.DeviceId);
        alert("push notifications initialized " + self.appdata.user.DeviceId);
        //self.appdata.user.DeviceId = "APA91bEPlFuyW8EyYmMRWFX7jCc7GBFuFO9Q9-TNnqFy__3xFvPAl9JSdaSrjR9MH1KpD1MDPjinJXrm0Wa4cNV5ep7WrbQDyL3izm8a6kNxFxAC6idVFU_skvHRPrrLTcKy24q7DoW8sR_FYclPfgv_En0RCHdh9Q";

        LoginHelper.openApplication(function(view, self){
          //alert("showing view " + view);
          if (view === "login")
          {
            self.loginview();
          }
          else
          {
            self.showStructure();
          }
        }, self, self.appdata);
    },

    initialview: function() {
      alert("show initial view");
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
      //console.log(onecontact);
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
        /*console.log("Id " + this.categories.at(i).get('Id') + " Name " + 
          this.categories.at(i).get('Name') + " ParentCategory " + 
          this.categories.at(i).get('ParentCategory'));*/
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
      //alert("show inbox");
      SpecialMenuHelper.removeSpecialMenus();
      GiftBoxMenuView.setActiveGiftBoxBarElement("Inbox");
      this.structureView.setActiveTabBarElement("nav3");
      var inboxGiftsCollection = new GiftCollectionView(
        {
          CollectionType: "Inbox",
          UserId: this.appdata.user.Id,
          Start: 0,
          End: this.appdata.countOfRecords,
          appdata: this.appdata
        });

      this.changePage(inboxGiftsCollection);
    },

    outbox: function() {
      //alert("show outbox");
      SpecialMenuHelper.removeSpecialMenus();
      GiftBoxMenuView.setActiveGiftBoxBarElement("Outbox");
      this.structureView.setActiveTabBarElement("nav3");
      var outboxGiftsCollection = new GiftCollectionView(
        {
          CollectionType: "Outbox",
          UserId: this.appdata.user.Id,
          Start: 0,
          End: this.appdata.countOfRecords,
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
  });

  return AppRouter;
});