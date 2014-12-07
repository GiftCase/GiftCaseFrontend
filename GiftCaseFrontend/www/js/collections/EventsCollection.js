define(function(require) {

	var Backbone = require("backbone");
	var EventModel = require("models/EventModel");
	var $ = require("jquery");
	var URLHelper = require("helpers/URLHelper");

	var EventsCollection = Backbone.Collection.extend({
		model: EventModel,
		constructorName: "EventsCollection",
		userId:"",

		url: function(){
			console.log(URLHelper.events(this.userId));
			return URLHelper.events(this.userId);
		},

		setUserId: function(userIdPar){
			this.userId = userIdPar;
		},
		
		initialize: function () {
	        this.on("invalid", function (model, error) {
	            console.log("Houston, we have a problem: " + error);
	        });
        },

        parse: function(response){
          var eventsArray = new Array();
  		  
		  var results = $.parseJSON(JSON.stringify(response));
     	  for (var i = 0; i < results.length; i++) {
     		var oneEvent = new EventModel();
     		oneEvent.customSetEvent(i, results[i]);
     		eventsArray[i] = oneEvent;	
     	  }
     	  return eventsArray;
		},
	    
	    getEvents : function()
	    {
	    	var self = this;
			return this.fetch({
	    		success: function () { 
	             	self.trigger("showEvents");
	        	},
	        	error: function (model, xhr, options) {
        			console.log("Something went wrong while getting the events collection");
        		}
    		});
		},

		functionn : function()
		{
			this.at(0).customChangeEvent();
		}
	});

	return EventsCollection;
});