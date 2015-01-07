define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var EventModel = require("models/EventModel");
  var ContactView = require("views/pages/ContactView");

  var OneEventView = Utils.Page.extend({

    constructorName: "OneEventView",

    initialize: function(options) {
      this.template = Utils.templates.oneEvent;
      this.appdata = options.appdata;
    },

    customInitialize: function(oneevent){
      oneevent = oneevent.replace(/\\sl/g,"/").replace(/\\questionmark/g,"?");
      var result = $.parseJSON(oneevent);
      this.model = new EventModel();
      this.model.customSetEvent(result.Id, result, this.appdata);
    },

    render: function() {
      var self = this;
      var $newEl = $(this.template(this.model.toJSON()));

      if (this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) {
        this.setElement($newEl);
      }

      this.$el.html($newEl.html());
      this.model.get('RelatedContacts').each(function(contact){
        var personView = new ContactView();
        personView.customSetModel(contact);
          self.$el.find('.customPlaceHolder').append(personView.render().el);
        }, this
      );
      return this;
    }
  });

  return OneEventView;

});