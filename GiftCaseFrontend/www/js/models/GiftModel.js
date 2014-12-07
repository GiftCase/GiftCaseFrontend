define(function(require) {

	var Backbone = require("backbone");
	var ContactModel = require("models/ContactModel");
	var ItemModel = require("models/ItemModel");

	var GiftModel = Backbone.Model.extend({
		
		constructorName: "GiftModel",
		
		defaults: {
		    DateOfPurchase: '',
		    Item: '',
		    GiftStatus: '',
		    Sender: '',
		    Receiver: ''
		},
		
		customSetGift : function(giftObject)
		{
			console.log("Creating gift");
			var sender = new ContactModel();
			sender.customSetContact(giftObject.UserWhoGaveTheGift);
			var receiver = new ContactModel();
			receiver.customSetContact(giftObject.UserWhoReceivedTheGift);
			var item = new ItemModel();
			item.customSetItem(giftObject.Item);
			var date = new Date(giftObject.DateOfPurchase);
			console.log("Setting gift fields");
			this.set({
				DateOfPurchase: date, 
				Item: item,
				GiftStatus: giftObject.Status,
				Sender: sender,
				Receiver: receiver
			});
		}
	});

	return GiftModel;
});