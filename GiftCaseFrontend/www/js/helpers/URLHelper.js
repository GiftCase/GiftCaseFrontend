define(function(require) {

	var URLHelper = {

		urlRoot: "http://giftcase.azurewebsites.net/api",
		usersRoot: "/User/Contacts",
		eventsRoot: "/User/Events",
		giftsRoot: "/Gifts",
		categoriesRoot: "/CategoriesList",
		outboxRoot: "/Outbox",
		inboxRoot: "/Inbox",
		suggestedGiftRoot: "/SuggestGift",

		contacts: function(userId)
		{
			return this.urlRoot + this.usersRoot + '?userId=' + userId;
		},

		events: function(userId)
		{
			return this.urlRoot + this.eventsRoot + '?userId=' + userId;
		},

		categories: function()
		{
			return this.urlRoot + this.giftsRoot + this.categoriesRoot;
		},

		sentGifts: function(userId, start, end)
		{
			return this.urlRoot + this.giftsRoot + this.outboxRoot + '?userId=' + userId + '&count=' + end;
		},

		receivedGifts: function(userId, start, end)
		{
			return this.urlRoot + this.giftsRoot + this.inboxRoot + '?userId=' + userId + '&count=' + end;
		},

		suggestedGifts: function(targetContactUserName, targetCategoryId, count)
		{
			if (count !== "" && targetCategoryId !== "")
			{
				return this.urlRoot + this.giftsRoot + this.suggestedGiftRoot + "?userName=" + 
					targetContactUserName + "&categoryId=" + targetCategoryId + 
					"&count=" + count;
			}
			else if (count === "" && targetCategoryId !== "")
			{
				return this.urlRoot + this.giftsRoot + this.suggestedGiftRoot + "?userName=" + 
					targetContactUserName + "&categoryId=" + targetCategoryId;
			}
			else if (count !== "" && targetCategoryId === "")
			{
				return this.urlRoot + this.giftsRoot + this.suggestedGiftRoot + "?userName=" + 
					targetContactUserName + "&count=" + count;
			}
			else
			{
				return this.urlRoot + this.giftsRoot + this.suggestedGiftRoot + "?userName=" + 
					targetContactUserName;
			}
		}
  	};

	return URLHelper;
});