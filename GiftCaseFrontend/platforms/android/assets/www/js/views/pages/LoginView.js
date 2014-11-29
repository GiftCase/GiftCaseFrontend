define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");

  var LoginView = Utils.Page.extend({

    constructorName: "LoginView",

    id: "loginview",
    className: "i-g page",
    events: {
      "touchend #facebookLoginButton": "facebookLogin"
    },

    //collection: ContactsCollection,

    initialize: function() {
      this.template = Utils.templates.loginview;
      //this.contacts.on("error", this.errorHandler, this);
    },

    render: function() {
      $(this.el).html(this.template); 
      return this;
    },

    facebookLogin: function(e) {
      Backbone.history.navigate("showstructure", {
        trigger: true
      });
    }

  });

  return LoginView;

});