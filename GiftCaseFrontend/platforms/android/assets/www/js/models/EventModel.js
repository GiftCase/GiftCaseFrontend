define(function(require) {

	var Backbone = require("backbone");
	var ContactsCollection = require("collections/ContactsCollection");

	var EventModel = Backbone.Model.extend({
		
		constructorName: "EventModel",
		
		defaults: {
		    Datee: '',
		    Details: '',
		    RelatedContacts: '',
		    Type:'',
		    Id: '',
		    ImageUrl: ''
		},

	    toJSON: function () {
	      var json = Backbone.Model.prototype.toJSON.call(this);
	      json.Datee = this.get('Datee');
	      return json;
	    },
		
		customSetEvent : function(id, eventObject)
		{
			var contactsCollection = new ContactsCollection();
			contactsCollection.customInitialize(eventObject.RelatedContacts);
			var imageUrl = this.getAppropriatePicture(eventObject.Type);
			console.log(contactsCollection.length);
			var date = new Date(eventObject.Date);

			this.set({
				Id: id,
				Datee: date, 
				Details: eventObject.Details, 
				Type: eventObject.Type,
				RelatedContacts: contactsCollection,
				ImageUrl: imageUrl});
		},

		customChangeEvent : function()
		{
			this.get('RelatedContacts').customChangeCollection();
			this.get('RelatedContacts').each(function(mrun)
			{
				console.log(mrun.get('ImageUrl'));
			});
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
			else
			{
				return "";
			}
		}
	});

	return EventModel;
});