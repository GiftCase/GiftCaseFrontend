define(function(require) {

  var Backbone = require("backbone");
  var EventsCollection = require("collections/EventsCollection");
  var EventView = require("views/pages/EventView");
  var Utils = require("utils");

  var EventsView = Utils.Page.extend({

    constructorName: "EventsView",

    initialize: function() {
      this.template = Utils.templates.eventsList;
      this.collection = new EventsCollection();
      this.listenTo(this.collection, "showEvents", this.render);
      this.collection.setUserId("10152464438050382");
      this.collection.getEvents();
      //this.contacts.on("error", this.errorHandler, this);
    },

    /*errorHandler: function(){
      $('#error').append("The events could not be loaded.");
      document.getElementById("error").style.visibility="visible";
      document.getElementById("error").style.display="initial";
    },*/
  

    render: function() { 

      var self = this;
      var $newEl = $(this.template());

      if (this.$el == null ||
          this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) {
        this.setElement($(this.template()));
      }

      this.$el.html($newEl.html());
      this.collection.each(function(oneevent){
          var eventView = new EventView();
          eventView.customSetModel(oneevent);
          self.$el.append(eventView.render().el);
        }, this
      );

      return this;
    }

  });

  return EventsView;

});