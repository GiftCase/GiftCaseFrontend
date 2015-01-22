define(function(require) {

	var GiftCollection = require("collections/GiftCollection");
	var ItemCollection = require("collections/ItemCollection");

	var CollectionTests = {

		inboxTest : function()
		{

			/*this.receivedGiftCollection = new GiftCollection();
			this.receivedGiftCollection.setType("received");
			this.receivedGiftCollection.setUserId(encodeURIComponent("Vlatko Klabučar"));
			this.receivedGiftCollection.setListStart(0);
			this.receivedGiftCollection.setListEnd(3);
			this.receivedGiftCollection.on("showInbox", this.showInbox, this);
			//console.log("Request inbox");
			this.receivedGiftCollection.getGifts();*/

			/*this.suggestedGiftCollection = new ItemCollection();
			this.suggestedGiftCollection.setTargetContact("ana");
			this.suggestedGiftCollection.setCategory(3);
			this.suggestedGiftCollection.setCount(2);
			this.suggestedGiftCollection.on("showItems", this.showSuggested, this);
			//console.log("Request count + category");
			this.suggestedGiftCollection.getItems();

			this.suggestedGiftCollection1 = new ItemCollection();
			this.suggestedGiftCollection1.setTargetContact("ana");
			this.suggestedGiftCollection1.setCategory(4);
			this.suggestedGiftCollection1.on("showItems", this.showSuggested1, this);
			//console.log("Request category");
			this.suggestedGiftCollection1.getItems();

			this.suggestedGiftCollection3 = new ItemCollection();
			this.suggestedGiftCollection3.setTargetContact("ana");
			this.suggestedGiftCollection3.setCount(3);
			this.suggestedGiftCollection3.on("showItems", this.showSuggested3, this);
			//console.log("Request count");
			this.suggestedGiftCollection3.getItems();

			this.suggestedGiftCollection2 = new ItemCollection();
			this.suggestedGiftCollection2.setTargetContact("ana");
			this.suggestedGiftCollection2.on("showItems", this.showSuggested2, this);
			//console.log("Request userName");
			this.suggestedGiftCollection2.getItems();*/

			/*this.sentGiftCollection = new GiftCollection();
			this.sentGiftCollection.setType("sent");
			this.sentGiftCollection.setUserId("Damir%20Tomic");
			this.sentGiftCollection.setListStart(0);
			this.sentGiftCollection.setListEnd(3);
			this.sentGiftCollection.on("showOutbox", this.showOutbox, this);
			//console.log("Request outbox");
			this.sentGiftCollection.getGifts();*/
		},

		showInbox:function()
		{
			//console.log("Print inbox " + this.receivedGiftCollection.length);
			this.printGifts(this.receivedGiftCollection);
		},

		showOutbox:function()
		{
			//console.log("Print outbox " + this.sentGiftCollection.length);
			this.printGifts(this.sentGiftCollection);
		},

		showSuggested:function()
		{
			//console.log("Print suggested gifts all conditions " + this.suggestedGiftCollection.length);
			this.printItems(this.suggestedGiftCollection);
		},

		showSuggested1:function()
		{
			//console.log("Print suggested gifts name + category " + this.suggestedGiftCollection1.length);
			this.printItems(this.suggestedGiftCollection1);
		},

		showSuggested2:function()
		{
			//console.log("Print suggested gifts name " + this.suggestedGiftCollection2.length);
			this.printItems(this.suggestedGiftCollection2);
		},

		showSuggested3:function()
		{
			//console.log("Print suggested gifts name + count " + this.suggestedGiftCollection3.length);
			this.printItems(this.suggestedGiftCollection3);
		},

		printGifts:function(giftsCollection)
		{
			/*giftsCollection.each(function(gift){
	        	console.log("DateOfPurchase " + gift.get('DateOfPurchase') + 
	        		"Status " + gift.get('Status') + 
	        		"Item Category " + gift.get('Item').get('Category') + 
	        		"Item Description " + gift.get('Item').get('Description') +
	        		"Item Id " + gift.get('Item').get('Id') +
	        		"Item LinkToTheStore " + gift.get('Item').get('LinkToTheStore') +
	        		"Item Name " + gift.get('Item').get('Name') +
	        		"Item PreviousPrice " + gift.get('Item').get('PreviousPrice') + 
	        		"Item Price " + gift.get('Item').get('Price') + 
	        		"Item PriceCurrency " + gift.get('Item').get('PriceCurrency') + 
	        		"Item Store " + gift.get('Item').get('Store') + 
	        		"Item Author " + gift.get('Item').get('Author') + 
	        		"Item Director " + gift.get('Item').get('Director') +
	        		"Item Platform " + gift.get('Item').get('Platform') + 
	        		"Item Artist " + gift.get('Item').get('Artist') + 
	        		"Sender ImageUrl " + gift.get('UserWhoGaveTheGift').get('ImageUrl') + 
	        		"Sender Status " + gift.get('UserWhoGaveTheGift').get('Status') +
	        		"Sender UserName " + gift.get('UserWhoGaveTheGift').get('UserName') +
	        		"Sender Name " + gift.get('UserWhoGaveTheGift').get('Name') +
	        		"Sender Gender " + gift.get('UserWhoGaveTheGift').get('Gender') +
	        		"Sender Id " + gift.get('UserWhoGaveTheGift').get('Id') +
	        		"Receiver ImageUrl " + gift.get('UserWhoReceivedTheGift').get('ImageUrl') + 
	        		"Receiver Status " + gift.get('UserWhoReceivedTheGift').get('Status') +
	        		"Receiver UserName " + gift.get('UserWhoReceivedTheGift').get('UserName') +
	        		"Receiver Name " + gift.get('UserWhoReceivedTheGift').get('Name') +
	        		"Receiver Gender " + gift.get('UserWhoReceivedTheGift').get('Gender') +
	        		"Receiver Id " + gift.get('UserWhoReceivedTheGift').get('Id')
	        		);
	        }, this);*/
		},

		printItems:function(itemsCollection)
		{
			/*itemsCollection.each(function(gift){
	        	//console.log("Item Category " + gift.get('Category') + 
	        		"Item Description " + gift.get('Description') +
	        		"Item Id " + gift.get('Id') +
	        		"Item LinkToTheStore " + gift.get('LinkToTheStore') +
	        		"Item Name " + gift.get('Name') +
	        		"Item PreviousPrice " + gift.get('PreviousPrice') + 
	        		"Item Price " + gift.get('Price') + 
	        		"Item PriceCurrency " + gift.get('PriceCurrency') + 
	        		"Item Store " + gift.get('Store') + 
	        		"Item Author " + gift.get('Author') + 
	        		"Item Director " + gift.get('Director') +
	        		"Item Platform " + gift.get('Platform') + 
	        		"Item Artist " + gift.get('Artist')
	        		);
	        }, this);*/
		}
  	};

	return CollectionTests;
});