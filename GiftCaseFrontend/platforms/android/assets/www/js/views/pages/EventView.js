define(function(require) {

  var Backbone = require("backbone");
  var EventModel = require("models/EventModel");
  var Utils = require("utils");
  var EventContactView = require("views/pages/EventContactView");

  var EventView = Utils.Page.extend({

    constructorName: "EventView",

    tagName: 'div',

    className: 'col-sm-3 col-md-8',

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
      $(this.el).html(this.template(this.model.toJSON()));
      this.model.get('RelatedContacts').each(function(contact){
        var personView = new EventContactView();
        personView.customSetModel(contact);
          $(self.el).find('.customPlaceHolder').append(personView.render().el);
        }, this
      );
      return this;
    },

    openEvent: function(e) {   
      Backbone.history.navigate(
        "oneeventview/" + JSON.stringify(this.model).replace(/\//g,"\\sl"), 
        {trigger: true});
    }
  });

  return EventView;

});