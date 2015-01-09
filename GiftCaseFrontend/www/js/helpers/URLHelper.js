define(function(require) {

	var URLHelper = {

		urlRoot: "http://giftcase.azurewebsites.net/api",
		giftCaseUsersRoot: "/Contacts",
		notGiftCaseUsersRoot: "/Invites",
		eventsRoot: "/User/Events",
		giftsRoot: "/Gifts",
		categoriesRoot: "/CategoriesList",
		outboxRoot: "/Outbox",
		inboxRoot: "/Inbox",
		suggestedGiftRoot: "/SuggestGift",
		userRoot: "/User",
		loginRoot: "/Login",
		logoutRoot: "/Logout",
		invitationRoot: "/SendInvitation",
		sendGiftRoot: "/SendGift",

		sendGift: function(itemId, storeName, userId, contactId)
		{
			var url = this.urlRoot + this.giftsRoot + this.sendGiftRoot + "?itemId=" + itemId +
				"&store=" + storeName + "&userId=" + userId + "&contactId=" + contactId;

			console.log("Request " + url);
			return url;
		},

		sendContactInvitation: function(userId, targetUserEmail, targetUserName, text)
		{
			console.log("Request " + this.urlRoot + this.userRoot + this.invitationRoot + "?userId=" + 
				userId + "&email=" + targetUserEmail + "&userName=" + targetUserName + "&text=" +
				encodeURIComponent("\"" + text + "\""));
			return this.urlRoot + this.userRoot + this.invitationRoot + "?userId=" + userId + 
			"&email=" + targetUserEmail + "&userName=" + targetUserName + "&text=" + 
			encodeURIComponent("\"" + text + "\"");
		},

		userLogin: function(userId, accessToken, deviceToken)
		{
			console.log("Request " + this.urlRoot + this.userRoot + this.loginRoot + "?userId=" + userId + "&accessToken=" + accessToken + "&deviceToken=" + deviceToken);
			return this.urlRoot + this.userRoot + this.loginRoot + "?userId=" + userId + "&accessToken=" + accessToken + "&deviceToken=" + deviceToken;
		},

		userLogout: function(userId, deviceToken)
		{
			console.log("Request " + this.urlRoot + this.userRoot + this.logoutRoot + "?userId=" + userId + "&deviceToken=" + deviceToken);
			return this.urlRoot + this.userRoot + this.logoutRoot + "?userId=" + userId + "&deviceToken=" + deviceToken;
		},

		giftCaseContacts: function(userId)
		{
			console.log("Request " + this.urlRoot + this.userRoot + this.giftCaseUsersRoot + '?userId=' + userId);
			return this.urlRoot + this.userRoot + this.giftCaseUsersRoot + '?userId=' + userId;
		},

		notGiftCaseContacts: function(accessToken)
		{
			console.log("Request " + this.urlRoot + this.userRoot + this.notGiftCaseUsersRoot + '?accessToken=' + accessToken);
			return this.urlRoot + this.userRoot + this.notGiftCaseUsersRoot + '?accessToken=' + accessToken;
		},

		events: function(userId)
		{
			console.log("Request " + this.urlRoot + this.eventsRoot + '?userId=' + userId);
			return this.urlRoot + this.eventsRoot + '?userId=' + userId;
		},

		categories: function()
		{
			console.log("Request " + this.urlRoot + this.giftsRoot + this.categoriesRoot);
			return this.urlRoot + this.giftsRoot + this.categoriesRoot;
		},

		sentGifts: function(userId, start, end)
		{
			console.log("Request " + this.urlRoot + this.giftsRoot + this.outboxRoot + '?userId=' + userId + '&count=' + end);
			return this.urlRoot + this.giftsRoot + this.outboxRoot + '?userId=' + userId + '&count=' + end;
		},

		receivedGifts: function(userId, start, end)
		{
			console.log("Request " + this.urlRoot + this.giftsRoot + this.inboxRoot + '?userId=' + userId + '&count=' + end);
			return this.urlRoot + this.giftsRoot + this.inboxRoot + '?userId=' + userId + '&count=' + end;
		},

		suggestedGifts: function(targetContactId, targetCategoryId, targetSubcategoryId, priceMin, priceMax, count)
		{
			var resultingURL = this.urlRoot + this.giftsRoot + this.suggestedGiftRoot + 
				"?userID=" + targetContactId;
				
			if (targetCategoryId !== "" && targetCategoryId !== undefined)
			{
				resultingURL = resultingURL + "&categoryId=" + targetCategoryId;
			}

			if (targetSubcategoryId !== "" && targetSubcategoryId !== undefined)
			{
				resultingURL = resultingURL + "&subcategoryId=" + targetSubcategoryId;
			}

			if (priceMin !== "" && priceMin !== undefined)
			{
				resultingURL = resultingURL + "&priceMin=" + priceMin;
			}

			if (priceMax !== "" && priceMax !== undefined)
			{
				resultingURL = resultingURL + "&priceMax=" + priceMax;
			}

			if (count !== "" && count !== undefined)
			{
				resultingURL = resultingURL + "&count=" + count;
			}
			
			console.log("Request " + resultingURL);
			return resultingURL;
		}
  	};

	return URLHelper;
});