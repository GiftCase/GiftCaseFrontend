define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");

  var LoginView = Utils.Page.extend({

    constructorName: "LoginView",

    events: {
      "touchend #facebookLoginButton": "facebookLogin"
    },

    //collection: ContactsCollection,

    initialize: function() {
      this.template = Utils.templates.loginview;
      //this.contacts.on("error", this.errorHandler, this);
    },

    render: function() {
      var $newEl = $(this.template());

      if (this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) {
        this.setElement($newEl);
      }

      this.$el.html($newEl.html()); 
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