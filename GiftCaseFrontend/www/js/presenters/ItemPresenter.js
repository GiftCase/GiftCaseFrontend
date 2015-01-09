define(function(require) {

	var ItemPresenter = function(model, appdata)
	{
		this.model = model;
		this.appdata = appdata;
	};

	ItemPresenter.prototype.Category = function() {
		if (this.model.get('Category') === "")
		{
			return "";
		}
		else
		{
    		return this.appdata.getCategoryNameById(this.model.get('Category').get('Id'));
    	}
	};

	ItemPresenter.prototype.Name = function() {
    	return this.model.get('Name');
	};

	ItemPresenter.prototype.CreatorType = function() {
		switch(this.appdata.getCategoryName(this.model.get('Category')))
		{
			case "Video" : {return "Director";break;}
			case "Game" : {return "Platform";break;}
			case "Music" : {return "Artist";break;}
			case "Book" : {return "Author";break;}
		}
    };

	ItemPresenter.prototype.Creator = function() {
  		switch(this.appdata.getCategoryName(this.model.get('Category')))
	  	{
	  		case "Video" : {return this.model.get('Director');break;}
	  		case "Game" : {return this.model.get('Platform');break;}
	  		case "Music" : {return this.model.get('Artist');break;}
	  		case "Book" : {return this.model.get('Author');break;}
	  	}
	};

	ItemPresenter.prototype.BuildJSON = function(object){
		var senderVisible = !(this.model.get('Sender') === "" || this.model.get('Sender') === undefined);

		$.extend(true, object, {
			"Category": this.Category(),
			"Name": this.Name(),
			"CreatorType": this.CreatorType(),
			"Creator": this.Creator(),
			"SenderVisible": (senderVisible ? "customvisible" : "custominvisible")
		});
	    return object;
	};

	return ItemPresenter;
});