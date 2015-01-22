define(function(require) {

	var StorageHelper = require("helpers/StorageHelper");

	var LoginHelper = {

		openApplication: function(openViewHandler, caller, appdata){
			var self = this;
			//StorageHelper.readDummy("FBID", function (success, data){
			StorageHelper.read("FBID", function (success, data){
		        if (success)
		        {
		        	//alert("user id read from file" + data);
		        	//console.log("user id read from file" + data)
			        appdata.user.Id = data;
			        caller.listenTo(appdata.user, "userDataRead", function(){
			        	if(appdata.user.errorMessage !== "")
			            {
			            	//alert("error during reading user data");
			              	openViewHandler("login", caller);
			            }
			            else
			            {
			            	//alert(" user data read" + appdata.user.get("FacebookAccessToken"));
			              	openViewHandler("structure", caller);
			            }
			        });
			        //alert("user id" + appdata.user.Id);
			        //console.log(appdata.user);
					//console.log(appdata.user.Id + " " + appdata.user.FacebookAccessToken + " " + appdata.user.DeviceId);
			        appdata.user.getUserDetails();
		        }
		        else
		        {
		          //alert("cannot read facebook id -> login");
		          //console.log("cannotread facebook id -> login");
		          openViewHandler("login", caller);
		        }
		    }); 
		}

		/*loginWithFacebook: function(){
	      $("#messages").html($("#messages").html() + " facebook initialized");
	      FacebookHelper.checkUserLoggedInStatus(this.loggedInStatusHandler, this);
	    },

	    loggedInStatusHandler: function(result, self)
	    {
	      if (result === FacebookHelper.success)
	      {
	        $("#messages").html($("#messages").html() + " logged in, get user data");
	        FacebookHelper.extractUserData(function(result, self){
	          if (result === FacebookHelper.success)
	          {
	            $("#messages").html($("#messages").html() + " extracted data get data from backend");
	            self.listenTo(self.appdata.user, "loginDataRead", self.userDataExtractedHandler);
	            self.appdata.user.getUserDetails();
	          }
	          else
	          {
	            $("#messages").html($("#messages").html() + " not extracted data");
	            self.loginview();
	            self.loginView.showLoginError();
	          }
	        }, self);
	        /*
	        //console.log("loggedInStatusHandler");
	        self.listenTo(self.appdata.user, "userDataRead", self.userDataExtractedHandler);
	        self.appdata.user.getUserDetails();*/
	      /*}
	      else
	      {
	        self.loginview();
	        if (result === FacebookHelper.permissions)
	        {
	          self.loginView.showPermissionsError();
	        }
	      }
	    },

	    userDataExtractedHandler: function(){
	      if(this.appdata.user.errorMessage !== "")
	      {
	        this.loginview();
	        this.loginView.showLoginError();
	      }
	      else
	      {
	        this.showStructure();
	      }
	    }*/
  	};

	return LoginHelper;
});