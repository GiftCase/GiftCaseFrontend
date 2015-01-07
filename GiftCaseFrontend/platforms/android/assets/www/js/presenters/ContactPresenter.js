define(function(require) {

	var ContactPresenter = function(modelPar){
		this.model = modelPar;
  	};

	ContactPresenter.prototype.Registered = function() {
		switch(this.model.get('Status'))
		{
			case "Registered": return "custominvisible"; break;
			case "NonRegistered": return "customvisible"; break;
		}
	};

	ContactPresenter.prototype.StatusFormatted = function() {
		switch(this.model.get('Status'))
		{
			case "Registered": return "Registered"; break;
			case "NonRegistered": return "Not registered"; break;
		}
	};

	ContactPresenter.prototype.SendGiftPossible = function() {
		switch(this.model.get('Status'))
		{
			case "Registered": return "customvisible"; break;
			case "NonRegistered": return "custominvisible"; break;
		}
	};

	ContactPresenter.prototype.BuildJSON = function(object) { 
	   $.extend(true, object, {
	   	"Registered": this.Registered(),
	   	"StatusFormatted": this.StatusFormatted(),
	   	"SendGiftPossible": this.SendGiftPossible()
	   });
	   return object;
	};

	return ContactPresenter;
});