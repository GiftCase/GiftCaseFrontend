define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var EventModel = require("models/EventModel");
  var ContactView = require("views/pages/ContactView");

  var OneEventView = Utils.Page.extend({

    constructorName: "OneEventView",

    id: "oneeventview",
    className: "i-g page",

    initialize: function() {
      this.template = Utils.templates.oneEvent;
    },

    customInitialize: function(oneevent){
      oneevent = oneevent.replace(/\\sl/g,"/");
      var result = $.parseJSON(oneevent);
      this.model = new EventModel();
      this.model.customSetEvent(result.Id,result);
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.model.get('RelatedContacts').each(function(contact){
        var personView = new ContactView();
        personView.customSetModel(contact);
          this.$el.find('.customPlaceHolder').append(personView.render().el);
        }, this
      );
      return this;
    }
  });

  return OneEventView;

});