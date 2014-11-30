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
		    Id: '',
		    ImageUrl: ''
		},


	    toJSON: function () {
	      var json = Backbone.Model.prototype.toJSON.call(this);
	      json.Date = this.get('Date').toDateString();
	      return json;
	    },
		
		customSetEvent : function(id, contactObject)
		{
			var contactsCollection = new ContactsCollection();
			contactsCollection.customInitialize(contactObject.RelatedContacts);
			var imageUrl = this.getAppropriatePicture(contactObject.Type);
			var date = new Date(contactObject.Date);

			this.set({
				Id: id,
				Date: date, 
				Details: contactObject.Details, 
				Type: contactObject.Type,
				RelatedContacts: contactsCollection,
				ImageUrl: imageUrl});
		},

		getAppropriatePicture : function(type)
		{
			if (type == "Anniversary"){
				return "img/anniversary.png";
			} 
			else if(type == "Birthday"){
				return "img/birthday.png";
			}
			else if(type == "Graduation"){
				return "img/graduation.png";
			}
		}
	});

	return EventModel;
});