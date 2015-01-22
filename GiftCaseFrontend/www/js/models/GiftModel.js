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
		    UserWhoGaveTheGift: '',
		    UserWhoReceivedTheGift: '',
		    Id:''
		},

		initialize: function(options)
		{
		},
		
		customSetGift : function(giftObject, appdataPar)
		{
			//console.log(giftObject.Id);
			var sender = new ContactModel({
				appdata: appdataPar});
			sender.customSetContact(giftObject.UserWhoGaveTheGift);
			var receiver = new ContactModel({
				appdata: appdataPar
			});
			receiver.customSetContact(giftObject.UserWhoReceivedTheGift);
			var item = new ItemModel();
			item.customSetItem(appdataPar, giftObject.Item);
			var date = new Date(giftObject.DateOfPurchase);
			this.set({
				DateOfPurchase: date, 
				Item: item,
				GiftStatus: giftObject.Status,
				UserWhoGaveTheGift: sender,
				UserWhoReceivedTheGift: receiver,
				Id: giftObject.Id
			});
		}
	});

	return GiftModel;
});