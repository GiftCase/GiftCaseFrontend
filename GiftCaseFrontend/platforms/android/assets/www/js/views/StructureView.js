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
      "touchend #closebutton": "close"
    },

    initialize: function(options) {
      // load the precompiled template
      this.template = Utils.templates.structure;
      this.appdata = options.appdata;
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
      }
      return this;
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
      this.removeWelcomeMessage();
      
      Backbone.history.navigate("eventsview", {
        trigger: true
      });
    },

    contacts: function(event) {
      
      this.removeWelcomeMessage();

      Backbone.history.navigate("contacts", {
        trigger: true
      });
    },

    giftbox: function(event) {
      
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
      }
    },

    close: function(){
      document.getElementById("content").click();
    }
  });

  return StructureView;

});