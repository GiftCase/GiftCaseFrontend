define(function(require) {

	var ItemPresenter = function(type, model)
	{
		var self = this;
		this.type = type;
		this.model = model;
		_.extend(this, this.model.attributes);
		_.extend(this, 
		{
			Date: function() {
		    	return self.model.get('DateOfPurchase').toDateString();
			},

			Category: function() {
		    	return self.model.get('Item').get('Category').get('Name');
			},

			ContactRole: function() {
				switch(type)
				{
					case "Inbox": return "Sender:"; break;
					case "Outbox": return "Receiver:"; break;
				}
			},

			Name: function() {
		    	return self.model.get('Item').get('Name');
			},

			Creator: function() {
		  		switch(self.model.get('Item').get('Category').get('Name'))
			  	{
			  		case "Movie" : {return self.model.get('Item').get('Director');break;}
			  		case "Game" : {return self.model.get('Item').get('Platform');break;}
			  		case "Music" : {return self.model.get('Item').get('Artist');break;}
			  		case "Book" : {return self.model.get('Item').get('Author');break;}
			  	}
			},

			getUserInformation: function() {
				switch(type)
				{
					case "Inbox": return self.model.get('Sender'); break;
					case "Outbox": return self.model.get('Receiver'); break;
				}
			},

			ShowStatus:function(){
				switch(type)
				{
					case "Inbox": return false; break;
					case "Outbox": return true; break;
				}
			},

			render: function(template){
				console.log(self);
				return template(self);
			}
		});
		return this;
	}

	return ItemPresenter;
});