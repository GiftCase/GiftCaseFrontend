define(function(require) {

  var Backbone = require("backbone");
  var EventModel = require("models/EventModel");
  var Utils = require("utils");
  var EventContactView = require("views/pages/EventContactView");

  var EventView = Utils.Page.extend({

    constructorName: "EventView",

    customSetModel : function(eventPar)
    {
      this.model = eventPar;
    },

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.eventview;
    },

    events: {
          "touchend": "openEvent"
    },

    render: function() {
      var self = this;
      var $newEl = $(this.template(this.model.toJSON()));

      if (this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) 
      {
        this.setElement($newEl);
      }

      this.$el.html($newEl.html());

      if (this.model.get('RelatedContacts') !== "")
      {
        this.model.get('RelatedContacts').each(function(contact){
          var personView = new EventContactView();
          personView.customSetModel(contact);
            self.$el.find('.customPlaceHolder').append(personView.render().el);
          }, this
        );
      }
      return this;
    },

    openEvent: function(e) {   
      Backbone.history.navigate(
        "oneeventview/" + JSON.stringify(this.model).replace(/\//g,"\\sl").replace(/\?/g,"\\questionmark"), 
        {trigger: true});
    }
  });

  return EventView;

});