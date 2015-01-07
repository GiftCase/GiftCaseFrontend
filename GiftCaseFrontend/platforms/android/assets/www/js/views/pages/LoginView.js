define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var FacebookHelper = require("helpers/FacebookHelper");

  var LoginView = Utils.Page.extend({

    constructorName: "LoginView",

    loginError: "",

    events: {
      "touchend #facebookLoginButton": "facebookLogin"
    },

    initialize: function(options) {
      this.template = Utils.templates.loginview;
      this.appdata = options.appdata;
    },

    render: function() {
      var $newEl = $(this.template());

      if (this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) {
        this.setElement($newEl);
      }

      this.$el.html($newEl.html());
      this.$el.find("#loginError").innerHTML = this.loginError;
      this.$el.find("#loginButton").attr('src', "img/loginInactive.png");
      return this;
    },

    facebookLogin: function(e) {
      this.$el.find("#loginButton").attr('src', "img/loginActive.png");
      var result = FacebookHelper.login(this.loginResultHandler, this);
    },

    loginResultHandler: function(loginResult, self)
    {
     if (loginResult === FacebookHelper.success)
      {
        self.appdata.user.getUserDetails();
        Backbone.history.navigate("showstructure", {
          trigger: true
        });
      }
      else if (loginResult === FacebookHelper.permissions)
      {
        console.log("Permissions not granted");
        self.$el.find("#loginButton").attr('src', "img/loginInactive.png");
        self.loginError = "Error in granted permissions. Please try to log in again.";
        document.getElementById("loginError").innerHTML = self.loginError;
      }
      else if (loginResult === FacebookHelper.notlogged)
      {
        console.log("User not logged in");
        self.$el.find("#loginButton").attr('src', "img/loginInactive.png");
        self.loginError = "Error while logging in. Please try to log in again.";
        document.getElementById("loginError").innerHTML = self.loginError;
      } 
    },

    showPermissionsError: function()
    {
      loginError = "Error in granted permissions. Please try to log in again.";
      document.getElementById("loginError").innerHTML = loginError;
    }
  });

  return LoginView;

});