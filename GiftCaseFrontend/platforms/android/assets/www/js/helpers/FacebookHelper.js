define(['facebook'], function(FB) {

	var FacebookHelper = {
		
		facebookPemissions: ["public_profile", "email", /*"friend",*/ "user_likes", "user_friends", 
		    "user_actions.books", "user_actions.music", "user_actions.news", "user_actions.video",
		    "user_activities", "user_birthday", "user_events", "user_games_activity", "user_hometown",
		    "user_interests", "user_likes", "user_location"],
		declinedFacebookPemissions:[""],
		success: "success",
		permissions: "permissions",
		notlogged: "notlogged",

		initialize: function(options)
		{
			this.appdata = options.appdata;
			FB.init({
			  appId      : '878246272199421',
			  xfbml      : true,
              version    : 'v2.1',
              oauth      : true
			});
		},

	    extractUserData: function(response) {
	      this.appdata.user.FacebookAccessToken = response.authResponse.accessToken;
	      this.appdata.user.Id = response.authResponse.userID;
	    },

	    checkUserLoggedInStatus: function(checkUserStatusHandler, caller)
	    {
	    	var self = this;
	    	
	    	FB.getLoginStatus(function(response) {
		        if (response.status === 'connected') 
		        {
		        	console.log("connected");
		          self.extractUserData(response);

		          var grantedPermissions;
		          FB.api('/me/permissions', function(response) {

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
		    	  		console.log("Logged");
		    	  		checkUserStatusHandler(self.success, caller);
			      	}
			      	else
			      	{
			      		console.log("not all permissions");
			      		checkUserStatusHandler(self.permissions, caller);
			      	}
				  });
		        }
		        else {
		        	console.log("not logged");
		          self.declinedFacebookPemissions.splice(0, self.declinedFacebookPemissions.length);
		          checkUserStatusHandler(self.notlogged, caller);
		        }
		    });
	    },

	    logout: function(logoutHandler, caller)
	    {
	    	FB.logout(function(response) {
	    		logoutHandler(caller);
	      	});
	    },

	    login: function(loginHandler, caller)
	    {
	    	var self = this;
	        	
	    	var status = this.notlogged;
	    	if (this.declinedFacebookPemissions.length != 0)
	    	{
	    		FB.login(function(response){
		    		self.checkUserLoggedInStatus(loginHandler, caller);
		    	}, {scope: this.declinedFacebookPemissions.join(), auth_type: 'rerequest'});
	    	}
	    	else
	    	{
		    	FB.login(function(response){
			    	self.checkUserLoggedInStatus(loginHandler, caller);
			    }, {scope: this.facebookPemissions.join()});
	    	}
	    }
  	};

	return FacebookHelper;
});