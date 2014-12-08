define(function(require) {

	var ItemPresenter = function(model)
	{
		this.model = model;
	};

	ItemPresenter.prototype.Category = function() {
    	return this.model.get('Category').get('Name');
	};

	ItemPresenter.prototype.Name = function() {
    	return this.model.get('Name');
	};

	ItemPresenter.prototype.CreatorType = function() {
      switch(this.model.get('Category').get('Name'))
      {
        case "Video" : {return "Director";break;}
        case "Game" : {return "Platform";break;}
        case "Music" : {return "Artist";break;}
        case "Book" : {return "Author";break;}
      }
    };

	ItemPresenter.prototype.Creator = function() {
  		switch(this.model.get('Category').get('Name'))
	  	{
	  		case "Video" : {return this.model.get('Director');break;}
	  		case "Game" : {return this.model.get('Platform');break;}
	  		case "Music" : {return this.model.get('Artist');break;}
	  		case "Book" : {return this.model.get('Author');break;}
	  	}
	};

	ItemPresenter.prototype.BuildJSON = function(object){
		$.extend(true, object, {
			"Category": this.Category(),
			"Name": this.Name(),
			"CreatorType": this.CreatorType(),
			"Creator": this.Creator(),
		});
	    return object;
	};

	return ItemPresenter;
});