define(function(require) {

	var GiftPresenter = function(typePar, modelPar){
		this.type =  typePar;
		this.model = modelPar;
  	};

  	GiftPresenter.prototype.DateFormatted = function() { 
	   return this.model.get('DateOfPurchase').toDateString();
	};

	GiftPresenter.prototype.ContactRole = function() {
		switch(this.type)
		{
			case "Inbox": return "Sender:"; break;
			case "Outbox": return "Receiver:"; break;
		}
	};

	GiftPresenter.prototype.BuildJSON = function(object) { 
	   $.extend(true, object, {
	   	"DateFormatted": this.DateFormatted(),
	   	"ContactRole": this.ContactRole()
	   });
	   return object;
	};

	return GiftPresenter;
});