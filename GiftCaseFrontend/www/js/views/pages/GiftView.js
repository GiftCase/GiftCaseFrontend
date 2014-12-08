define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var ItemPresenter = require("presenters/ItemPresenter");
  var ItemView = require("views/pages/ItemView");
  var EventContactView = require("views/pages/EventContactView");

  var GiftView = Utils.Page.extend({

    constructorName: "GiftView",

    initialize: function(options) {
      var options = options ? options : {};
      this.model = options.model;
      this.type = options.type;
      this.template = Utils.templates.giftView;
    },

    render: function() {
      var $newEl = $(this.template());

      if (this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) {
        this.setElement($newEl);
      }

      this.$el.html($newEl.html());

      var presenter = new ItemPresenter(this.type, this.model);
      console.log(presenter);
      var itemView = new ItemView({itemPresenter: presenter});
      this.$el.find('#giftHolder').append(itemView.render().el);
      
      var personView = new EventContactView();
      console.log(presenter.getUserInformation());
      personView.customSetModel(presenter.getUserInformation());
      this.$el.find('#contactHolder').append(personView.render().el);

      return this;
    }
  });

  return GiftView;
});