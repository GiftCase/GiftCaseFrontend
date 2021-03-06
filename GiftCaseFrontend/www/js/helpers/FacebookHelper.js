define(function(require) {

	var StorageHelper = require("helpers/StorageHelper");

	var FacebookHelper = {
		
		facebookPemissions: ["public_profile", "email", "user_likes", "user_friends", 
		    "user_actions.books", "user_actions.music", "user_actions.news", "user_actions.video",
		    "user_activities", "user_birthday", "user_events", "user_games_activity", "user_hometown",
		    "user_interests", "user_likes", "user_location"],
		declinedFacebookPemissions:[""],
		success: "success",
		permissions: "permissions",
		notlogged: "notlogged",
		failure: "failure",

		initialize: function(options)
		{
			this.appdata = options.appdata;
			openFB.init({appId: '878246272199421'});
		},

		checkUserLoggedInStatus: function(checkUserStatusHandler, caller)
	    {
	    	//console.log(checkUserStatusHandler);
	    	var self = this;
	    	openFB.getLoginStatus(function(loginStatus){
				if (loginStatus.status === 'connected') 
		        {
		        	$("#messages").html($("#messages").html() + " user status connected");
		        	//console.log("user status received, connected, check permissions");
		        	self.appdata.user.FacebookAccessToken = loginStatus.authResponse.token;
		        	openFB.api({path: '/me/permissions', success: 
		        		function(response){
		        			$("#messages").html($("#messages").html() + " permissions got");
		        			$("#messages").html($("#messages").html() + " " + JSON.stringify(response));
		        			self.handleSuccessPermissions(self, checkUserStatusHandler, caller, response);
		        		}, error: function(error){
		        			//console.log("hereee");
		        			self.handleErrorPermissions(self, checkUserStatusHandler, caller, error);
		        		}});
	    			/*//console.log("User logged in");
	    			self.appdata.user.FacebookAccessToken = loginStatus.authResponse.token;
		        	self.appdata.user.Id = '10204523203015435';//loginStatus.authResponse.token;
		        	//console.log(self.appdata.user.FacebookAccessToken + " " + self.appdata.user.Id);
		        	checkUserStatusHandler(self.success, caller);*/
		        }
		        else {
		        	$("#messages").html($("#messages").html() + " user status not connected");
		        	//console.log("user status received, not connected");
		          	self.declinedFacebookPemissions.splice(0, self.declinedFacebookPemissions.length);
		          	checkUserStatusHandler(self.notlogged, caller);
		        }
			});
	    },

	    extractUserData: function(extractUserDataHandler, caller)
	    {
	    	var self = this;
	    	openFB.api({path: '/me', success: 
        		function(response){
        			//read facebook id
        			$("#messages").html($("#messages").html() + " extract user data success");
        			//console.log("extract user data success");
        			$("#messages").html($("#messages").html() + " " + response.id);
        			$("#messages").html($("#messages").html() + " " + response.name);
        			self.appdata.user.Id = response.id;
        			self.appdata.user.Name = response.name;
        			self.saveLoginData(response.id);
        			extractUserDataHandler(self.success, caller);
        		}, error: function(error){
        			$("#messages").html($("#messages").html() + " extract user data failure");
        			//console.log("extract user data failure");
        			extractUserDataHandler(self.failure, caller);
        		}});
	    },

	    saveLoginData: function(fbid){
	    	//StorageHelper.saveTofileDummy("FBID", fbid, function (success){
	    	StorageHelper.saveTofile("FBID", fbid, function (success){
		        if (success)
		        {
		          //alert("FBID saved success");
		        }
		        else
		        {
		          //alert("FBID saved not success");
		        }
		    });
	    },

	    handleSuccessPermissions: function(self, checkUserStatusHandler, caller, response)
	    {
	    	$("#messages").html($("#messages").html() + " permissions received");
	    	//console.log("permissions received");
			var grantedPermissions;
			grantedPermissions = $.parseJSON(JSON.stringify(response));

          	var checkAllPermissions = true;

    	  	if (grantedPermissions.data !== undefined)
    	  	{
	    	  for (var i = 0; i < self.facebookPemissions.length; i++)
	    	  {
	    	  	var found = false;
	    	  	for (var j = 0; j < grantedPermissions.data.length; j++)
	    	    {
	    	    	if (grantedPermissions.data[j].permission === self.facebookPemissions[i])
	    	  		{
	    	  			found= true;
	    	  			if (grantedPermissions.data[j].status !== "granted")
	    	  			{
	    	  				self.declinedFacebookPemissions.push(grantedPermissions.data[j].permission);
	    	  				checkAllPermissions = false;
	    	  			}
	    	  		}
	    	    }
	    	    if (!found)
	    	    {
	    	    	checkAllPermissions = false;
	    	    	self.declinedFacebookPemissions.push(self.facebookPemissions[i]);
	    	    }
	    	  }
    	  	}
    	  	else
    	  	{
    	  		checkAllPermissions = false;
    	  	}

    	  	if (checkAllPermissions)
    	  	{
    	  		$("#messages").html($("#messages").html() + " all permissions granted");
    	  		//console.log("all permissions granted");
    	  		checkUserStatusHandler(self.success, caller);
	      	}
	      	else
	      	{
	      		$("#messages").html($("#messages").html() + " not all permissions granted");
	      		//console.log("not all permissions granted");
	      		checkUserStatusHandler(self.permissions, caller);
	      	}
	    },

	    handleErrorPermissions: function(self, checkUserStatusHandler, caller, error)
	    {
	    	$("#messages").html($("#messages").html() + " permissions error");
	    	$("#messages").html($("#messages").html() + " " + error);
	    	//console.log("error in getting permissions");
	    	//console.log(checkUserStatusHandler);
	    	checkUserStatusHandler(self.notlogged, caller);
	    },

	    logout: function(logoutHandler, caller)
	    {
	    	var self = this;
	    	openFB.logout(
                function() {
                	$("#messages").html($("#messages").html() + " logout success");
                	//console.log("logout success");
                    logoutHandler(self.success, caller);
                },
                function(){
                	$("#messages").html($("#messages").html() + " logoutFailure");
                	//console.log("logoutFailure");
                	logoutHandler(self.failure, caller);
                });
	    },

	    login: function(loginHandler, caller)
	    {
	    	//alert("login function");
	    	$("#messages").html($("#messages").html() + " login called");
	    	//console.log("login called");
	    	var self = this;
	        	
	    	if (this.declinedFacebookPemissions.length != 0)
	    	{
	    		//console.log(this.declinedFacebookPemissions.join());
	    		openFB.login(function(response){
	    			self.handleLogin(self, response, loginHandler, caller);
		    	}, {scope: this.declinedFacebookPemissions.join(), auth_type: 'rerequest'});
	    	}
	    	else
	    	{
		    	openFB.login(function(response){
			    	self.handleLogin(self, response, loginHandler, caller);
			    }, {scope: this.facebookPemissions.join()});
	    	}
	    },

	    handleLogin : function(self, response, loginHandler, caller){
	    	if(response.status === 'connected'){
				$("#messages").html($("#messages").html() + " logged in check permissions");
				//console.log("logged in, check permissions");
    			self.checkUserLoggedInStatus(loginHandler, caller);
    		}
    		else
    		{
    			$("#messages").html($("#messages").html() + " not logged in");
    			//console.log("not logged in");
    			
    			if (response.error !== null && response.error !== undefined)
    			{
    				$("#messages").html($("#messages").html() + " " + response.error);
    				//console.log(response.error);
    			}
    			
    			loginHandler(self.notlogged, caller);
    		}
	    }
  	};

	return FacebookHelper;
});