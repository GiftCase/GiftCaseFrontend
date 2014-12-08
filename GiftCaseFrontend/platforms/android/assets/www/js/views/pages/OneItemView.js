define(function(require) {

  var Utils = require("utils");
  var ItemModel = require("models/ItemModel");
  var ItemPresenter = require("presenters/ItemPresenter");

  var OneItemView = Utils.Page.extend({

    constructorName: "OneItemView",

    initialize: function() {
      this.template = Utils.templates.oneItem;
    },

    customInitialize: function(oneevent){
      this.model = oneevent;
    },

    customInitializeJSON: function(oneevent){
      oneevent = oneevent.replace(/\\sl/g,"/");
      var result = $.parseJSON(oneevent);
      this.model = new ItemModel();
      this.model.customSetItem(result);
    },

    render: function() {
      var self = this;
      var itemPresenter = new ItemPresenter(this.model);
      var json = this.model.toJSON();
      json = itemPresenter.BuildJSON(json);

      var $newEl = $(this.template(json));

      if (this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) {
        this.setElement($newEl);
      }

      this.$el.html($newEl.html());
      return this;
    }
  });

  return OneItemView;
});