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
      $("#messages").html($("#messages").html() + " login resutl handler");
      if (loginResult === FacebookHelper.success)
      {
        $("#messages").html($("#messages").html() + " successfull login, extract facebook user data");
        console.log("successfull login, extract facebook user data");
        FacebookHelper.extractUserData(function(result, self){
          if (result === FacebookHelper.success){
            $("#messages").html($("#messages").html() + " successfull extract user facebook data");
            console.log("successfull extract user facebook data");
            self.listenTo(self.appdata.user, "userDataRead", function(){
              Backbone.history.navigate("showstructure", {
                trigger: true
              });
            });
            self.appdata.user.getUserDetails();
          }
          else
          {
            $("#messages").html($("#messages").html() + " error extract user facebook data");
            console.log("error extract user facebook data");
            self.$el.find("#loginButton").attr('src', "img/loginInactive.png");
            self.loginError = "Error in getting user information. Please try to log in again.";
            document.getElementById("loginError").innerHTML = loginError;
          }
        }, self); 
        /*self.listenTo(self.appdata.user, "userDataRead", function(){
              Backbone.history.navigate("showstructure", {
                trigger: true
              });
            });
        self.appdata.user.getUserDetails();*/    
      }
      else if (loginResult === FacebookHelper.permissions)
      {
         $("#messages").html($("#messages").html() + " permissions not granted");
        console.log("Permissions not granted");
        self.$el.find("#loginButton").attr('src', "img/loginInactive.png");
        self.loginError = "Error in granted permissions. Please try to log in again.";
        document.getElementById("loginError").innerHTML = self.loginError;
      }
      else if (loginResult === FacebookHelper.notlogged || loginResult === FacebookHelper.failure)
      {
        $("#messages").html($("#messages").html() + " failure in login");
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
    },

    showLoginError: function()
    {
      loginError = "Error in getting user information. Please try to log in again.";
      document.getElementById("loginError").innerHTML = loginError;
    }
  });

  return LoginView;

});