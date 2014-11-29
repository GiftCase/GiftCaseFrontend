define(function(require) {

  var Backbone = require("backbone");
  var EventsCollection = require("collections/EventsCollection");
  var EventView = require("views/pages/EventView");
  var Utils = require("utils");

  var EventsView = Utils.Page.extend({

    constructorName: "EventsView",

    id: "eventsview",
    className: "i-g page",

    //collection: ContactsCollection,

    initialize: function() {
      this.template = Utils.templates.eventsList;
      this.collection = new EventsCollection({});
      this.collection.on("showEvents", this.showEvents, this );
      this.collection.setUserId("ana");
      this.collection.getEvents();
      //this.contacts.on("error", this.errorHandler, this);
    },

    /*errorHandler: function(){
      $('#error').append("The events could not be loaded.");
      document.getElementById("error").style.visibility="visible";
      document.getElementById("error").style.display="initial";
    },*/
  
    showEvents: function(){
      var self = this;
      this.collection.each(function(oneevent){
          var eventView = new EventView();
          eventView.customSetModel(oneevent);
          $(self.el).append(eventView.render().el);
        }, this
      );
    },

    render: function() {
      $(this.el).html(this.template); 
      return this;
    }

  });

  return EventsView;

});