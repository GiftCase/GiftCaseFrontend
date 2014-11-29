define(function(require) {

	var Backbone = require("backbone");
	var ContactsCollection = require("collections/ContactsCollection");

	var EventModel = Backbone.Model.extend({
		
		constructorName: "EventModel",
		
		defaults: {
		    Date: '',
		    Details: '',
		    RelatedContacts: '',
		    Type:'',
		    Id: ''
		},
		
		customSetEvent : function(id, contactObject)
		{
			var contactsCollection = new ContactsCollection();
			contactsCollection.customInitialize(contactObject.RelatedContacts);
			this.set({
				Id: id,
				Date: contactObject.Date, 
				Details: contactObject.Details, 
				Type: contactObject.Type,
				RelatedContacts: contactsCollection});
		}
	});

	return EventModel;
});