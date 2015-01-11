define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var FacebookHelper = require("helpers/FacebookHelper");
  var ItemsView = require("views/pages/ItemsView");

  var StructureView = Backbone.View.extend({

    constructorName: "StructureView",

    id: "main",

    events: {
      "touchend #nav1": "contacts",
      "touchend #nav2": "eventsview",
      "touchend #nav3": "giftbox",
      "touchend #logoutbutton": "logout",
      "touchend #closebutton": "close",
      "touchend #nav4": "settings"
    },

    initialize: function(options) {
      // load the precompiled template
      this.template = Utils.templates.structure;
      this.appdata = options.appdata;
      this.welcomeMessageShown = true;
      //this.on("inTheDOM", this.rendered);
      // bind the back event to the goBack function
      //document.getElementById("back").addEventListener("back", this.goBack(), false);
    },

    logout: function (argument) {
      FacebookHelper.logout(this.facebookLogoutHandler, this);
    },

    facebookLogoutHandler: function(self)
    {
      self.appdata.user.logout(function()
        {
          if (self.appdata.user.errorMessage === "")
          {
            navigator.app.exitApp();
          }
          else
          {
            console.log(self.appdata.user.errorMessage);
          }
        });
    },

    render: function() {
      // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];

      if(this.welcomeMessageShown){
        this.addHelloMessage();
      }
      
      return this;
    },

    addHelloMessage: function(){
      if (this.appdata.user.get('Gender') !== undefined)
      {
        var gender;
        if (this.appdata.user.get('Gender')  === "Male")
        {
          gender = "Mr.";
        }
        else
        {
          gender = "Mrs.";
        }
        this.$el.find('#welcomemessage').html("Welcome, " + gender + " " + this.appdata.user.get('Name'));
        this.welcomeMessageShown = true;
      }
    },

    // rendered: function(e) {
    // },

    // generic go-back function
    goBack: function() {
      //window.history.back();
    },

    setActiveTabBarElement: function(elementId) {
      // here we assume that at any time at least one tab bar element is active
      if (document.getElementsByClassName("active")[0] != undefined)
      {
        document.getElementsByClassName("active")[0].classList.remove("active");
      }
      document.getElementById(elementId).classList.add("active");
    },

    eventsview: function(event) {

      $("#settingIcon").attr("src", "img/settingsIconInactive.png");
      $("#giftBoxIcon").attr("src", "img/giftBoxIconInactive.png");
      $("#eventsIcon").attr("src", "img/eventsIconActive.png");
      $("#contactsIcon").attr("src", "img/contactsIconInactive.png");
      this.removeWelcomeMessage();
      Backbone.history.navigate("eventsview", {
        trigger: true
      });
    },

    contacts: function(event) {
      console.log($("#contactsIcon"));
      $("#settingIcon").attr("src", "img/settingsIconInactive.png");
      $("#giftBoxIcon").attr("src", "img/giftBoxIconInactive.png");
      $("#eventsIcon").attr("src", "img/eventsIconInactive.png");
      $("#contactsIcon").attr("src", "img/contactsIconActive.png");
      this.removeWelcomeMessage();
      Backbone.history.navigate("contacts", {
        trigger: true
      });
    },

    giftbox: function(event) {

      $("#settingIcon").attr("src", "img/settingsIconInactive.png");
      $("#giftBoxIcon").attr("src", "img/giftBoxIconActive.png");
      $("#eventsIcon").attr("src", "img/eventsIconInactive.png");
      $("#contactsIcon").attr("src", "img/contactsIconInactive.png");
      this.removeWelcomeMessage();
      Backbone.history.navigate("giftbox", {
        trigger: true
      });
    },

    removeWelcomeMessage: function(){
      var welcomemessage = document.getElementById("welcomemessage");
      if (welcomemessage !== null)
      {
        var content = document.getElementById("content");
        content.removeChild(welcomemessage);
        this.welcomeMessageShown = false;
      }
    },

    close: function(){
      document.getElementById("content").click();
      $("#settingIcon").attr("src", "img/settingsIconInactive.png");
    },

    settings: function(){
      $("#settingIcon").attr("src", "img/settingsIconActive.png");
      $("#giftBoxIcon").attr("src", "img/giftBoxIconInactive.png");
      $("#eventsIcon").attr("src", "img/eventsIconInactive.png");
      $("#contactsIcon").attr("src", "img/contactsIconInactive.png");
    }
  });

  return StructureView;

});